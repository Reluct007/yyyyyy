# Poker Kit

Next.js 纯静态电商网站，支持多语言、产品展示、联系表单。部署在 Cloudflare 平台。

## 🖥️ 环境要求

| 工具     | 版本   | 说明                                                                                                  |
| -------- | ------ | ----------------------------------------------------------------------------------------------------- |
| Node.js  | 20+    | JavaScript 运行环境                                                                                   |
| pnpm     | 10+    | 包管理器                                                                                              |
| Git      | 最新版 | 版本控制                                                                                              |
| Wrangler | 3.0+   | （可选）用于 Workers 调试/部署；优先使用本仓库 `workers/` 的本地依赖：`pnpm -C workers exec wrangler` |

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
│   ├── (site)/            # 兼容路由（历史英文无前缀；平台侧 301 → /en/...）
│   └── [locale]/          # 主路由（全语言前缀：/en,/es,/fr,/de,/ja,/ko）
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
cd <repo-dir>
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 本地开发

```bash
# 启动前端开发服务器（Turbopack）
pnpm dev
# 访问 http://localhost:3000

# 启动 API 开发服务器 (新终端)
pnpm -C workers dev
# 访问 http://localhost:8787
```

### 4. 构建测试

```bash
pnpm build
# 输出到 out/ 目录
# 构建会在产物中生成 sitemap.xml / robots.txt（Next.js Metadata Routes：`app/sitemap.js`、`app/robots.js`）
# 说明：当前 build 使用 Turbopack（next build --turbo）

# 基于 out/ 产物做离线 SEO 基础检查（title/description/canonical/hreflang/JSON-LD 等）
pnpm seo:scan
```

### 5. 代码格式化

```bash
pnpm format
pnpm format:check
```

说明：使用 Prettier + `prettier-plugin-tailwindcss` 统一代码风格并排序 Tailwind class。

## CI

本仓库使用 GitHub Actions，在 push / PR 时自动执行：

- `pnpm format:check`
- `pnpm lint`
- `pnpm build`

## ⚙️ 配置说明

### 环境变量

前端通过环境变量 `NEXT_PUBLIC_API_URL` 指向 Workers API：

```bash
# 本地开发示例（Next.js dev 读取 .env.local）
echo "NEXT_PUBLIC_API_URL=http://localhost:8787" > .env.local
```

生产环境（Cloudflare Pages）请在项目 Settings → Environment variables 配置 `NEXT_PUBLIC_API_URL`。

### SEO 和网站配置

编辑 `data/basic.js`:

```javascript
export const basic = {
  seo: {
    title: "网站标题",
    description: "网站描述",
    keywords: ["关键词1", "关键词2"],
    url: "https://www.yourdomain.com", // 用于 canonical URL
  },
  info: {
    brand: "品牌名称",
    email: "contact@yourdomain.com",
  },
  // ...
};
```

### i18n SEO（canonical / hreflang）

当前策略：

- 所有语言统一使用 `/{locale}` 前缀（包含默认语言 `en`，例如：`/en/collection/`、`/fr/product/<id>/`）
- 根路径 `/` 平台侧 301 → `/en/`（静态导出下不可依赖 middleware）

实现约定：

- 语言列表与默认语言在 `data/i18n.js` 维护（供页面 metadata 与 `app/sitemap.js` 共用）
- 页面 `metadata/generateMetadata` 优先通过 `lib/hreflang.js` 的 `buildAlternates()` 生成（个别路由仍存在手写/缺失，详见 `docs/I18N.md`）
- 多语言实现细节与问题追踪：`docs/I18N.md`（权威说明 + 已知问题清单）

### 主题颜色（全站）

本项目使用「CSS 变量 + Tailwind 映射」的方式管理主题色：

- 颜色源头在 `app/globals.css`：`:root` 为浅色主题，`.dark` 为深色主题
- `tailwind.config.js` 将这些变量映射为 Tailwind 的颜色 token（例如 `bg-primary` / `text-primary`）

要修改品牌主色/按钮高亮等，调整 `app/globals.css` 中的 `--primary`（以及同色系的 `--ring`）。注意这里的值是 **HSL 三元组**（不带 `hsl()`），例如：

```css
:root {
  --primary: 24.6 95% 53.1%;
}
.dark {
  --primary: 20.5 90.2% 48.2%;
}
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
    category: "Poker Equipment", // 分类名称
    features: [{ title: "特性1", description: "描述" }],
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
    features: ["特性 1", "特性 2"],
  },
  products: [
    {
      title: "Poker Equipment",
      description: "分类描述",
      image: "/home/Customization.webp",
      features: ["特性 1"],
    },
    {
      title: "Poker Chips",
      description: "分类描述",
      image: "/home/image.webp",
      features: ["特性 1"],
    },
  ],
};
```

## 📧 邮件服务配置

使用 [Resend](https://resend.com/) 发送邮件:

1. 注册 Resend 账号
2. 创建 API Key
3. 添加并验证发件域名
4. 配置 Workers Secrets (见部署文档)

## 🔗 相关链接

- [工程约定](./docs/CONVENTIONS.md) - 开发/目录/命名/CI 约定索引入口
- [SEO 规范与维护](./docs/SEO.md) - canonical/hreflang/sitemap/robots 维护指南
- [部署文档](./docs/DEPLOY.md) - 详细部署步骤
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Resend](https://resend.com/)
- [Next.js 文档](https://nextjs.org/docs)

## 📄 License

MIT License
