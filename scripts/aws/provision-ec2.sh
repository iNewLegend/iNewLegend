#!/usr/bin/env bash
# Provisions a t4g.micro EC2 in us-east-1 to host the inewlegend frontend + PDF backend.
# Idempotent-ish: aborts if the keypair file already exists locally; reuses an existing
# security group if one with the same name is found.

set -euo pipefail

REGION="us-east-1"
INSTANCE_TYPE="t4g.micro"
KEY_NAME="inewlegend-website-key"
KEY_PATH="$HOME/.ssh/${KEY_NAME}.pem"
SG_NAME="inewlegend-website-sg"
SG_DESC="inewlegend website + PDF service"
INSTANCE_NAME="inewlegend-website"

echo "=== 1/7 Resolving latest Ubuntu 24.04 LTS arm64 AMI ==="
AMI_ID=$(aws ssm get-parameter \
    --region "$REGION" \
    --name /aws/service/canonical/ubuntu/server/24.04/stable/current/arm64/hvm/ebs-gp3/ami-id \
    --query 'Parameter.Value' --output text)
echo "AMI: $AMI_ID"

echo "=== 2/7 Creating SSH keypair: $KEY_NAME ==="
if [ -f "$KEY_PATH" ]; then
    echo "FATAL: $KEY_PATH already exists. Move it aside or rename KEY_NAME, then re-run."
    exit 1
fi
aws ec2 create-key-pair \
    --region "$REGION" \
    --key-name "$KEY_NAME" \
    --query 'KeyMaterial' \
    --output text > "$KEY_PATH"
chmod 400 "$KEY_PATH"
echo "Saved private key to $KEY_PATH (chmod 400)"

echo "=== 3/7 Security group: $SG_NAME ==="
SG_ID=$(aws ec2 describe-security-groups \
    --region "$REGION" \
    --filters "Name=group-name,Values=$SG_NAME" \
    --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo "None")

if [ "$SG_ID" = "None" ] || [ -z "$SG_ID" ]; then
    SG_ID=$(aws ec2 create-security-group \
        --region "$REGION" \
        --group-name "$SG_NAME" \
        --description "$SG_DESC" \
        --query 'GroupId' --output text)
    echo "Created SG: $SG_ID"
    for PORT in 22 80 443 3000; do
        aws ec2 authorize-security-group-ingress \
            --region "$REGION" \
            --group-id "$SG_ID" \
            --protocol tcp \
            --port "$PORT" \
            --cidr 0.0.0.0/0 > /dev/null
        echo "  + ingress tcp/$PORT from 0.0.0.0/0"
    done
else
    echo "Reusing existing SG: $SG_ID"
fi

echo "=== 4/7 Preparing cloud-init (Docker + nginx + writable web root) ==="
USER_DATA=$(cat <<'USERDATA'
#!/bin/bash
set -e
apt-get update
apt-get install -y docker.io nginx
usermod -aG docker ubuntu
systemctl enable --now docker
systemctl enable --now nginx
mkdir -p /home/ubuntu/website
chown -R ubuntu:ubuntu /home/ubuntu/website
# Allow nginx (running as www-data) to traverse into /home/ubuntu to read the webroot
chmod o+x /home/ubuntu
cat > /etc/nginx/sites-available/inewlegend <<'NGINX'
server {
    listen 80 default_server;
    root /home/ubuntu/website;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location = /html-to-pdf { proxy_pass http://127.0.0.1:3000/html-to-pdf; }
}
NGINX
ln -sf /etc/nginx/sites-available/inewlegend /etc/nginx/sites-enabled/inewlegend
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
USERDATA
)

echo "=== 5/7 Launching $INSTANCE_TYPE ==="
INSTANCE_ID=$(aws ec2 run-instances \
    --region "$REGION" \
    --image-id "$AMI_ID" \
    --instance-type "$INSTANCE_TYPE" \
    --key-name "$KEY_NAME" \
    --security-group-ids "$SG_ID" \
    --user-data "$USER_DATA" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" \
    --count 1 \
    --query 'Instances[0].InstanceId' --output text)
echo "Instance: $INSTANCE_ID"

echo "Waiting for instance state=running..."
aws ec2 wait instance-running --region "$REGION" --instance-ids "$INSTANCE_ID"
echo "Running."

echo "=== 6/7 Allocating + associating Elastic IP ==="
ALLOC_ID=$(aws ec2 allocate-address \
    --region "$REGION" \
    --domain vpc \
    --query 'AllocationId' --output text)
aws ec2 associate-address \
    --region "$REGION" \
    --instance-id "$INSTANCE_ID" \
    --allocation-id "$ALLOC_ID" > /dev/null
EIP=$(aws ec2 describe-addresses \
    --region "$REGION" \
    --allocation-ids "$ALLOC_ID" \
    --query 'Addresses[0].PublicIp' --output text)
echo "Elastic IP: $EIP (alloc $ALLOC_ID)"

echo "=== 7/7 Summary ==="
cat <<SUMMARY
  Instance ID:    $INSTANCE_ID
  Elastic IP:     $EIP
  Key path:       $KEY_PATH
  Security group: $SG_ID ($SG_NAME)
  Region:         $REGION

Cloud-init (Docker + nginx install) is still running. Wait for it to finish before deploying:
  ssh -i $KEY_PATH -o StrictHostKeyChecking=no ubuntu@$EIP 'cloud-init status --wait'

.env values to set:
  DEPLOY_WEBSITE_SSH_HOST=$EIP
  DEPLOY_WEBSITE_SSH_PORT=22
  DEPLOY_WEBSITE_SSH_USER=ubuntu
  DEPLOY_WEBSITE_SSH_KEY_PATH=$KEY_PATH
  DEPLOY_WEBSITE_SSH_PWD=/home/ubuntu/website
  DEPLOY_WEBSITE_PUBLIC_URL=http://$EIP

To terminate later:
  aws ec2 terminate-instances --region $REGION --instance-ids $INSTANCE_ID
  aws ec2 release-address --region $REGION --allocation-id $ALLOC_ID
SUMMARY
