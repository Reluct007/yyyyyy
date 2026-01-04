# 部署文档

本文档介绍如何在新电脑上快速部署此项目。

## 📋 前提条件

### 必需账号

| 账号 | 用途 | 注册地址 |
|------|------|----------|
| GitHub | 代码托管 | https://github.com |
| Cloudflare | 网站托管 | https://cloudflare.com |
| Resend | 邮件服务 | https://resend.com |

### 必需软件

| 软件 | 版本 | 安装方式 |
|------|------|----------|
| Node.js | 20+ | https://nodejs.org 或 `brew install node` |
| pnpm | 10+ | https://pnpm.io/installation |
| Git | 最新版 | https://git-scm.com 或 `brew install git` |
| Wrangler | 3.0+ | `pnpm install` 后通过 `pnpm -C workers exec wrangler` 使用 |

### 验证安装

```bash
node -v      # 应显示 v20.x.x 或更高
pnpm -v      # 应显示 10.x.x 或更高
git --version
pnpm -C workers exec wrangler -v  # 应显示 3.x.x 或更高（需先安装依赖）
```

## 🔧 本地环境搭建

### 1. 克隆代码

```bash
git clone <your-repo-url>
cd labubu
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 本地运行

```bash
# 终端 1: 启动前端
pnpm dev

# 终端 2: 启动 API (可选)
pnpm -C workers dev
```

### 4. 验证

- 前端: http://localhost:3000
- API: http://localhost:8787

## 🌐 部署前端 (Cloudflare Pages)

### 步骤 1: 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单选择 **Workers & Pages**
3. 点击 **Create** → **Pages** → **Connect to Git**
4. 授权 GitHub 并选择仓库

### 步骤 2: 配置构建设置

| 配置项 | 值 |
|--------|-----|
| 生产分支 | `main` |
| 构建命令 | `pnpm run build` |
| 构建输出目录 | `out` |
| 根目录 | `labubu` (如果是子目录) |

### 步骤 3: 配置环境变量

在 **Settings** → **Environment variables** 添加:

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://api.yooyooy.com` | API 地址 |
| `NODE_VERSION` | `20` | Node.js 版本 |

### 步骤 4: 部署

点击 **Save and Deploy**，等待构建完成。

### 步骤 5: 绑定自定义域名

1. 进入项目 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入域名 (如 `yooyooy.com`)
4. 按提示配置 DNS

## ⚡ 部署 API (Cloudflare Workers)

### 步骤 1: 登录 Wrangler

```bash
pnpm -C workers exec wrangler login
# 浏览器会打开授权页面，点击允许
```

### 步骤 2: 配置 Secrets

```bash
# 设置 Resend API 密钥
pnpm -C workers exec wrangler secret put RESEND_API_KEY
# 输入你的 Resend API Key

# 设置接收邮件的邮箱
pnpm -C workers exec wrangler secret put CONTACT_EMAIL
# 输入接收表单的邮箱地址

# 设置发件邮箱
pnpm -C workers exec wrangler secret put FROM_EMAIL
# 输入已在 Resend 验证的发件邮箱
```

### 步骤 3: 部署

```bash
pnpm -C workers deploy
# 或
pnpm -C workers exec wrangler deploy --keep-vars
```

### 步骤 4: 绑定自定义域名

1. Cloudflare Dashboard → Workers & Pages
2. 选择你的 Worker
3. **Settings** → **Triggers** → **Custom Domains**
4. 添加域名 `api.yooyooy.com`

## 📧 配置 Resend 邮件服务

### 步骤 1: 创建 API Key

1. 登录 [Resend Dashboard](https://resend.com/api-keys)
2. 点击 **Create API Key**
3. 复制 API Key (只显示一次)

### 步骤 2: 验证发件域名

1. 进入 [Domains](https://resend.com/domains)
2. 点击 **Add Domain**
3. 输入你的域名 (如 `yooyooy.com`)
4. 按提示添加 DNS 记录:
   - MX 记录
   - TXT 记录 (SPF)
   - TXT 记录 (DKIM)
5. 等待验证完成 (通常几分钟)

### 步骤 3: 配置发件邮箱

验证域名后，可使用该域名下任意邮箱作为发件人:
- `noreply@yooyooy.com`
- `contact@yooyooy.com`

## 📊 环境变量汇总

### Cloudflare Pages 环境变量

| 变量名 | 示例值 | 说明 |
|--------|--------|------|
| `NEXT_PUBLIC_API_URL` | `https://api.yooyooy.com` | Workers API 地址 |
| `NODE_VERSION` | `20` | Node.js 版本 |

### Cloudflare Workers Secrets

| 变量名 | 说明 |
|--------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 接收表单的邮箱 |
| `FROM_EMAIL` | 发件邮箱 (需验证域名) |

## 🔄 更新部署

### 前端更新

```bash
# 推送代码到 main 分支，自动触发构建
git add .
git commit -m "update"
git push origin main
```

### API 更新

```bash
pnpm -C workers deploy
```

### 手动触发重新构建

Cloudflare Dashboard → Pages → 项目 → Deployments → **Retry deployment**

## ❓ 常见问题

### Q: 构建失败，提示 Node 版本问题？

A: 确保在 Cloudflare Pages 环境变量中设置 `NODE_VERSION=20`

### Q: 表单提交失败？

检查以下配置:
1. `NEXT_PUBLIC_API_URL` 是否正确
2. Workers 是否部署成功
3. Workers Secrets 是否配置
4. Resend API Key 是否有效
5. FROM_EMAIL 域名是否已验证

### Q: 修改 SEO 配置没生效？

A: SEO 配置在 `data/basic.js`，修改后需推送代码触发重新构建

### Q: 如何查看构建日志？

A: Cloudflare Dashboard → Pages → 项目 → Deployments → 点击具体部署

### Q: 如何查看 Workers 日志？

```bash
pnpm -C workers tail
# 或
pnpm -C workers exec wrangler tail
```

### Q: 新电脑如何快速部署？

```bash
# 1. 安装 Node.js 20+
# 2. 安装 pnpm（https://pnpm.io/installation）
npm i -g pnpm

# 3. 克隆代码
git clone <repo-url>
cd labubu

# 4. 安装依赖
pnpm install

# 5. 登录 Cloudflare
pnpm -C workers exec wrangler login

# 6. 部署 Workers
pnpm -C workers deploy

# 7. 前端通过 GitHub 推送自动部署
git push origin main
```

## 🔗 有用链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Resend 文档](https://resend.com/docs)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
