# Deployment Guide - Cloudflare Pages

Complete guide for deploying the Poker Kit website to Cloudflare Pages.

## 📋 Prerequisites

- GitHub repository with the project code
- Cloudflare account
- Node.js 20+ installed locally (for testing)

## 🚀 Quick Deploy

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Deploy: All fixes applied"
git push origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Select the repository: `yyyyyy`

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Build command** | `pnpm build` |
| **Build output directory** | `out` |
| **Root directory** | `/` |
| **Node.js version** | `20` or higher |

### Step 4: Deploy

Click **Save and Deploy**. Cloudflare will:
1. Install dependencies (`pnpm install`)
2. Build the static site (`pnpm build`)
3. Deploy to CDN

**Deployment time**: ~3-5 minutes

## ✅ Post-Deployment Verification

### Check List

- [ ] Homepage loads at your Cloudflare Pages URL
- [ ] Product collection pages display correctly
- [ ] Product detail pages are accessible
- [ ] Product images load properly
- [ ] Navigation dropdown works
- [ ] "Scroll for more" button appears on products with 4+ images
- [ ] Admin panel is accessible at `/admin/homepage`

### Test URLs

```
https://your-site.pages.dev/
https://your-site.pages.dev/collection/poker-equipment
https://your-site.pages.dev/product/spin-master-300-piece-poker-set-with-aluminum-case-and-professional-chips
https://your-site.pages.dev/admin/homepage
```

## 🔧 Configuration Files

### `public/_headers`

Configures MIME types and security headers:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block

/*.txt
  Content-Type: text/plain
  X-Robots-Tag: noindex

/*.html
  Content-Type: text/html; charset=utf-8

/*.webp
  Content-Type: image/webp
  Cache-Control: public, max-age=31536000, immutable

/product/*.webp
  Content-Type: image/webp
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *
```

**Purpose**:
- Ensures WebP images have correct MIME type
- Adds security headers
- Configures caching for optimal performance

### `public/_redirects`

Handles URL redirects:

```
# Redirect .txt files to their HTML equivalents
/*/index.txt /*/index.html 301
```

**Purpose**:
- Next.js 15 generates `.txt` files (RSC payload)
- Ensures users always see HTML pages

## 📤 Optional: Upload Worker

If you need file upload functionality in the admin panel:

### Step 1: Create R2 Bucket

1. Go to **R2** in Cloudflare Dashboard
2. Create bucket: `yyyyyy-uploads`

### Step 2: Deploy Worker

```bash
cd upload-worker
npx wrangler login
npx wrangler deploy
```

### Step 3: Update Frontend

The upload component is already configured to use:
```
https://yyyyyy-upload-api.reluct007.workers.dev
```

Update this URL in `components/admin/image-upload.js` if your Worker has a different name.

## 🐛 Troubleshooting

### Images Not Loading

**Symptom**: Product images show alt text instead of images

**Solution**:
1. Verify `_headers` file is in `out/` directory after build
2. Clear Cloudflare cache: **Caching** → **Purge Everything**
3. Check browser console for MIME type errors

### Product Pages 404

**Symptom**: Product detail pages return 404 or show `.txt` content

**Solution**:
1. Verify `_redirects` file is in `out/` directory
2. Check that `trailingSlash` is NOT in `next.config.mjs`
3. Rebuild and redeploy

### Navigation Dropdown Hidden

**Symptom**: Dropdown menu appears behind content

**Solution**:
- Already fixed in `components/ui/navigation-menu.jsx`
- Z-index set to `z-50`
- Redeploy if not working

### Scroll Button Not Showing

**Symptom**: "Scroll for more" doesn't appear on products with many images

**Solution**:
- Already fixed in `components/features/product-gallery.js`
- Uses delayed detection (100ms) for accurate height calculation
- Redeploy if not working

## 🔄 Continuous Deployment

Cloudflare Pages automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update: Description of changes"
git push

# Cloudflare automatically rebuilds and deploys
```

**Preview Deployments**: Each pull request gets a preview URL

## 📊 Build Output

Expected build results:

```
Route (app)                                Size     First Load JS
┌ ○ /                                      13.4 kB        102 kB
├ ○ /about                                 154 B          103 kB
├ ○ /admin/homepage                        770 B          206 kB
├ ○ /collection/[slug]                     154 B          103 kB
├   ├ /collection/poker-equipment
├   ├ /collection/poker-chips
├   └ [+2 more paths]
├ ○ /product/[slug]                        154 B          103 kB
├   ├ /product/spin-master-300-piece...
├   └ [+121 more paths]
└ ○ /wheree-template                       3.72 kB        111 kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML

Total: 125 pages
```

## 🎯 Performance Tips

1. **Enable Cloudflare CDN**: Automatic with Pages
2. **Use Cloudflare Images**: For dynamic image optimization (optional)
3. **Enable Auto Minify**: HTML, CSS, JS in Cloudflare settings
4. **Configure Caching**: Already set in `_headers`

## 📝 Custom Domain

To use a custom domain:

1. Go to your Pages project
2. **Custom domains** → **Set up a custom domain**
3. Add your domain (e.g., `pokerset.com`)
4. Update DNS records as instructed
5. SSL certificate auto-provisioned

## 🔐 Security

All security headers are configured in `_headers`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📞 Support

For issues:
1. Check build logs in Cloudflare Pages dashboard
2. Review browser console for errors
3. Verify all configuration files are present in `out/`

---

**Last Updated**: January 2026
**Version**: 2.0 (All fixes applied)
