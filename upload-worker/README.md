# Upload Worker

Standalone Cloudflare Worker for file uploads.

## Deploy

```bash
cd upload-worker
npx wrangler deploy
```

## API Endpoints

- `POST /upload` - Upload file
- `GET /files` - List files
- `GET /files/:filename` - Get file

## R2 Bucket

Requires R2 bucket: `yyyyyy-uploads`
