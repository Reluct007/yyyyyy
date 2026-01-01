# Labubu API Service

邮件发送和后台管理 API 服务，部署到 Vercel，使用 Cloudflare KV 存储配置。

## API 端点

### 公开 API

| 端点 | 方法 | 说明 |
|-----|------|------|
| `/api/contact` | POST | 联系表单提交 |
| `/api/subscribe` | POST | 邮件订阅 |
| `/api/admin/themes` | GET | 获取可用主题列表 |
| `/api/admin/config` | GET | 获取公开配置 |

### 管理员 API（需要认证）

| 端点 | 方法 | 说明 |
|-----|------|------|
| `/api/admin/login` | POST | 管理员登录 |
| `/api/admin/config` | GET | 获取完整配置 |
| `/api/admin/config` | POST | 更新配置 |

## 环境变量

### Vercel 环境变量

| 变量名 | 必填 | 说明 |
|-------|------|------|
| `RESEND_API_KEY` | ✅ | Resend API 密钥 |
| `CONTACT_EMAIL` | ✅ | 默认接收邮箱 |
| `FROM_EMAIL` | ✅ | 默认发件邮箱 |
| `ADMIN_USERNAME` | ✅ | 管理员用户名 |
| `ADMIN_PASSWORD` | ✅ | 管理员密码 |
| `JWT_SECRET` | ✅ | JWT 签名密钥 |
| `CF_ACCOUNT_ID` | ✅ | Cloudflare 账户 ID |
| `CF_KV_NAMESPACE_ID` | ✅ | Cloudflare KV 命名空间 ID |
| `CF_API_TOKEN` | ✅ | Cloudflare API Token |

## Cloudflare KV 配置

### 1. 创建 KV 命名空间

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → KV
3. 点击 "Create a namespace"
4. 输入名称（如 `labubu-config`）
5. 记录 Namespace ID

### 2. 创建 API Token

1. 进入 My Profile → API Tokens
2. 点击 "Create Token"
3. 选择 "Create Custom Token"
4. 配置权限：
   - Account → Workers KV Storage → Edit
5. 创建并复制 Token

### 3. 获取 Account ID

在 Cloudflare Dashboard 右侧边栏可以看到 Account ID

### 4. 在 Vercel 添加环境变量

将以上三个值添加到 Vercel 环境变量：
- `CF_ACCOUNT_ID`
- `CF_KV_NAMESPACE_ID`
- `CF_API_TOKEN`

## 本地开发

```bash
cd api-service
npm install
vercel dev
```

## 部署

推送到 GitHub 后自动部署到 Vercel。
