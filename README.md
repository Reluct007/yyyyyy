# Poker Kit - Next.js E-Commerce Website

Professional poker equipment B2B e-commerce website, deployed on Cloudflare Pages.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (Static Export)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Cloudflare Pages
- **File Upload**: Cloudflare Workers + R2
- **Language**: English (Single Language)

## ✨ Features

- ✅ **125 Static Pages** - Optimized for performance
- ✅ **900+ Products** - Comprehensive poker equipment catalog
- ✅ **Admin Dashboard** - Homepage customization and template management
- ✅ **4 Layout Templates** - Classic Business, Modern SaaS, Creative Portfolio, Wheree Style
- ✅ **File Upload** - R2 storage integration
- ✅ **SEO Optimized** - Meta tags, structured data, sitemap
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Product Gallery** - Smart scroll hints for multiple images

## 📦 Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access at
http://localhost:3000
```

## 🏗️ Build

```bash
# Build static website
pnpm build

# Output directory: out/
# Total pages: 125
```

## 🌐 Deployment

### 1. Main Website (Cloudflare Pages)

**Automatic Deployment**: Push to GitHub triggers auto-deploy

**Manual Configuration**:
- Build command: `pnpm build`
- Build output: `out`
- Node.js version: 20+

**Important Files**:
- `public/_headers` - MIME types and security headers
- `public/_redirects` - URL redirects for .txt files

### 2. Upload API (Cloudflare Worker)

```bash
cd upload-worker
npx wrangler deploy
```

**Worker URL**: `https://yyyyyy-upload-api.reluct007.workers.dev`

**Required R2 Bucket**: `yyyyyy-uploads`

**API Endpoints**:
- `POST /upload` - Upload files
- `GET /files` - List files
- `GET /files/:filename` - Get file

## 📁 Project Structure

```
├── app/
│   ├── (site)/          # Main website pages
│   │   ├── product/     # Product detail pages
│   │   ├── collection/  # Product collection pages
│   │   └── admin/       # Admin dashboard
│   └── layout.js        # Root layout
├── components/
│   ├── features/        # Feature components
│   ├── templates/       # Layout templates (Wheree, etc.)
│   └── ui/              # UI components (shadcn)
├── data/
│   ├── product.js       # Product data (900+ items)
│   └── basic.js         # Site configuration
├── lib/                 # Utilities and contexts
├── public/
│   ├── product/         # Product images
│   ├── _headers         # Cloudflare headers config
│   └── _redirects       # Cloudflare redirects config
├── upload-worker/       # Separate upload Worker
└── out/                 # Build output (static files)
```

## 🔧 Configuration

### Next.js Config (`next.config.mjs`)

```javascript
const nextConfig = {
  output: 'export',        // Static export mode
  images: {
    unoptimized: true,     // Required for static export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

### Key Features Implemented

1. **No Trailing Slash** - Clean URLs without trailing slashes
2. **WebP Image Support** - Proper MIME types configured
3. **Smart Scroll Hints** - Auto-detect scrollable image galleries
4. **Navigation Z-Index Fix** - Dropdowns work correctly
5. **Product Page Routing** - No `/*/index.html` issues

## 🐛 Recent Fixes

- ✅ Removed multi-language support (simplified to English only)
- ✅ Fixed navigation dropdown z-index issues
- ✅ Added Wheree-style modern template
- ✅ Fixed product link locale prefix issues
- ✅ Fixed product page routing (.txt redirect)
- ✅ Fixed product image loading on Cloudflare Pages
- ✅ Fixed URL pattern issues (removed trailingSlash)
- ✅ Fixed inconsistent scroll button display

## 📝 Environment Variables

None required for static website.

For upload Worker, configure R2 binding in `wrangler.toml`.

## 📄 License

MIT
