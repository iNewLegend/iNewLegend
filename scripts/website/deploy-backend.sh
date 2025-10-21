#!/bin/bash

# Deploy script for PDF service
set -e

SERVER="35.160.88.72"
KEY="~/.ssh/gemini-cli-key.pem"
APP_NAME="pdf-service"

echo "🚀 Deploying $APP_NAME to $SERVER..."

# Remove old SSH key
ssh-keygen -R $SERVER 2>/dev/null || true

# Create directory on server
echo "📁 Creating directory..."
ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@$SERVER "mkdir -p ~/$APP_NAME"

# Copy files to server (excluding node_modules, .git, etc.)
echo "📁 Copying files..."
rsync -av --progress --exclude='node_modules' --exclude='.git' --exclude='*.log' --exclude='.DS_Store' --exclude='dist' -e "ssh -i $KEY -o StrictHostKeyChecking=no" ../../apps/website/backend/ ubuntu@$SERVER:~/$APP_NAME/

# Build and run Docker container
echo "🐳 Building Docker image..."
ssh -i $KEY ubuntu@$SERVER "
  cd ~/$APP_NAME &&
  sudo docker build -t $APP_NAME . &&
  sudo docker stop $APP_NAME 2>/dev/null || true &&
  sudo docker rm $APP_NAME 2>/dev/null || true &&
  sudo docker run -d --name $APP_NAME -p 3000:3000 --restart unless-stopped $APP_NAME
"

echo "✅ Deployment complete!"
echo "🌐 Service available at: http://$SERVER:3000"

# Check status
echo "📊 Container status:"
ssh -i $KEY ubuntu@$SERVER "sudo docker ps | grep $APP_NAME"
