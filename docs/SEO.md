# SEO 规范与维护指南

本文描述本仓库当前 SEO 实现的“事实标准”与维护流程，目标是降低多人协作下的 SEO 走样与遗漏成本。若本文与代码实现不一致，以代码实现为准。

## 1. 单一事实源（SoT）

SEO 相关配置与逻辑集中在以下位置（按“改动频率/影响面”排序）：

- 站点基础配置（TDK/域名）：`data/basic.js`
  - `basic.seo.title` / `basic.seo.description` / `basic.seo.keywords`
  - `basic.seo.url`：站点根域名（canonical、metadataBase、sitemap、robots 的基准）
  - `basic.info.brand` / `basic.info.email` 等：结构化数据与页面模板引用
- 语言配置：`data/i18n.js`（`DEFAULT_LOCALE`、`SUPPORTED_LOCALES`）
- canonical/hreflang 生成：`lib/hreflang.js`（`buildAlternates()`、`toLocalizedUrl()`）
- URL 末尾斜杠策略：`next.config.mjs`（`trailingSlash: true`）+ `lib/seo-url.js`（`withTrailingSlash()`）
- 社媒共享片段：`lib/shared-metadata.js`（`openGraphImage`、`twitterMetadata`）
- 通用页面 TDK 翻译：`lib/metadata-translations.js`（`getSeoMeta(pageKey, locale)`）
- sitemap 生成：`scripts/generate-sitemap.mjs`（输出到 `public/sitemap.xml`）
- robots：`public/robots.txt`（静态文件）
- 历史链接重定向：`public/_redirects`（Cloudflare Pages 规则）

## 2. URL 与路由约定

- 构建形态：静态导出（`output: "export"`），并启用 `trailingSlash: true`（见 `next.config.mjs`）
- i18n 路由：
  - 默认语言 `en`：无前缀（例如 `/collection/`）
  - 非默认语言：`/{locale}` 前缀（例如 `/fr/collection/`）
  - 语言列表与默认语言由 `data/i18n.js` 统一约束
- canonical/hreflang 的 URL 规范：
  - 页面 URL **必须以 `/` 结尾**（与 `trailingSlash: true` 对齐）
  - 优先使用 `lib/hreflang.js` 的 `buildAlternates()` / `toLocalizedUrl()` 生成，避免在页面内手写字符串拼接
  - 若因局部逻辑需要手写 URL，请确保同时满足：i18n 前缀规则 + 末尾 `/` + 与 sitemap/redirects 不冲突
- `withTrailingSlash()` 仅用于“页面 URL”（不要用于图片/静态资源 URL）

## 3. Next.js Metadata 约定

本仓库使用 Next.js App Router 的 Metadata API：

- 全站默认 metadata：`app/(site)/layout.js`
  - `metadataBase: new URL(withTrailingSlash(basic.seo.url))`
  - `robots`/`googleBot` 默认策略集中配置
  - `openGraph`/`twitter` 使用 `lib/shared-metadata.js` 的共享片段并在页面内 `...spread` 合并（避免覆盖导致 nested 字段丢失）
- 多语言 layout metadata：`app/[locale]/layout.js` 的 `generateMetadata()`
  - `getNonDefaultLocales()` 约束可生成的 `locale` 参数
  - 通过 `getSeoMeta('home', locale)` 生成首页 TDK
- 页面层级：
  - 默认语言静态页：多为 `export const metadata = { ... }`（例如 `app/(site)/about/page.js`）
  - 多语言页/动态页：使用 `export async function generateMetadata({ params }) { ... }`
    - 默认语言产品页：复用 `lib/product-metadata.js`（见 `app/(site)/product/[slug]/page.js`）
    - 多语言产品页：当前在路由内直接生成 metadata（见 `app/[locale]/product/[slug]/page.js`，目前仅设置 canonical，不生成 hreflang languages）

## 4. canonical / hreflang（i18n SEO）

统一使用 `lib/hreflang.js`：

- `buildAlternates({ siteUrl, logicalPath, locale, locales, defaultLocale })`
  - `logicalPath`：以 `/` 开头、以 `/` 结尾的“逻辑路径”（函数内部会补齐并规范化）
  - 返回 `{ canonical, languages }`，其中 `languages` 默认包含 `x-default`
- 建议的输入形态：
  - `siteUrl`：优先使用 `basic.seo.url.replace(/\\/$/, \"\")`（去掉末尾 `/`），避免重复斜杠
  - `locales/defaultLocale`：直接复用 `data/i18n.js` 的导出

### 分类分页策略（避免重复收录）

分类页 metadata 由 `lib/products-metadata.js` 统一生成：

- page=1：
  - `alternates.languages` 有值（提供 hreflang）
  - `robots.index: true`
- page>1：
  - 不生成 `alternates.languages`（避免为分页页扩散 hreflang）
  - `robots.index: false`（仅保留 `follow: true`）
- `.../page/1/`：
  - canonical 指向第一页（`/collection/<slug>/`）
  - 路由文件会额外将 `robots.index` 强制为 `false`（见 `app/(site)/collection/[slug]/page/[page]/page.js` 与 `app/[locale]/collection/[slug]/page/[page]/page.js`）

## 5. Open Graph / Twitter 维护规范

- 默认共享片段：`lib/shared-metadata.js`
- 页面内的正确合并方式（避免覆盖丢字段）：
  - `openGraph: { ...openGraphImage, title, description, url, ... }`
  - `twitter: { ...twitterMetadata, title, description, ... }`
- 如需页面级自定义 OG 图：
  - 绝对 URL：使用 `ROOT_URL + path`（例如产品页）
  - 相对 URL：确保上层 layout 已设置 `metadataBase`（本仓库默认已设置）

## 6. 结构化数据（JSON-LD）

输出方式统一为：

- `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />`

当前覆盖点：

- 站点级：`app/(site)/layout.js`、`app/[locale]/layout.js`
  - `Organization`、`WebSite`
- 页面级：
  - `BreadcrumbList`：如 collection/contact/about 等
  - `Product` + `BreadcrumbList`：产品详情页（`app/(site)/product/[slug]/page.js`、`app/[locale]/product/[slug]/page.js`）
  - `FAQPage`：`components/features/faq.js`

## 7. Robots 与 sitemap

### Robots

`public/robots.txt` 为静态文件（不会由构建脚本自动同步）：

- `Sitemap: <root>/sitemap.xml` 需要与 `data/basic.js` 的 `basic.seo.url` 保持一致
- `Disallow` 规则目前包含若干产品路径模式与 `/cdn-cgi/*`，修改需明确评估影响面

### Sitemap

`public/sitemap.xml` 由 `scripts/generate-sitemap.mjs` 生成（`pnpm build` 前通过 `prebuild` 自动执行）：

- 输入：`data/basic.js`、`data/products.js`、`data/product.js`、`data/i18n.js`
- 输出：`public/sitemap.xml`
- 维护要点：
  - 新增静态页：将逻辑路径加入脚本内 `staticPages` 数组
  - 新增动态路由：确保脚本生成的 `logicalPath` 与真实路由一致（且以 `/` 结尾）
  - 新增/删除语言：仅修改 `data/i18n.js`，sitemap 会随之扩展/收敛

## 8. 常见变更场景清单

### 改域名（root URL）

必须同步修改：

- `data/basic.js`：`basic.seo.url`（必要时同步 `basic.info.link`）
- `public/robots.txt`：`Sitemap:` 行（避免指向旧域名）
- 运行 `pnpm build`：刷新 `public/sitemap.xml` 并产出静态站点

建议抽查：

- `app/(site)/layout.js` 与 `app/[locale]/layout.js` 中 JSON-LD 的 `url/logo/contactPoint.url` 是否仍正确

### 新增页面（静态页/营销页）

- 路由：
  - 默认语言：`app/(site)/<path>/page.js`
  - 多语言：`app/[locale]/<path>/page.js`
- metadata：
  - canonical/hreflang：使用 `buildAlternates()` 生成 `alternates`
  - TDK 翻译：在 `lib/metadata-translations.js` 增加对应 `pageKey`，并在多语言页中使用 `getSeoMeta(pageKey, locale)`
- sitemap：若需要收录，更新 `scripts/generate-sitemap.mjs` 的 `staticPages`
- structured data：按页面类型补齐（通常至少需要 `BreadcrumbList`）

### 新增/调整产品或分类

- 数据源：
  - 分类：`data/products.js`
  - 产品：`data/product.js`
- slug 策略：
  - 当前 URL slug 主要通过 `slugify(title)` 推导（多处依赖），修改 `title` 会导致 URL 变化
  - 若引入“稳定 id”，需要同时对齐：
    - 路由 `generateStaticParams()` 的 slug 生成
    - 产品查找逻辑（例如 `findProduct()`）
    - `scripts/generate-sitemap.mjs` 的 slug 生成策略
  - 原则：避免出现 sitemap 指向未构建的 URL（会造成 404 与抓取噪音）

## 9. 验证（本地/CI 对齐）

- `pnpm lint`
- `pnpm build`（会自动重建 `public/sitemap.xml`）
- 抽查页面输出：
  - `<link rel="canonical">` 是否存在且末尾 `/` 风格一致
  - hreflang 是否符合 `data/i18n.js` 的语言列表
  - `robots` 策略是否符合页面类型（尤其是分页与 `/page/1/`）
  - `public/robots.txt` 的 `Sitemap:` 是否指向当前域名
