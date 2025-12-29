#!/usr/bin/env node

import { Client } from 'ssh2';
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'fs';
import os from 'os';
import { mkdtempSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables from root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../');
dotenv.config({ path: join(rootDir, '.env') });

const {
    DEPLOY_WEBSITE_SSH_HOST,
    DEPLOY_WEBSITE_SSH_PORT,
    DEPLOY_WEBSITE_SSH_USER,
    DEPLOY_WEBSITE_SSH_PASS,
    DEPLOY_WEBSITE_SSH_KEY_PATH,
    DEPLOY_WEBSITE_SSH_ALGO,
    DEPLOY_WEBSITE_SSH_PWD,
    DEPLOY_WEBSITE_PUBLIC_URL
} = process.env;

// Validate environment variables
const requiredEnvVars = [
    'DEPLOY_WEBSITE_SSH_HOST',
    'DEPLOY_WEBSITE_SSH_PORT', 
    'DEPLOY_WEBSITE_SSH_USER',
    'DEPLOY_WEBSITE_SSH_PWD'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

console.log('🚀 Starting website deployment...');
console.log(`📡 Target: ${DEPLOY_WEBSITE_SSH_USER}@${DEPLOY_WEBSITE_SSH_HOST}:${DEPLOY_WEBSITE_SSH_PORT}`);
console.log(`📁 Destination: ${DEPLOY_WEBSITE_SSH_PWD}`);

// Build the website first
console.log('\n🔨 Building website...');
import { execSync } from 'child_process';

try {
    execSync('cd apps/website && bun run build', { 
        stdio: 'inherit',
        cwd: rootDir 
    });
    console.log('✅ Build completed successfully');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = readdirSync(dirPath);
    
    files.forEach(file => {
        const fullPath = join(dirPath, file);
        if (statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });
    
    return arrayOfFiles;
}

// Ensure remote directory exists by creating each segment
function ensureRemoteDir(sftp, remoteDir, cb) {
    const norm = remoteDir.replace(/\\/g, '/');
    const parts = norm.split('/').filter(Boolean);
    let built = norm.startsWith('/') ? '/' : '';

    function step(index) {
        if (index >= parts.length) return cb();
        built += (built.endsWith('/') ? '' : '/') + parts[index];
        sftp.stat(built, (err) => {
            if (err) {
                sftp.mkdir(built, (mkErr) => {
                    // 4 == already exists in some SFTP servers; ignore
                    if (mkErr && mkErr.code && mkErr.code !== 4) {
                        // Try to continue even if "already exists" semantics differ
                    }
                    step(index + 1);
                });
            } else {
                step(index + 1);
            }
        });
    }

    step(0);
}

// Upload files via SFTP (dist + public + vendor if present)
function uploadFiles() {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        
        conn.on('ready', () => {
            console.log('\n📤 Connected to server, starting upload...');
            
            conn.sftp((err, sftp) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                const distPath = join(rootDir, 'apps/website/dist');
                const publicPath = join(rootDir, 'apps/website/public');
                const vendorPathInPublic = join(publicPath, 'vendor');
                const vendorPathAtApp = join(rootDir, 'apps/website/vendor');

                const uploads = [];

                if (existsSync(distPath) && statSync(distPath).isDirectory()) {
                    const distFiles = getAllFiles(distPath);
                    console.log(`📦 dist: ${distFiles.length} files`);
                    distFiles.forEach((file) => {
                        const relativePath = relative(distPath, file);
                        const remotePath = join(DEPLOY_WEBSITE_SSH_PWD, relativePath).replace(/\\/g, '/');
                        uploads.push({ file, relativePath, remotePath });
                    });
                }

                if (existsSync(publicPath) && statSync(publicPath).isDirectory()) {
                    const publicFiles = getAllFiles(publicPath);
                    console.log(`📁 public: ${publicFiles.length} files`);
                    publicFiles.forEach((file) => {
                        const relativePath = relative(publicPath, file);
                        const remotePath = join(DEPLOY_WEBSITE_SSH_PWD, relativePath).replace(/\\/g, '/');
                        uploads.push({ file, relativePath, remotePath });
                    });
                }

                let vendorBase = '';
                if (existsSync(vendorPathInPublic) && statSync(vendorPathInPublic).isDirectory()) {
                    vendorBase = vendorPathInPublic;
                } else if (existsSync(vendorPathAtApp) && statSync(vendorPathAtApp).isDirectory()) {
                    vendorBase = vendorPathAtApp;
                }

                if (vendorBase) {
                    const vendorFiles = getAllFiles(vendorBase);
                    console.log(`📚 vendor: ${vendorFiles.length} files`);
                    vendorFiles.forEach((file) => {
                        const relativePath = relative(vendorBase, file);
                        const remotePath = join(DEPLOY_WEBSITE_SSH_PWD, 'vendor', relativePath).replace(/\\/g, '/');
                        uploads.push({ file, relativePath: `vendor/${relativePath}`, remotePath });
                    });
                }

                const totalFiles = uploads.length;
                let uploadedCount = 0;
                let processedCount = 0;

                if (totalFiles === 0) {
                    console.log('❌ No files found to upload (dist/public/vendor)');
                    conn.end();
                    reject(new Error('No files to upload'));
                    return;
                }

                console.log(`📤 Total files to upload: ${totalFiles}`);
                
                // Create remote directory if it doesn't exist
                sftp.mkdir(DEPLOY_WEBSITE_SSH_PWD, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr && mkdirErr.code !== 4) { // 4 = directory already exists
                        console.warn(`⚠️  Warning creating directory: ${mkdirErr.message}`);
                    }
                    
                    // Upload each file (dist, public, vendor)
                    uploads.forEach(({ file, relativePath, remotePath }) => {
                        const remoteDir = dirname(remotePath);
                        ensureRemoteDir(sftp, remoteDir, () => {
                            sftp.fastPut(file, remotePath, (uploadErr) => {
                                processedCount++;
                                if (uploadErr) {
                                    console.error(`❌ Failed to upload ${relativePath}:`, uploadErr.message);
                                } else {
                                    uploadedCount++;
                                    console.log(`✅ Uploaded ${relativePath} (${uploadedCount}/${totalFiles})`);
                                }

                                if (processedCount === totalFiles) {
                                    console.log(`\n🎉 Deployment completed! ${uploadedCount}/${totalFiles} files uploaded successfully`);
                                    console.log(`🌐 Website available at: ${DEPLOY_WEBSITE_PUBLIC_URL || 'https://inewlegend.com'}`);
                                    conn.end();
                                    resolve();
                                }
                            });
                        });
                    });
                });
            });
        });
        
        conn.on('error', (err) => {
            console.error('❌ SSH connection error:', err.message);
            reject(err);
        });
        
        const sshConfig = {
            host: DEPLOY_WEBSITE_SSH_HOST,
            port: parseInt(DEPLOY_WEBSITE_SSH_PORT),
            username: DEPLOY_WEBSITE_SSH_USER,
        };
        
        if (DEPLOY_WEBSITE_SSH_KEY_PATH) {
            const keyPath = DEPLOY_WEBSITE_SSH_KEY_PATH.replace(/^~/, os.homedir());
            if (existsSync(keyPath)) {
                try {
                    sshConfig.privateKey = readFileSync(keyPath);
                    console.log('\n🔐 Connecting to server using SSH key...');
                } catch (err) {
                    console.error(`❌ Failed to read SSH key file: ${err.message}`);
                    reject(err);
                    return;
                }
            } else {
                console.error(`❌ SSH key file not found: ${keyPath}`);
                reject(new Error(`SSH key file not found: ${keyPath}`));
                return;
            }
        } else if (DEPLOY_WEBSITE_SSH_PASS) {
            sshConfig.password = DEPLOY_WEBSITE_SSH_PASS;
            console.log('\n🔐 Connecting to server using password...');
        } else {
            console.error('❌ No authentication method provided. Set either DEPLOY_WEBSITE_SSH_PASS or DEPLOY_WEBSITE_SSH_KEY_PATH');
            reject(new Error('No authentication method provided'));
            return;
        }
        
        conn.connect(sshConfig);
    });
}

// Main deployment function
async function deploy() {
    try {
        await uploadFiles();

        console.log('\n✨ Deployment successful!');
    } catch (error) {
        console.error('\n💥 Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run deployment
deploy();


