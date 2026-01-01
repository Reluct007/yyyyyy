# Labubu API Service

邮件发送和后台管理 API 服务，部署到 Vercel。

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

### 必需

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 默认接收邮箱 |
| `FROM_EMAIL` | 默认发件邮箱 |
| `ADMIN_USERNAME` | 管理员用户名 |
| `ADMIN_PASSWORD` | 管理员密码 |

### 可选

| 变量名 | 说明 | 默认值 |
|-------|------|-------|
| `JWT_SECRET` | JWT 签名密钥 | 随机字符串（生产环境必须设置） |

### Vercel KV（用于配置存储）

需要在 Vercel 项目中启用 KV 存储：

1. 进入 Vercel 项目 → Storage
2. 创建 KV Database
3. 连接到项目

## 本地开发

```bash
cd api-service
npm install
vercel dev
```

## 部署

推送到 GitHub 后自动部署到 Vercel。

确保设置了所有必需的环境变量。
