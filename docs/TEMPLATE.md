# 模板使用清单（部署前必须完成）

本仓库默认作为模板使用：任何 Cloudflare 资源名称与关键配置都不会“自动正确”。部署前请逐项确认。

## 1) 前端（Cloudflare Pages）

- 修改 `wrangler.toml` 的 `name = "CHANGE_ME_pages_name"` 为你的 Pages 项目名（必须全局唯一）
- 修改 `data/basic.js`：
  - `basic.seo.url`：你的线上域名（用于 canonical / sitemap / robots）
  - `basic.info.brand`：品牌名（用于页面模板与 SEO）
  - `basic.info.email`：对外联系邮箱（如需要）
- Cloudflare Pages 环境变量（Dashboard → Settings → Environment variables）：
  - `NEXT_PUBLIC_API_URL`：Workers API 地址（本地联调可用 `http://localhost:8787`）
  - `NODE_VERSION`：`20`

## 2) API（Cloudflare Workers）

- 修改 `workers/wrangler.toml` 的 `name = "CHANGE_ME_worker_name"` 为你的 Worker 名称（必须全局唯一）
- Secrets（至少）：
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
  - `FROM_EMAIL`
- 可选：启用后台管理（`/api/admin/*`）：
  - Secrets：`ADMIN_USERNAME`（可选，默认 `admin`）、`ADMIN_PASSWORD`、`JWT_SECRET`
  - KV：创建 `CONFIG_KV` 后，在 `workers/wrangler.toml` 中启用 `[[kv_namespaces]]` 并填写 `id`
  - 备注：未绑定 KV 时，`/api/contact` 与 `/api/subscribe` 仍可用；`/api/admin/config` 会返回 `CONFIG_KV not configured`

## 3) 验收（建议）

- `rg -n -i "CHANGE_ME" .` 确认无遗漏
- `pnpm lint`
- `pnpm build`
