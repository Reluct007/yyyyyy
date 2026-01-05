# Next.js App Router 静态站 SEO 工程规范（Cloudflare 部署）

> 适用范围：
> - Next.js **App Router**
> - `output: 'export'` 完全静态输出
> - Cloudflare Pages / CDN
> - B 端 / 内容型 / 类目聚合型站点

本规范的目标是：**确保所有可收录内容在构建期生成，首屏 HTML 即包含完整正文与结构化数据，最大化 SEO 稳定性与可控性。**

补充说明：
- `docs/SEO.md` 是本仓库 SEO 的事实标准（SoT）；本文聚焦“静态导出 + Cloudflare”的工程约束与长期策略落地。
- 若本文与代码实现不一致，以 `docs/SEO.md` 与代码为准；差异应登记到 `docs/todo-list.md`，避免“文档正确但线上错误”。

---

## 一、总体设计原则（必须遵守）

### 1. SEO 第一原则（硬性）

> **搜索引擎看到的 = 构建时生成的 HTML**

因此：
- 所有可被搜索引擎索引的内容 **必须在 Server Components 中输出**
- 不允许依赖 client hydration 才出现正文、列表、价格、描述、JSON-LD

---

### 2. Server / Client 职责边界

#### Server Components（page.js / layout.js）负责：
- 页面正文内容（H1/H2/H3/P）
- 列表 / 分页内容
- SEO Metadata（title / description / canonical）
- JSON-LD（Article / Product / ItemList / Breadcrumb）
- i18n 文案解析

#### Client Components 仅负责：
- 表单提交（RFQ / Contact）
- UI 状态（Tab / Accordion / Modal）
- 主题切换 / 语言切换交互
- onClick / onChange 等浏览器能力

❌ 禁止 Client Component 承载页面主体

---

## 二、目录结构规范

```txt
app/
├─ [locale]/
│  ├─ layout.js        # 语言级 Layout（Server）
│  ├─ page.js          # 首页（Server）
│  ├─ collection/
│  │  ├─ page.js       # 集合页（Server）
│  │  ├─ [slug]/
│  │  │  ├─ page.js    # 类目页（Server）
│  │  │  └─ page/[page]/page.js # 分页（Server）
│  ├─ product/
│  │  └─ [slug]/page.js
│  ├─ about/page.js
│  ├─ contact/page.js
│  └─ ...              # policy/faq 等静态页
├─ (site)/              # 兼容路由（历史英文无前缀，仅用于生成旧路径静态页）
│  └─ ...
│
components/
├─ ui/                 # 低层 UI 原语
└─ features/            # 页面/区块级组件（可包含 'use client'）
data/                   # 内容与配置（可视为轻量 CMS）
lib/                    # SEO/i18n 等工具函数
locales/                # UI 字典
public/_redirects        # Cloudflare Pages 平台侧 301/重写
```

---

## 三、页面层级规范（最关键）

### page.js（必须是 Server Component）

page.js 的职责：
- 获取数据（构建期）
- 渲染完整 HTML
- 输出 JSON-LD

#### 标准示例：
```js
// app/[locale]/product/[slug]/page.js

import { generateProductMetadata } from "@/lib/product-metadata";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  // title/description/canonical/hreflang 统一由工具层生成，避免散落拼接
  return generateProductMetadata(slug, locale);
}

export default async function Page({ params }) {
  const { locale, slug } = params;
  const product = await getProduct({ locale, slug }); // 构建期数据源（例如 data/）

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <ProductSpecs specs={product.specs} />
      <ProductGallery images={product.images} />
      <ProductJsonLd product={product} />
    </>
  )
}
```

---

### ❌ 禁止的反模式

```tsx
'use client'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  if (!mounted) return <Loading />
  return <MainContent />
}
```

> ❗该模式会导致：
> - 静态 HTML 无正文
> - JSON-LD 丢失
> - 搜索引擎仅看到 Loading
>
> 备注：历史页面若已存在该模式，应登记到 `docs/todo-list.md` 并逐步收敛；新增/重构页面不应再引入。

---

## 四、SEO Metadata 规范（App Router）

### 使用 Next.js Metadata API

#### 每个 page.js 必须导出：
```ts
export const metadata = {
  title: '...',
  description: '...',
  alternates: { canonical: '...' },
}
```

#### 动态页面：
```ts
export async function generateMetadata({ params }) {
  const data = await getData(params)
  return {
    title: data.seoTitle,
    description: data.seoDescription,
  }
}
```

---

## 五、JSON-LD 规范（强制）

### 允许的输出方式

- 仅允许在 **Server Component** 中直接输出 `<script type="application/ld+json">`

```tsx
export function ProductJsonLd({ product }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
        }),
      }}
    />
  )
}
```

### ❌ 禁止方式
- useEffect 注入
- client component 注入
- hydration 后生成

---

## 六、i18n 工程规范

### 核心原则

> `params.locale` 是唯一语言事实源

### 正确做法
```ts
export default async function Page({ params }) {
  const t = await getTranslations(params.locale)
  return <h1>{t('title')}</h1>
}
```

### ❌ 禁止做法
- useLanguage + client hydration 才出文案
- 构建期 HTML 输出占位符

---

## 七、列表 / 类目 / 分页规范

### 必须遵守
- 每个分页 = 独立路由
- 构建期 slice 数据
- 构建期输出 ItemList JSON-LD

```txt
/{locale}/collection/<slug>/
/{locale}/collection/<slug>/page/2/
/{locale}/collection/<slug>/page/3/
```

---

## 八、图片 SEO 规范（摘要）

- 文件名语义化（英文 + `-`）
- 必须有 alt（自然语言）
- 图片靠近相关 H2/H3
- WebP / AVIF
- 首屏图标记为 LCP

---

## 九、Cloudflare + 静态导出规范

### next.config.mjs
```js
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

### 禁止使用
- Server Actions
- Edge Runtime API
- 动态 headers / cookies
- middleware 做 i18n 协商（静态导出下不运行；跳转应放在 `public/_redirects`）

---

## 十、上线前 SEO 自检清单

- [ ] View Source 中能看到完整正文
- [ ] View Source 中能看到 JSON-LD
- [ ] JS 禁用下页面仍完整
- [ ] 每个分页可独立访问
- [ ] 每种语言 HTML 文案正确
- [ ] canonical/hreflang/末尾斜杠规则一致（实现细节见 `docs/SEO.md`）

---

## 十一、规范适用声明

> 本规范适用于：
> - B2B 产品站
> - 内容站 / 博客
> - 类目聚合 / SEO 落地页

如需突破本规范，必须明确说明 SEO 风险并评估影响。

---

## 十二、长期复利 SEO 路线图（本项目版）

本节面向“拉开差距”的长期策略，强调结构化、可复用、可持续。默认约束：静态导出 + `/{locale}` 前缀（包含 `en`）+ URL 末尾 `/`（事实标准见 `docs/SEO.md`）。

### 1) 站点结构工程：URL = 搜索意图层级

本项目的主模型建议：
- **类目 → 产品**：承载主交易意图与转化。
- **问题/指南 → 转化页**（可选扩展）：承载信息型意图，形成内容护城河并向类目/产品导流。

建议的 URL 语义（示例）：
```txt
/{locale}/collection/
/{locale}/collection/<category>/
/{locale}/product/<product>/
```

工程化约束（重要）：
- URL 一旦发布尽量稳定：避免“标题微调 = slug 变化 = 旧 URL 失效”。如必须调整，配套维护 `public/_redirects` 的 301，并同步检查 canonical/sitemap。
- 所有页面 URL 必须以 `/` 结尾，与 `trailingSlash: true` 对齐（`next.config.mjs`）。

### 2) 关键词策略：用“词族（Cluster）”组织目录与页面

核心原则：
- **1 个词族 ≈ 1 个目录（类目页）**
- **1 个主词 ≈ 1 个核心 page（类目/产品）**
- 长尾词默认不拆独立 page：沉入同一核心页的模块（规格表/FAQ/术语解释），避免站内 cannibalization。

例外判定（避免过度拆页）：
- 只有当“子意图”能提供稳定、不可替代的信息（规格/标准/采购维度）且能形成独立内链入口时，才值得单独建页；否则优先集中在类目页。

### 3) 内容层：每个可索引页必须有“不可替代信息”

对 B2B 类目/产品页，优先补齐这 4 类（竞争对手往往缺失，且可长期复用）：
1. **规格/选型对比表**（可被引用、可复制）
2. **使用场景说明**（偏事实与限制条件，避免营销空话）
3. **采购/决策维度**（MOQ、材质、工艺、交期、包装、合规等）
4. **行业术语解释**（定义 + 差异 + 选型建议）

工程落地建议（不强制）：
- 可结构化的信息优先下沉到 `data/`，由 Server Components 渲染，减少重复并天然支持多语言。
- 表格/FAQ 作为“长尾承载层”，减少为每个长尾新建路由带来的薄内容与维护成本。

### 4) 技术 SEO 的“隐藏分”：内链与结构化数据是信息架构

内链不是“随便链”，而是对爬虫表达信息层级。推荐三类内链（每条都必须讲得通）：
1. **父 → 子**：集合页 → 类目页 → 产品页
2. **兄弟类目**：同一购买意图下的横向对比入口
3. **内容 → 转化**：指南/术语 → 类目/产品

Schema（按页面类型选择，字段只写真实可验证数据）：
- 类目页：`ItemList` + `BreadcrumbList`
- 产品页：`Product` + `BreadcrumbList`
- FAQ：`FAQPage`
- 内容页（若新增）：`Article`/`HowTo`（按内容形态选择）

硬性约束：
- 不要 client 注入：必须在 View Source 中可见（静态导出下尤其关键）。
- 多语言 canonical/hreflang 统一走 `lib/hreflang.js` 等工具层（实现细节见 `docs/SEO.md`），避免页面内手写字符串拼接。

### 5) SEO 工程化：把“运营动作”变成“可重复流程”

#### SEO PR Checklist（建议纳入 Review）

- [ ] 页面主体是否由 Server Component 输出（View Source 有正文）
- [ ] `title/description/canonical` 是否正确，且 URL 符合 `/{locale}` + 末尾 `/`
- [ ] hreflang/alternates 是否通过工具层生成（非分页页）
- [ ] View Source 是否存在 JSON-LD，且类型匹配页面
- [ ] H1 是否唯一且表达主意图
- [ ] 是否至少有 1 个可索引入口内链指向该页（避免孤岛）
- [ ] 是否避免意图重复页面（必要时 noindex/canonical/301）
- [ ] `pnpm lint` + `pnpm build` 通过（并抽查 `out/` 中 `sitemap.xml`/`robots.txt`）

#### 页面生命周期管理（索引策略）

- 新页面：默认 index（进入 sitemap，并有内链入口）
- 重复/弱页：优先合并 → canonical 收敛；或 noindex（保留转化但不争排名）
- 被替代内容：301 → 新 URL（维护 `public/_redirects`，同步更新 sitemap）

#### Search Console 的关注点（非“只看排名”）

- Coverage（索引覆盖与错误）
- Crawled – currently not indexed（重复/薄内容/意图弱的信号）
- Indexed but not ranked（优先补“不可替代信息”与内链入口，而非堆关键词）
