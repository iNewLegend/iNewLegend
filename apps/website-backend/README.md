# PDF Service

A standalone PDF generation service for the resume website, designed to be deployed with Dokku.

## Features

- HTML to PDF conversion using Puppeteer
- CORS support for web applications
- Health check endpoint
- Production-ready with Chromium optimization
- Docker support for easy deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed origin for CORS (default: https://inewlegend.com)
- `DEFAULT_FILENAME`: Default PDF filename (default: resume)

## API Endpoints

### POST /html-to-pdf

Converts HTML to PDF.

**Request Body:**
```json
{
  "html": "<html>...</html>",
  "filename": "optional-filename"
}
```

**Response:**
- Success: PDF file with appropriate headers
- Error: JSON error response

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-21T..."
}
```

## Deployment with Dokku

1. Create the app on your Dokku server:
   ```bash
   dokku apps:create pdf-service
   ```

2. Set environment variables:
   ```bash
   dokku config:set pdf-service NODE_ENV=production
   dokku config:set pdf-service CORS_ORIGIN=https://inewlegend.com
   dokku config:set pdf-service DEFAULT_FILENAME=resume
   ```

3. Deploy:
   ```bash
   git remote add dokku dokku@your-server:pdf-service
   git push dokku main
   ```

## Docker

The service includes a Dockerfile for containerized deployment:

```bash
# Build image
docker build -t pdf-service .

# Run container
docker run -p 3000:3000 -e NODE_ENV=production pdf-service
```
