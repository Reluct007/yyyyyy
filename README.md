# Labubu Project

多主题网站项目，支持主题切换、多语言、表单邮件服务。全部部署在 Cloudflare 平台。

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
GitHub 仓库
    │
    └──→ Cloudflare
         ├── Pages (前端网站)
         │   - 静态网站托管
         │   - 全球 CDN 加速
         │
         ├── Workers (API 服务)
         │   - 邮件发送服务
         │   - 后台管理 API
         │
         └── KV (数据存储)
             - 配置存储
```

### 目录结构

```
labubu/
├── workers/                     # 📧 API 服务 (Cloudflare Workers)
│   ├── src/
│   │   ├── index.js            # 入口和路由
│   │   ├── handlers/           # API 处理器
│   │   │   ├── contact.js      # 联系表单
│   │   │   ├── subscribe.js    # 订阅表单
│   │   │   └── admin/          # 后台管理
│   │   └── utils/              # 工具函数
│   ├── wrangler.toml           # Workers 配置
│   └── package.json
│
├── app/                         # 🌐 Next.js 页面
│   ├── admin/                  # 🔐 后台管理页面
│   ├── [locale]/               # 多语言路由
│   ├── about/
│   ├── contact/
│   ├── products/
│   └── ...
│
├── components/
│   ├── ui/                     # 通用 UI 组件
│   └── themes/                 # 🎨 主题组件
│       └── labubu/
│
├── config/
│   └── theme.js                # 主题配置
│
├── data/                        # 📝 页面数据
├── lib/                         # 工具函数
├── locales/                     # 🌍 多语言翻译
├── public/                      # 静态资源
│
├── next.config.mjs             # Next.js 配置
└── package.json
```

---

## ⚙️ 环境要求

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| Node.js | 18.x | 20.x |
| npm | 9.x | 10.x |
| Next.js | 15.x | 15.1.x |
| Wrangler | 3.x | 最新 |

---

## 💻 本地开发

### 前端开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### API 开发

```bash
cd workers
npm install
npm run dev
```

API 运行在 http://localhost:8787

---

## 🚀 部署指南

### 1. 部署 API (Cloudflare Workers)

#### 安装 Wrangler

```bash
npm install -g wrangler
wrangler login
```

#### 创建 KV 命名空间

```bash
cd workers
wrangler kv:namespace create "CONFIG_KV"
```

更新 `wrangler.toml` 中的 Namespace ID。

#### 配置 Secrets

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_EMAIL
wrangler secret put FROM_EMAIL
wrangler secret put ADMIN_USERNAME
wrangler secret put ADMIN_PASSWORD
wrangler secret put JWT_SECRET
```

#### 部署

```bash
npm run deploy
```

记录 API 地址：`https://labubu-api.xxx.workers.dev`

---

### 2. 部署前端 (Cloudflare Pages)

#### 连接 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → Create → Pages
3. 连接 GitHub 并选择仓库

#### 配置构建设置

| 配置项 | 值 |
|-------|-----|
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `out` |

#### 配置环境变量

| 变量名 | 值 |
|-------|-----|
| `NEXT_PUBLIC_API_URL` | Workers API 地址 |
| `NODE_VERSION` | `20` |
| `NPM_FLAGS` | `--legacy-peer-deps` |

#### 部署

点击 "Save and Deploy"。

---

## 🔐 后台管理

### 访问后台

访问 `https://你的网站.com/admin`

### 功能

- 主题切换（需重新构建前端）
- 邮件设置（接收邮箱、发件邮箱）
- 网站设置（名称、描述）

---

## 🎨 主题开发

详见 [主题开发指南](docs/THEME-DEVELOPMENT.md)

### 快速开始

1. 复制现有主题：`cp -r components/themes/labubu components/themes/my-theme`
2. 创建资源目录：`mkdir -p public/themes/my-theme`
3. 在 `config/theme.js` 注册主题
4. 更新 `app/layout.js` 组件导入

---

## 📧 邮件服务配置

### Resend 配置

1. 注册 [Resend](https://resend.com/)
2. 创建 API Key
3. 验证发件域名
4. 在 Workers Secrets 中配置

---

## 🔐 环境变量说明

### Cloudflare Pages

| 变量名 | 说明 |
|-------|------|
| `NEXT_PUBLIC_API_URL` | Workers API 地址 |
| `NODE_VERSION` | Node.js 版本 |
| `NPM_FLAGS` | npm 参数 |

### Cloudflare Workers (Secrets)

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 接收邮箱 |
| `FROM_EMAIL` | 发件邮箱 |
| `ADMIN_USERNAME` | 管理员用户名 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `JWT_SECRET` | JWT 签名密钥 |

---

## 📄 License

MIT License
