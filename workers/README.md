# Labubu API - Cloudflare Workers

邮件发送和后台管理 API，部署到 Cloudflare Workers，使用 KV 存储配置。

## API 端点

| 端点 | 方法 | 说明 | 认证 |
|-----|------|------|-----|
| `/` | GET | API 状态 | 无 |
| `/api/contact` | POST | 联系表单 | 无 |
| `/api/subscribe` | POST | 邮件订阅 | 无 |
| `/api/admin/login` | POST | 管理员登录 | 无 |
| `/api/admin/config` | GET | 获取配置 | JWT |
| `/api/admin/config` | POST | 更新配置 | JWT |
| `/api/admin/themes` | GET | 主题列表 | 无 |

## 快速部署

### 1. 安装 Wrangler

```bash
npm install -g wrangler
wrangler login
```

### 2. 创建 KV

```bash
wrangler kv:namespace create "CONFIG_KV"
```

更新 `wrangler.toml` 中的 ID。

### 3. 配置 Secrets

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_EMAIL
wrangler secret put FROM_EMAIL
wrangler secret put ADMIN_USERNAME
wrangler secret put ADMIN_PASSWORD
wrangler secret put JWT_SECRET
```

### 4. 部署

```bash
npm install
npm run deploy
```

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:8787

## 目录结构

```
workers/
├── src/
│   ├── index.js              # 入口和路由
│   ├── handlers/
│   │   ├── contact.js        # 联系表单
│   │   ├── subscribe.js      # 订阅
│   │   └── admin/
│   │       ├── login.js      # 登录
│   │       ├── config.js     # 配置管理
│   │       └── themes.js     # 主题列表
│   └── utils/
│       ├── response.js       # 响应工具
│       ├── jwt.js            # JWT 工具
│       └── resend.js         # Resend 客户端
├── wrangler.toml
└── package.json
```

## 环境变量 (Secrets)

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 默认接收邮箱 |
| `FROM_EMAIL` | 默认发件邮箱 |
| `ADMIN_USERNAME` | 管理员用户名 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `JWT_SECRET` | JWT 签名密钥 |

## 配置存储 (KV)

后台管理的配置存储在 KV 中，key 为 `site_config`：

```json
{
  "contactEmail": "custom@email.com",
  "fromEmail": "noreply@domain.com",
  "fromName": "Site Name",
  "activeTheme": "labubu",
  "siteName": "Site Name",
  "siteDescription": "Description",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "updatedBy": "admin"
}
```

如果 KV 中没有配置，会使用 Secrets 中的默认值。
