#!/bin/bash
# Deploy script for PDF service.
# Reads SSH config from root .env (DEPLOY_WEBSITE_SSH_*) so the EC2 host is the single
# source of truth — change .env, no code edit required.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/../.."

# Load .env from repo root
set -a
# shellcheck disable=SC1091
source "$ROOT_DIR/.env"
set +a

: "${DEPLOY_WEBSITE_SSH_HOST:?Missing DEPLOY_WEBSITE_SSH_HOST in .env}"
: "${DEPLOY_WEBSITE_SSH_KEY_PATH:?Missing DEPLOY_WEBSITE_SSH_KEY_PATH in .env}"
: "${DEPLOY_WEBSITE_SSH_USER:=ubuntu}"

SERVER="$DEPLOY_WEBSITE_SSH_HOST"
KEY="$DEPLOY_WEBSITE_SSH_KEY_PATH"
SSH_USER="$DEPLOY_WEBSITE_SSH_USER"
APP_NAME="pdf-service"

echo "🚀 Deploying $APP_NAME to $SSH_USER@$SERVER..."

# Drop any stale host key
ssh-keygen -R "$SERVER" 2>/dev/null || true

echo "📁 Ensuring remote directory exists..."
ssh -i "$KEY" -o StrictHostKeyChecking=no "$SSH_USER@$SERVER" "mkdir -p ~/$APP_NAME"

echo "📁 Copying source files..."
rsync -av --progress \
  --exclude='node_modules' --exclude='.git' --exclude='*.log' \
  --exclude='.DS_Store' --exclude='dist' \
  -e "ssh -i $KEY -o StrictHostKeyChecking=no" \
  "$ROOT_DIR/apps/website-backend/" "$SSH_USER@$SERVER:~/$APP_NAME/"

echo "🐳 Building and running Docker container..."
ssh -i "$KEY" "$SSH_USER@$SERVER" "
  cd ~/$APP_NAME &&
  sudo docker build -t $APP_NAME . &&
  sudo docker stop $APP_NAME 2>/dev/null || true &&
  sudo docker rm $APP_NAME 2>/dev/null || true &&
  sudo docker run -d --name $APP_NAME -p 3000:3000 --restart unless-stopped $APP_NAME
"

echo "✅ Deployment complete!"
echo "🌐 Service available at: http://$SERVER:3000"

echo "📊 Container status:"
ssh -i "$KEY" "$SSH_USER@$SERVER" "sudo docker ps | grep $APP_NAME"
