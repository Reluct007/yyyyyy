# 部署文档

本文档详细说明如何将项目部署到 Cloudflare Pages (前端) 和 Vercel (API 服务)。

---

## 📋 部署前准备

### 1. 账号准备

- [GitHub](https://github.com/) 账号
- [Cloudflare](https://cloudflare.com/) 账号
- [Vercel](https://vercel.com/) 账号
- [Resend](https://resend.com/) 账号

### 2. Resend 配置

#### 创建 API Key

1. 登录 Resend Dashboard
2. 进入 Settings → API Keys
3. 点击 "Create API Key"
4. 复制并保存 API Key（格式：`re_xxxxxxxxx`）

#### 验证发件域名

1. 进入 Domains → Add Domain
2. 输入你的域名（如 `yourdomain.com`）
3. 按提示添加 DNS 记录：

| 类型 | 名称 | 值 |
|-----|------|-----|
| MX | @ | feedback-smtp.us-east-1.amazonses.com |
| TXT | @ | v=spf1 include:amazonses.com ~all |
| TXT | resend._domainkey | (Resend 提供的值) |

4. 等待验证完成（通常几分钟到几小时）

---

## 🌐 前端部署 (Cloudflare Pages)

### 步骤 1：创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单选择 "Workers & Pages"
3. 点击 "Create" → "Pages"
4. 选择 "Connect to Git"

### 步骤 2：连接 GitHub

1. 点击 "Connect GitHub"
2. 授权 Cloudflare 访问你的 GitHub
3. 选择仓库 `Reluct007/Labubu`
4. 点击 "Begin setup"

### 步骤 3：配置构建设置

填写以下配置：

```
项目名称: labubu (或自定义)
生产分支: main
构建命令: npm run build
构建输出目录: out
根目录: (留空)
```

### 步骤 4：配置环境变量

点击 "Environment variables" 展开，添加以下变量：

| 变量名 | 值 | 类型 |
|-------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://your-api.vercel.app` | 纯文本 |
| `NODE_VERSION` | `20` | 纯文本 |
| `NPM_FLAGS` | `--legacy-peer-deps` | 纯文本 |

> ⚠️ `NEXT_PUBLIC_API_URL` 需要先部署 Vercel API 服务后获取地址

### 步骤 5：部署

1. 点击 "Save and Deploy"
2. 等待构建完成（约 2-5 分钟）
3. 部署成功后获得域名：`https://your-project.pages.dev`

### 步骤 6：配置自定义域名（可选）

1. 进入项目 → Custom domains
2. 点击 "Set up a custom domain"
3. 输入你的域名
4. 按提示配置 DNS 记录

---

## 📧 API 服务部署 (Vercel)

### 步骤 1：导入项目

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New" → "Project"
3. 选择 "Import Git Repository"
4. 选择同一个 GitHub 仓库

### 步骤 2：配置项目设置

**重要：设置 Root Directory**

```
Root Directory: api-service
```

其他设置保持默认：
- Framework Preset: Other
- Build Command: (留空)
- Output Directory: (留空)

### 步骤 3：配置环境变量

添加以下环境变量：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `RESEND_API_KEY` | `re_xxxxxxxxx` | 从 Resend 获取 |
| `CONTACT_EMAIL` | `your@email.com` | 接收表单的邮箱 |
| `FROM_EMAIL` | `noreply@yourdomain.com` | 发件人邮箱 |

> ⚠️ `FROM_EMAIL` 的域名必须在 Resend 中验证过

### 步骤 4：部署

1. 点击 "Deploy"
2. 等待部署完成（约 1-2 分钟）
3. 部署成功后获得 API 地址：`https://your-project.vercel.app`

### 步骤 5：更新前端 API 地址

回到 Cloudflare Pages，更新环境变量：

```
NEXT_PUBLIC_API_URL = https://your-project.vercel.app
```

然后重新部署前端。

---

## 🔄 更新部署

### 自动部署

推送代码到 `main` 分支会自动触发：
- Cloudflare Pages 重新构建
- Vercel 重新部署

### 手动重新部署

**Cloudflare Pages:**
1. 进入项目 → Deployments
2. 点击最新部署的 "..." → "Retry deployment"

**Vercel:**
1. 进入项目 → Deployments
2. 点击 "Redeploy"

---

## 🔧 环境变量修改

### Cloudflare Pages

1. 进入项目 → Settings → Environment variables
2. 编辑或添加变量
3. 保存后需要重新部署才能生效

### Vercel

1. 进入项目 → Settings → Environment Variables
2. 编辑或添加变量
3. 保存后需要重新部署才能生效

---

## 🐛 故障排查

### 构建失败

**问题：依赖安装失败**

确保设置了 `NPM_FLAGS=--legacy-peer-deps`

**问题：Node.js 版本不兼容**

确保设置了 `NODE_VERSION=20`

### API 调用失败

**问题：CORS 错误**

检查 `api-service/vercel.json` 中的 CORS 配置

**问题：邮件发送失败**

1. 检查 Vercel 环境变量是否正确
2. 确认 Resend API Key 有效
3. 确认发件域名已验证
4. 查看 Vercel Function Logs

### 查看日志

**Cloudflare Pages:**
- 进入项目 → Deployments → 选择部署 → View build log

**Vercel:**
- 进入项目 → Logs → 选择 Function

---

## 📊 部署检查清单

### Cloudflare Pages

- [ ] 构建命令设置为 `npm run build`
- [ ] 构建输出目录设置为 `out`
- [ ] `NEXT_PUBLIC_API_URL` 已配置
- [ ] `NODE_VERSION` 设置为 `20`
- [ ] `NPM_FLAGS` 设置为 `--legacy-peer-deps`

### Vercel

- [ ] Root Directory 设置为 `api-service`
- [ ] `RESEND_API_KEY` 已配置
- [ ] `CONTACT_EMAIL` 已配置
- [ ] `FROM_EMAIL` 已配置且域名已验证

### 功能测试

- [ ] 首页正常加载
- [ ] 导航链接正常
- [ ] 产品页面正常
- [ ] 联系表单提交成功
- [ ] 订阅表单提交成功
- [ ] 邮件正常接收
- [ ] 多语言切换正常

---

## 🔗 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vercel 文档](https://vercel.com/docs)
- [Resend 文档](https://resend.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
