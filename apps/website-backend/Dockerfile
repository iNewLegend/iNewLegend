# Multi-stage build: Bun for install, Node for runtime
FROM oven/bun:1-alpine AS builder

# Install dependencies needed for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

WORKDIR /app

# Copy package files and install with Bun (fast)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build with TypeScript compiler for Node.js compatibility
COPY . .
RUN bun x tsc

# Runtime stage: Node.js for Puppeteer compatibility
FROM node:18-alpine

# Install Chromium and dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    NODE_ENV=production

WORKDIR /app

# Copy built application and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Run with Node.js for Puppeteer compatibility
CMD ["node", "dist/index.js"]
