# Labubu Wholesale

Next.js 纯静态网站，支持多语言、表单邮件服务。部署在 Cloudflare 平台。

## 📋 目录

- [项目架构](#项目架构)
- [本地开发](#本地开发)
- [配置说明](#配置说明)
- [部署指南](#部署指南)
- [邮件服务](#邮件服务)

---

## 🏗️ 项目架构

```
Cloudflare
├── Pages (前端)
│   - Next.js 静态导出
│   - 全球 CDN 加速
│   - 自动 HTTPS
│
└── Workers (API)
    - 联系表单邮件发送
    - 订阅功能
```

### 目录结构

```
labubu/
├── app/                    # Next.js 页面
│   ├── [locale]/          # 多语言路由
│   ├── page.js            # 首页
│   ├── about/             # 关于页
│   ├── contact/           # 联系页
│   └── products/          # 产品页
│
├── components/
│   ├── ui/                # 通用 UI 组件
│   └── features/          # 功能组件
│
├── data/                  # 📝 页面数据和配置
│   ├── basic.js          # 网站基础配置 (SEO、品牌信息)
│   ├── home.js           # 首页数据
│   ├── about.js          # 关于页数据
│   └── product.js        # 产品数据
│
├── locales/              # 多语言翻译
├── public/               # 静态资源
│
└── workers/              # API 服务 (独立部署)
    └── src/
        ├── index.js
        └── handlers/
            ├── contact.js
            └── subscribe.js
```

---

## 💻 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## ⚙️ 配置说明

### SEO 配置

编辑 `data/basic.js` 文件：

```javascript
export const basic = {
  // SEO 配置 - 修改这里来更新网站的 TDK
  seo: {
    title: "Your Site Title",
    description: "Your site description for search engines",
    keywords: ["keyword1", "keyword2", "keyword3"],
    url: "https://www.yourdomain.com",
  },
  
  // 品牌信息
  info: {
    brand: "Your Brand Name",
    link: "https://yourdomain.com",
    email: "info@yourdomain.com"
  },
  
  // 导航栏配置
  navbar: {
    brand: "Your Brand Name",
    logo: "/logo.webp",
    // ...
  },
  // ...
};
```

### 产品数据

编辑 `data/product.js` 文件添加或修改产品。

### 多语言

翻译文件在 `locales/` 目录，支持：en、es、fr、de、ja、ko

---

## 🚀 部署指南

### 前端部署 (Cloudflare Pages)

#### 1. 连接 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create → Pages → Connect to Git
3. 选择 GitHub 仓库

#### 2. 构建设置

| 配置项 | 值 |
|-------|-----|
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `out` |

#### 3. 环境变量

| 变量名 | 值 |
|-------|-----|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` |
| `NODE_VERSION` | `20` |

#### 4. 部署

点击 "Save and Deploy"，推送代码自动触发构建。

---

### API 部署 (Cloudflare Workers)

#### 1. 安装 Wrangler

```bash
npm install -g wrangler
wrangler login
```

#### 2. 部署 Workers

```bash
cd workers
npm install
npm run deploy
```

#### 3. 配置 Secrets

```bash
wrangler secret put RESEND_API_KEY      # Resend API 密钥
wrangler secret put CONTACT_EMAIL       # 接收邮箱
wrangler secret put FROM_EMAIL          # 发件邮箱
```

#### 4. 自定义域名

Cloudflare Dashboard → Workers → 你的 Worker → Triggers → Custom Domains

---

## 📧 邮件服务

使用 [Resend](https://resend.com/) 发送邮件：

1. 注册 Resend 账号
2. 创建 API Key
3. 添加并验证发件域名
4. 在 Workers Secrets 配置 `RESEND_API_KEY` 和 `FROM_EMAIL`

---

## 🔄 更新流程

1. 修改代码或配置
2. 推送到 `main` 分支
3. Cloudflare Pages 自动构建部署

---

## 📄 License

MIT License
