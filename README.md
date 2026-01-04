# Poker Kit

Next.js 纯静态电商网站，支持多语言、产品展示、联系表单。部署在 Cloudflare 平台。

## 🖥️ 环境要求

| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | 20+ | JavaScript 运行环境 |
| pnpm | 10+ | 包管理器 |
| Git | 最新版 | 版本控制 |
| Wrangler | 3.0+ | Cloudflare CLI 工具 |

## 🏗️ 项目架构

```
Cloudflare
├── Pages (前端静态网站)
│   - 站点根域名: `data/basic.js` 的 `basic.seo.url`（例如 `https://pokerset.com`）
│   - Next.js 静态导出到 /out 目录
│   - 全球 CDN 加速
│
└── Workers (API 服务)
    - API 地址: 环境变量 `NEXT_PUBLIC_API_URL`（例如 `https://api.example.com`）
    - 联系表单邮件发送
    - 订阅功能
```

## 📁 目录结构

```
poker-set/
├── app/                    # Next.js 页面
│   ├── [locale]/          # 多语言路由 (en/es/fr/de/ja/ko)
│   ├── product/[slug]/    # 产品详情页
│   └── products/[slug]/   # 产品分类页
│
├── components/
│   ├── ui/                # 通用 UI 组件 (Button, Badge 等)
│   └── features/          # 功能组件 (Navbar, Footer, Form 等)
│
├── data/                  # 📝 数据配置文件
│   ├── basic.js          # 网站基础配置 (SEO、品牌、导航)
│   ├── home.js           # 首页数据
│   ├── about.js          # 关于页数据
│   ├── product.js        # 产品数据
│   └── products.js       # 产品分类数据
│
├── locales/              # 多语言翻译文件
├── public/               # 静态资源 (图片、字体)
├── out/                  # 构建输出目录 (自动生成)
│
└── workers/              # API 服务 (独立部署)
    ├── src/
    │   ├── index.js      # 入口文件
    │   └── handlers/     # 请求处理器
    ├── wrangler.toml     # Workers 配置
    └── package.json
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd poker-set
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 本地开发

```bash
# 启动前端开发服务器
pnpm dev
# 访问 http://localhost:3000

# 可选：使用 Turbopack 加速开发（冷启动/热更新更快）
pnpm dev:turbo

# 启动 API 开发服务器 (新终端)
pnpm -C workers dev
# 访问 http://localhost:8787
```

### 4. 构建测试

```bash
pnpm build
# 输出到 out/ 目录
# 构建前会自动重新生成 public/sitemap.xml
```

## CI

本仓库使用 GitHub Actions，在 push / PR 时自动执行：

- `pnpm lint`
- `pnpm build`

## ⚙️ 配置说明

### SEO 和网站配置

编辑 `data/basic.js`:

```javascript
export const basic = {
  seo: {
    title: "网站标题",
    description: "网站描述",
    keywords: ["关键词1", "关键词2"],
    url: "https://www.yourdomain.com",  // 用于 canonical URL
  },
  info: {
    brand: "品牌名称",
    email: "contact@yourdomain.com"
  },
  // ...
};
```

### 产品数据

编辑 `data/product.js` 添加产品:

```javascript
export const product = [
  {
    title: "产品名称",
    description: "产品描述",
    image: "/product/image.webp",
    images: ["/product/img1.webp", "/product/img2.webp"],
    category: "Poker Equipment",  // 分类名称
    features: [
      { title: "特性1", description: "描述" },
    ]
  },
];
```

### 产品分类

编辑 `data/products.js` 管理分类:

```javascript
export const products = {
  header: {
    title: "Poker Sets Collection",
    description: "页面描述",
    image: "/home/Customization.webp",
    features: ["特性 1", "特性 2"]
  },
  products: [
    { title: "Poker Equipment", description: "分类描述", image: "/home/Customization.webp", features: ["特性 1"] },
    { title: "Poker Chips", description: "分类描述", image: "/home/image.webp", features: ["特性 1"] },
  ]
};
```

## 📧 邮件服务配置

使用 [Resend](https://resend.com/) 发送邮件:

1. 注册 Resend 账号
2. 创建 API Key
3. 添加并验证发件域名
4. 配置 Workers Secrets (见部署文档)

## 🔗 相关链接

- [部署文档](./DEPLOY.md) - 详细部署步骤
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Resend](https://resend.com/)
- [Next.js 文档](https://nextjs.org/docs)

## 📄 License

MIT License
