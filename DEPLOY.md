# 部署文档

## 快速部署

### 前提条件

- GitHub 账号
- Cloudflare 账号
- Resend 账号（用于邮件服务）

---

## 第一步：部署前端 (Cloudflare Pages)

### 1. 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages**
3. 点击 **Create** → **Pages** → **Connect to Git**
4. 授权并选择你的 GitHub 仓库

### 2. 配置构建设置

```
生产分支:        main
构建命令:        npm run build
构建输出目录:    out
根目录:          (留空)
```

### 3. 配置环境变量

在 **Settings** → **Environment variables** 添加：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` | Workers API 地址 |
| `NODE_VERSION` | `20` | Node.js 版本 |

### 4. 部署

点击 **Save and Deploy**，等待构建完成。

### 5. 自定义域名

**Custom domains** → **Set up a custom domain** → 输入你的域名

---

## 第二步：部署 API (Cloudflare Workers)

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 2. 进入 workers 目录

```bash
cd workers
npm install
```

### 3. 配置 Secrets

```bash
# Resend API 密钥
wrangler secret put RESEND_API_KEY

# 接收表单的邮箱
wrangler secret put CONTACT_EMAIL

# 发件邮箱 (需在 Resend 验证域名)
wrangler secret put FROM_EMAIL
```

### 4. 部署

```bash
npm run deploy
```

### 5. 自定义域名

1. Cloudflare Dashboard → Workers & Pages
2. 选择你的 Worker
3. **Settings** → **Triggers** → **Custom Domains**
4. 添加域名，如 `api.yourdomain.com`

---

## 环境变量汇总

### Cloudflare Pages

| 变量名 | 说明 | 示例 |
|-------|------|------|
| `NEXT_PUBLIC_API_URL` | API 地址 | `https://api.yourdomain.com` |
| `NODE_VERSION` | Node 版本 | `20` |

### Cloudflare Workers (Secrets)

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 接收表单的邮箱 |
| `FROM_EMAIL` | 发件邮箱 |

---

## 更新部署

### 自动部署

推送代码到 `main` 分支，Cloudflare Pages 自动触发构建。

### 手动触发

Cloudflare Dashboard → Pages → 你的项目 → **Deployments** → **Retry deployment**

### 更新 Workers

```bash
cd workers
npm run deploy
```

---

## 常见问题

### Q: 修改了 SEO 配置没有生效？

A: SEO 配置在 `data/basic.js` 文件中，修改后需要推送代码触发重新构建。

### Q: 表单提交失败？

A: 检查以下配置：
1. `NEXT_PUBLIC_API_URL` 环境变量是否正确
2. Workers 是否部署成功
3. Resend API Key 是否有效
4. FROM_EMAIL 的域名是否在 Resend 验证

### Q: 如何查看构建日志？

A: Cloudflare Dashboard → Pages → 你的项目 → Deployments → 点击具体部署查看日志

---

## 本地测试

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建测试
npm run build
```
