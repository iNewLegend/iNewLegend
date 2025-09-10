#!/usr/bin/env node

import { Client } from 'ssh2';
import { readFileSync, readdirSync, statSync } from 'fs';
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

// Upload files via SFTP
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
                const files = getAllFiles(distPath);
                
                let uploadedCount = 0;
                const totalFiles = files.length;
                
                if (totalFiles === 0) {
                    console.log('❌ No files found in dist directory');
                    conn.end();
                    reject(new Error('No files to upload'));
                    return;
                }
                
                console.log(`📦 Found ${totalFiles} files to upload`);
                
                // Create remote directory if it doesn't exist
                sftp.mkdir(DEPLOY_WEBSITE_SSH_PWD, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr && mkdirErr.code !== 4) { // 4 = directory already exists
                        console.warn(`⚠️  Warning creating directory: ${mkdirErr.message}`);
                    }
                    
                    // Upload each file
                    files.forEach(file => {
                        const relativePath = relative(distPath, file);
                        const remotePath = join(DEPLOY_WEBSITE_SSH_PWD, relativePath).replace(/\\/g, '/');
                        
                        // Create remote directory structure
                        const remoteDir = dirname(remotePath);
                        sftp.mkdir(remoteDir, { recursive: true }, (dirErr) => {
                            if (dirErr && dirErr.code !== 4) {
                                console.warn(`⚠️  Warning creating directory ${remoteDir}: ${dirErr.message}`);
                            }
                            
                            // Upload the file
                            sftp.fastPut(file, remotePath, (uploadErr) => {
                                if (uploadErr) {
                                    console.error(`❌ Failed to upload ${relativePath}:`, uploadErr.message);
                                } else {
                                    uploadedCount++;
                                    console.log(`✅ Uploaded ${relativePath} (${uploadedCount}/${totalFiles})`);
                                }
                                
                                // Check if all files are processed
                                if (uploadedCount + (files.length - uploadedCount) === totalFiles) {
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
        
        // Connect to server
        const sshConfig = {
            host: DEPLOY_WEBSITE_SSH_HOST,
            port: parseInt(DEPLOY_WEBSITE_SSH_PORT),
            username: DEPLOY_WEBSITE_SSH_USER,
            password: DEPLOY_WEBSITE_SSH_PASS,
            // readyTimeout: 20000,
            // keepaliveInterval: 10000,
            // algorithms: {
            //     serverHostKey: ['ssh-dss', 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ssh-ed25519'],
            //     kex: [
            //         'diffie-hellman-group1-sha1',
            //         'ecdh-sha2-nistp256',
            //         'ecdh-sha2-nistp384',
            //         'ecdh-sha2-nistp521',
            //         'diffie-hellman-group-exchange-sha256',
            //         'diffie-hellman-group14-sha1'
            //     ],
            //     cipher: [
            //         '3des-cbc',
            //         'aes128-ctr',
            //         'aes192-ctr',
            //         'aes256-ctr',
            //         'aes128-gcm',
            //         'aes256-gcm'
            //     ],
            //     hmac: [
            //         'hmac-sha2-256',
            //         'hmac-sha2-512',
            //         'hmac-sha1'
            //     ]
            // }
        };
        
        console.log('\n🔐 Connecting to server...');
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


