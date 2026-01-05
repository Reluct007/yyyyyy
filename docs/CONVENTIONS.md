# 工程约定（CONVENTIONS）

本文是本仓库的工程约定索引入口，目标是降低协作摩擦与 Review 成本。若本文与代码实现不一致，以代码实现为准。

## 文档入口

- 项目概览与本地开发：`README.md`
- 部署与环境变量：`DEPLOY.md`
- Workers（API）：`workers/README.md`
- SEO 规范与维护：`docs/SEO.md`

## 必跑命令（本地/CI 对齐）

- Lint：`pnpm lint`
- Build（静态导出）：`pnpm build`
- Workers 本地调试：`pnpm -C workers dev`
- Wrangler（Workers 配套 CLI）：优先使用 `pnpm -C workers exec wrangler` 避免全局版本漂移

## 目录结构与职责边界

- `app/`：Next.js App Router 路由与布局
  - `app/(site)/`：默认站点路由（默认语言/无前缀）
  - `app/[locale]/`：多语言路由（根据 `data/i18n.js` 生成/约束）
- `components/`：可复用组件
  - `components/ui/`：低层 UI 原语（Radix + Tailwind），优先保持 API 稳定、可组合
  - `components/features/`：页面/区块级组件（文件名 kebab-case）
- `data/`：内容与配置（可视为轻量 CMS），改动需同步检查受影响页面
- `locales/`：多语言字典（新增/改动文案需同步更新各语言）
- `workers/`：Cloudflare Workers（独立 package 与部署流程）
- `scripts/`：构建辅助脚本（例如 sitemap 生成）

## 命名与代码风格

- 缩进：2 spaces；语句以分号结尾（遵循现有文件风格）
- 文件命名：`kebab-case`；React 组件导出使用 `PascalCase`
- 导入别名：`@/` 指向项目根（见 `jsconfig.json`）
- 日志：避免 `console.log`（允许 `console.warn`/`console.error`；Workers 与 scripts 目录不受该限制，见 `.eslintrc.json`）

## i18n 约定

- 语言配置：`data/i18n.js`（`DEFAULT_LOCALE`、`SUPPORTED_LOCALES`）
- 路由组织：`app/[locale]/...` 作为多语言入口；默认路由在 `app/(site)/...`
- SEO/元信息：优先使用现有的 `lib/metadata-translations` 与 `lib/hreflang` 生成逻辑，避免在页面内散落重复的 SEO 拼装代码

## 构建与发布约定

- Next.js 静态导出：`next.config.mjs` 使用 `output: "export"`；`images.unoptimized: true`；`trailingSlash: true`
- Build 前置：`pnpm build` 会先执行 `scripts/generate-sitemap.mjs`（由 `prebuild` hook 触发）
- 产物目录：`.next/` 与 `out/` 为构建输出，不应提交（已在 `.gitignore` 中忽略）

## 变更原则（KISS/DRY/YAGNI/SOLID）

- KISS：优先选择最直接、可读性最强的实现；避免“为了复用而复用”的抽象
- DRY：发现重复的页面区块/数据结构时，优先抽到 `components/features/` 或 `data/` 层统一
- YAGNI：不预埋未被需求驱动的配置与分支；只实现当前明确需要的能力
- SOLID：保持组件单一职责；将可变逻辑收敛到 `data/` 或小而清晰的工具函数中
