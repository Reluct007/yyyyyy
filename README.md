# Poker Kit - Next.js 电商网站

多语言扑克套装电商网站，部署在 Cloudflare Pages。

## 技术栈

- **框架**: Next.js 15 (静态导出)
- **样式**: Tailwind CSS
- **部署**: Cloudflare Pages
- **文件上传**: Cloudflare Workers + R2

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问
http://localhost:3000
```

## 构建

```bash
# 构建静态网站
pnpm build

# 输出目录: out/
```

## 部署

### 1. 主网站 (Cloudflare Pages)

**自动部署**：推送到 GitHub 自动触发

**手动配置**：
- 构建命令: `pnpm build`
- 构建输出: `out`
- Node.js 版本: 20+

### 2. 上传 API (Cloudflare Worker)

```bash
cd upload-worker
npx wrangler deploy
```

**Worker URL**: `https://yyyyyy-upload-api.reluct007.workers.dev`

**需要 R2 存储桶**: `yyyyyy-uploads`

## 功能特性

- ✅ 多语言支持 (6 种语言)
- ✅ 产品目录 (900+ 产品)
- ✅ 管理后台
- ✅ 文件上传 (R2 存储)
- ✅ SEO 优化
- ✅ 响应式设计

## 项目结构

```
├── app/              # Next.js App Router
├── components/       # React 组件
├── data/            # 产品数据
├── lib/             # 工具函数
├── public/          # 静态资源
├── upload-worker/   # 上传 Worker
└── out/             # 构建输出
```

## 环境变量

无需环境变量（静态网站）

## 许可证

MIT
