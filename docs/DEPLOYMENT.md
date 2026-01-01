# 部署文档

本项目全部部署在 Cloudflare 平台：前端使用 Pages，API 使用 Workers，配置存储使用 KV。

---

## 📋 部署前准备

### 账号准备

- [GitHub](https://github.com/) - 代码托管
- [Cloudflare](https://cloudflare.com/) - 部署平台
- [Resend](https://resend.com/) - 邮件服务

### Resend 配置

#### 1. 创建 API Key

1. 登录 Resend Dashboard
2. Settings → API Keys → Create API Key
3. 保存 API Key（格式：`re_xxxxxxxxx`）

#### 2. 验证发件域名

1. Domains → Add Domain
2. 输入域名（如 `yourdomain.com`）
3. 添加 DNS 记录：

| 类型 | 名称 | 值 |
|-----|------|-----|
| MX | @ | feedback-smtp.us-east-1.amazonses.com |
| TXT | @ | v=spf1 include:amazonses.com ~all |
| TXT | resend._domainkey | (Resend 提供的值) |

4. 等待验证完成

---

## 📧 第一步：部署 API (Cloudflare Workers)

> API 必须先部署，因为前端需要 API 地址作为环境变量。

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 2. 创建 KV 命名空间

```bash
cd workers
wrangler kv:namespace create "CONFIG_KV"
```

输出示例：
```
🌀 Creating namespace with title "labubu-api-CONFIG_KV"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
[[kv_namespaces]]
binding = "CONFIG_KV"
id = "3770414ddf9b4f3588e33c5bbe371046"
```

更新 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "CONFIG_KV"
id = "你的-namespace-id"
```

### 3. 配置 Secrets

逐个运行以下命令，按提示输入值：

```bash
wrangler secret put RESEND_API_KEY
# 输入 Resend API Key

wrangler secret put CONTACT_EMAIL
# 输入接收表单的邮箱

wrangler secret put FROM_EMAIL
# 输入发件邮箱（域名需在 Resend 验证）

wrangler secret put ADMIN_USERNAME
# 输入后台管理用户名

wrangler secret put ADMIN_PASSWORD
# 输入后台管理密码

wrangler secret put JWT_SECRET
# 输入随机字符串作为 JWT 密钥
```

### 4. 部署 Workers

```bash
npm install
npm run deploy
```

部署成功后获得 API 地址：
```
Published labubu-api (x.xx sec)
  https://labubu-api.your-subdomain.workers.dev
```

### 5. 配置自定义域名（推荐）

1. Cloudflare Dashboard → Workers & Pages → 选择 Worker
2. Settings → Triggers → Custom Domains
3. Add Custom Domain → 输入域名（如 `api.yourdomain.com`）
4. 等待 DNS 生效

### 6. 验证 API

```bash
curl https://api.yourdomain.com/
```

应返回：
```json
{"success":true,"msg":"Labubu API is running","endpoints":[...]}
```

---

## 🌐 第二步：部署前端 (Cloudflare Pages)

### 1. 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单 → Workers & Pages
3. Create → Pages → Connect to Git
4. 授权并选择 GitHub 仓库

### 2. 配置构建设置

| 配置项 | 值 |
|-------|-----|
| 项目名称 | `labubu` (自定义) |
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `out` |
| 根目录 | (留空) |

### 3. 配置环境变量

> ⚠️ **重要**：必须在 **生产环境** 和 **预览环境** 都设置！

点击 "Environment variables" → 添加：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` | Workers API 地址（不带末尾斜杠） |
| `NODE_VERSION` | `20` | Node.js 版本 |
| `NPM_FLAGS` | `--legacy-peer-deps` | 解决依赖冲突 |

### 4. 部署

点击 "Save and Deploy"，等待构建完成（约 2-5 分钟）。

### 5. 配置自定义域名（可选）

1. 项目 → Custom domains → Set up a custom domain
2. 输入域名 → 按提示配置 DNS

---

## ✅ 部署验证

### 功能测试清单

- [ ] 首页正常加载
- [ ] 产品页面正常
- [ ] 多语言切换正常
- [ ] 联系表单提交成功
- [ ] 订阅表单提交成功
- [ ] 邮件正常接收
- [ ] 后台登录正常 (`/admin`)
- [ ] 后台设置保存正常

### API 端点测试

```bash
# 测试 API 状态
curl https://api.yourdomain.com/

# 测试订阅
curl -X POST https://api.yourdomain.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 测试联系表单
curl -X POST https://api.yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

---

## 🔄 更新部署

### 前端更新

推送代码到 `main` 分支自动触发重新构建。

手动重新部署：
1. Cloudflare Pages → 项目 → Deployments
2. 选择最新部署 → "..." → Retry deployment

### API 更新

```bash
cd workers
npm run deploy
```

### 环境变量更新

修改环境变量后必须重新部署才能生效：

- **Pages 环境变量**：修改后需重新构建前端
- **Workers Secrets**：修改后需重新部署 Workers

---

## 🐛 故障排查

### 构建失败

**依赖安装失败**
- 确保设置 `NPM_FLAGS=--legacy-peer-deps`

**Node.js 版本错误**
- 确保设置 `NODE_VERSION=20`

### API 调用失败

**CORS 错误**
- Workers 已配置 CORS，检查 API 地址是否正确

**邮件发送失败**
1. 检查 Resend API Key 是否有效
2. 确认发件域名已验证
3. 查看 Workers 日志：Dashboard → Workers → Logs

### 环境变量不生效

**前端 API 地址没变**
- `NEXT_PUBLIC_` 变量在构建时注入
- 修改后必须重新部署
- 确保生产和预览环境都设置了

**后台登录失败**
- 检查 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 是否正确设置
- 使用 `wrangler secret list` 查看已配置的 secrets

### 查看日志

**Pages 构建日志**
- 项目 → Deployments → 选择部署 → View build log

**Workers 运行日志**
- Workers & Pages → 选择 Worker → Logs → Begin log stream

---

## 📊 部署检查清单

### Cloudflare Workers

- [ ] KV 命名空间已创建
- [ ] `wrangler.toml` 中 KV ID 已更新
- [ ] 所有 Secrets 已配置
- [ ] Workers 部署成功
- [ ] API 端点可访问

### Cloudflare Pages

- [ ] 构建命令：`npm run build`
- [ ] 输出目录：`out`
- [ ] `NEXT_PUBLIC_API_URL` 已配置（生产+预览）
- [ ] `NODE_VERSION=20`
- [ ] `NPM_FLAGS=--legacy-peer-deps`
- [ ] 部署成功

### 功能验证

- [ ] 网站可访问
- [ ] 表单提交成功
- [ ] 邮件正常接收
- [ ] 后台可登录

---

## 🔗 相关链接

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare KV 文档](https://developers.cloudflare.com/kv/)
- [Resend 文档](https://resend.com/docs)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
