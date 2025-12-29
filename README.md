# Labubu Wholesale - 多语言电商网站

## 项目简介

Labubu Wholesale 是一个基于 Next.js 14 构建的多语言电商网站，专注于设计师玩具和收藏品的批发业务。

## 技术栈

- **框架**: Next.js 14.2.16 (App Router)
- **运行时**: Edge Runtime
- **部署**: Cloudflare Pages
- **样式**: Tailwind CSS
- **UI 组件**: Radix UI + shadcn/ui
- **图标**: Lucide React
- **国际化**: 支持 6 种语言 (en, es, fr, de, ja, ko)

## 功能特性

### 多语言支持
- 6 种语言完整翻译
- 动态语言切换
- SEO 优化的多语言 meta 标签
- 语言特定的 URL 结构

### 核心功能
- 产品展示和分类
- 动态产品详情页
- 联系表单和询价功能
- 响应式设计
- SEO 优化
- Sitemap 和 Robots.txt

### 页面结构
```
/                           # 英文首页
/{locale}                   # 其他语言首页
/products                   # 产品列表
/{locale}/products          # 多语言产品列表
/product/{slug}             # 产品详情
/{locale}/product/{slug}    # 多语言产品详情
/about                      # 关于我们
/contact                    # 联系我们
/privacy-policy             # 隐私政策
/terms-conditions           # 条款和条件
/{locale}/privacy-policy    # 多语言隐私政策
/{locale}/terms-of-service  # 多语言服务条款
```

## 安装和运行

### 环境要求
- Node.js 22.16.0+
- npm 10.9.2+

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 部署到 Cloudflare Pages
```bash
npm run pages:build
```

## 项目结构

```
PANDING/
├── app/                    # Next.js App Router 页面
│   ├── [locale]/          # 多语言路由
│   ├── layout.js          # 根布局
│   └── page.js            # 首页
├── components/            # React 组件
│   ├── common/           # 通用组件
│   └── ui/               # UI 组件库
├── data/                  # 静态数据
├── lib/                   # 工具函数
│   ├── i18n.js           # 客户端国际化
│   ├── i18n-server.js    # 服务端国际化
│   ├── language-context.js # 语言上下文
│   └── metadata-translations.js # SEO 翻译
├── locales/              # 语言翻译文件
├── public/               # 静态资源
└── content/              # Markdown 内容
```

## 环境变量

创建 `.env` 文件：
```
# 添加必要的环境变量
```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

专有软件 - 保留所有权利

## 联系方式

- 网站: https://www.labubuwholesale.com
- 邮箱: info@labubuwholesale.com
