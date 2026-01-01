# Labubu Project

多主题网站项目，支持主题切换、多语言、表单邮件服务、后台管理。全部部署在 Cloudflare 平台。

## 📋 目录

- [项目架构](#项目架构)
- [环境要求](#环境要求)
- [本地开发](#本地开发)
- [部署指南](#部署指南)
- [后台管理](#后台管理)
- [主题开发](#主题开发)
- [邮件服务配置](#邮件服务配置)
- [环境变量说明](#环境变量说明)

---

## 🏗️ 项目架构

```
Cloudflare (单一平台)
├── Pages (前端)
│   - Next.js 静态导出
│   - 全球 CDN 加速
│   - 自动 HTTPS
│
├── Workers (API)
│   - 邮件发送 (联系表单/订阅)
│   - 后台管理 API
│   - JWT 认证
│
└── KV (存储)
    - 网站配置
    - 邮件设置
```

### 目录结构

```
labubu/
├── workers/                     # 📧 API 服务 (Cloudflare Workers)
│   ├── src/
│   │   ├── index.js            # 入口和路由
│   │   ├── handlers/
│   │   │   ├── contact.js      # 联系表单 API
│   │   │   ├── subscribe.js    # 订阅 API
│   │   │   └── admin/
│   │   │       ├── login.js    # 登录 API
│   │   │       ├── config.js   # 配置管理 API
│   │   │       └── themes.js   # 主题列表 API
│   │   └── utils/
│   │       ├── jwt.js          # JWT 工具
│   │       ├── resend.js       # Resend 邮件客户端
│   │       └── response.js     # 响应工具
│   ├── wrangler.toml           # Workers 配置
│   └── package.json
│
├── app/                         # 🌐 Next.js 页面
│   ├── admin/                  # 后台管理
│   │   ├── page.js             # 登录页
│   │   └── dashboard/page.js   # 控制面板
│   ├── [locale]/               # 多语言路由
│   └── ...
│
├── components/
│   ├── ui/                     # 通用 UI 组件
│   └── themes/                 # 主题组件
│       └── labubu/
│
├── config/theme.js             # 主题配置
├── data/                       # 页面数据
├── locales/                    # 多语言翻译
└── public/                     # 静态资源
```

---

## ⚙️ 环境要求

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| Node.js | 18.x | 20.x |
| npm | 9.x | 10.x |
| Wrangler CLI | 3.x | 最新 |

---

## 💻 本地开发

### 前端

```bash
npm install --legacy-peer-deps
npm run dev
```

访问 http://localhost:3000

### API

```bash
cd workers
npm install
npm run dev
```

访问 http://localhost:8787

---

## 🚀 部署指南

### 第一步：部署 API (Cloudflare Workers)

#### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

#### 2. 创建 KV 命名空间

```bash
cd workers
wrangler kv:namespace create "CONFIG_KV"
```

复制输出的 ID，更新 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "CONFIG_KV"
id = "你的-namespace-id"
```

#### 3. 配置 Secrets

```bash
wrangler secret put RESEND_API_KEY      # Resend API 密钥
wrangler secret put CONTACT_EMAIL       # 接收邮箱
wrangler secret put FROM_EMAIL          # 发件邮箱 (需在 Resend 验证域名)
wrangler secret put ADMIN_USERNAME      # 后台用户名
wrangler secret put ADMIN_PASSWORD      # 后台密码
wrangler secret put JWT_SECRET          # JWT 密钥 (随机字符串)
```

#### 4. 部署

```bash
npm run deploy
```

部署成功后记录 API 地址：`https://labubu-api.xxx.workers.dev`

#### 5. 配置自定义域名（可选）

在 Cloudflare Dashboard → Workers → 你的 Worker → Triggers → Custom Domains 添加域名。

---

### 第二步：部署前端 (Cloudflare Pages)

#### 1. 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create → Pages → Connect to Git
3. 选择 GitHub 仓库

#### 2. 配置构建设置

| 配置项 | 值 |
|-------|-----|
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `out` |
| 根目录 | (留空) |

#### 3. 配置环境变量

在 **生产环境** 和 **预览环境** 都要设置：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` | Workers API 地址 |
| `NODE_VERSION` | `20` | Node.js 版本 |
| `NPM_FLAGS` | `--legacy-peer-deps` | npm 参数 |

> ⚠️ **重要**：`NEXT_PUBLIC_` 开头的变量在构建时注入，修改后必须重新部署才能生效。

#### 4. 部署

点击 "Save and Deploy"，等待构建完成。

---

## 🔐 后台管理

### 访问

`https://你的网站/admin`

### 功能

| 功能 | 说明 | 生效时间 |
|-----|------|---------|
| 主题切换 | 选择网站主题 | 需重新构建前端 |
| 接收邮箱 | 表单提交发送到的邮箱 | 立即生效 |
| 发件邮箱 | 邮件发送者地址 | 立即生效 |
| 发件人名称 | 邮件发送者显示名 | 立即生效 |
| 网站名称 | 网站标题 | 立即生效 |

---

## 🎨 主题开发

详见 [主题开发指南](docs/THEME-DEVELOPMENT.md)

---

## 📧 邮件服务配置

### Resend 设置

1. 注册 [Resend](https://resend.com/)
2. 创建 API Key
3. 添加并验证发件域名
4. 在 Workers Secrets 配置 `RESEND_API_KEY` 和 `FROM_EMAIL`

---

## 🔐 环境变量说明

### Cloudflare Pages

| 变量名 | 说明 |
|-------|------|
| `NEXT_PUBLIC_API_URL` | Workers API 地址 |
| `NODE_VERSION` | Node.js 版本 |
| `NPM_FLAGS` | npm 安装参数 |

### Cloudflare Workers (Secrets)

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 默认接收邮箱 |
| `FROM_EMAIL` | 默认发件邮箱 |
| `ADMIN_USERNAME` | 后台用户名 |
| `ADMIN_PASSWORD` | 后台密码 |
| `JWT_SECRET` | JWT 签名密钥 |

---

## 🔄 更新部署

### 自动部署

推送到 `main` 分支自动触发 Cloudflare Pages 重新构建。

### 手动部署

**前端**：Cloudflare Pages → Deployments → Retry deployment

**API**：
```bash
cd workers
npm run deploy
```

---

## 📄 License

MIT License
