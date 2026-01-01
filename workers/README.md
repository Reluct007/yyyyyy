# Labubu API - Cloudflare Workers

邮件发送和后台管理 API，部署到 Cloudflare Workers，使用 Cloudflare KV 存储配置。

## API 端点

| 端点 | 方法 | 说明 |
|-----|------|------|
| `/api/contact` | POST | 联系表单提交 |
| `/api/subscribe` | POST | 邮件订阅 |
| `/api/admin/login` | POST | 管理员登录 |
| `/api/admin/config` | GET/POST | 获取/更新配置 |
| `/api/admin/themes` | GET | 获取可用主题列表 |

## 部署步骤

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

记录输出的 Namespace ID，更新 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "CONFIG_KV"
id = "你的-namespace-id"
```

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
npm run deploy
```

部署成功后会得到 API 地址，如：`https://labubu-api.your-subdomain.workers.dev`

### 5. 更新前端 API 地址

在 Cloudflare Pages 环境变量中更新：

```
NEXT_PUBLIC_API_URL=https://labubu-api.your-subdomain.workers.dev
```

## 本地开发

```bash
cd workers
npm install
npm run dev
```

## 环境变量

| 变量名 | 说明 |
|-------|------|
| `RESEND_API_KEY` | Resend API 密钥 |
| `CONTACT_EMAIL` | 默认接收邮箱 |
| `FROM_EMAIL` | 默认发件邮箱（需在 Resend 验证域名） |
| `ADMIN_USERNAME` | 管理员用户名 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `JWT_SECRET` | JWT 签名密钥 |

## 目录结构

```
workers/
├── src/
│   ├── index.js              # 入口文件和路由
│   ├── handlers/
│   │   ├── contact.js        # 联系表单处理
│   │   ├── subscribe.js      # 订阅处理
│   │   └── admin/
│   │       ├── login.js      # 登录处理
│   │       ├── config.js     # 配置管理
│   │       └── themes.js     # 主题列表
│   └── utils/
│       ├── response.js       # 响应工具
│       ├── jwt.js            # JWT 工具
│       └── resend.js         # Resend API 客户端
├── wrangler.toml             # Wrangler 配置
└── package.json
```
