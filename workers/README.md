# Labubu API - Cloudflare Workers

邮件发送和后台管理 API，部署到 Cloudflare Workers，使用 KV 存储配置。

## API 端点

| 端点 | 方法 | 说明 | 认证 |
|-----|------|------|-----|
| `/` | GET | API 状态 | 无 |
| `/api/contact` | POST | 联系表单 | 无 |
| `/api/subscribe` | POST | 邮件订阅 | 无 |
| `/api/admin/login` | POST | 管理员登录 | 无 |
| `/api/admin/config` | GET | 获取配置 | 无（可选 JWT；带管理员 token 会返回完整配置） |
| `/api/admin/config` | POST | 更新配置 | JWT（管理员） |

## 快速部署

### 1. 安装依赖

```bash
# 在仓库根目录安装依赖（会同时安装 workers）
pnpm install

# 登录 Cloudflare（使用本地 wrangler）
pnpm -C workers exec wrangler login
```

### 2. 创建 KV

```bash
pnpm -C workers exec wrangler kv:namespace create "CONFIG_KV"
```

更新 `workers/wrangler.toml` 中的 `kv_namespaces.id`。

### 3. 配置 Secrets

```bash
pnpm -C workers exec wrangler secret put RESEND_API_KEY
pnpm -C workers exec wrangler secret put CONTACT_EMAIL
pnpm -C workers exec wrangler secret put FROM_EMAIL
pnpm -C workers exec wrangler secret put ADMIN_USERNAME
pnpm -C workers exec wrangler secret put ADMIN_PASSWORD
pnpm -C workers exec wrangler secret put JWT_SECRET
pnpm -C workers exec wrangler secret put DEPLOY_HOOK_URL # 可选：用于保存配置后触发 Pages 重新构建
```

### 4. 部署

```bash
pnpm -C workers deploy
```

## 本地开发

```bash
pnpm -C workers dev
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
| `ADMIN_USERNAME` | 管理员用户名（默认 `admin`） |
| `ADMIN_PASSWORD` | 管理员密码（启用管理员登录必填） |
| `JWT_SECRET` | JWT 签名密钥（生产环境必填） |
| `DEPLOY_HOOK_URL` | （可选）Cloudflare Pages Deploy Hook URL（用于配置更新后触发重新构建） |

## 配置存储 (KV)

后台管理的配置存储在 KV 中，key 为 `site_config`：

```json
{
  "contactEmail": "custom@email.com",
  "fromEmail": "noreply@domain.com",
  "fromName": "Poker Kit",
  "siteName": "Poker Kit",
  "seoTitle": "Poker Kit Wholesale & Custom Poker Sets | PokerKit.com",
  "seoDescription": "B2B supplier of premium poker kits ...",
  "seoKeywords": "poker set, poker chips",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "updatedBy": "admin"
}
```

推荐始终配置 `CONFIG_KV`：未绑定 KV 会导致 `/api/admin/config` 无法读写；联系/订阅接口会回退到环境变量默认值。
