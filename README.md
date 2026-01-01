# Labubu Project

多主题网站项目，支持主题切换、多语言、表单邮件服务。

## 📋 目录

- [项目架构](#项目架构)
- [环境要求](#环境要求)
- [本地开发](#本地开发)
- [部署指南](#部署指南)
- [后台管理](#后台管理)
- [主题开发](#主题开发)
- [邮件服务配置](#邮件服务配置)
- [环境变量说明](#环境变量说明)

---

## 🏗️ 项目架构

```
GitHub 仓库
    │
    ├──→ Cloudflare Pages (前端网站)
    │    - 静态网站托管
    │    - 全球 CDN 加速
    │
    └──→ Vercel (API 服务)
         - 邮件发送服务
         - 后台管理 API
         - 配置存储 (Vercel KV)
         - Serverless Functions
```

### 目录结构

```
labubu/
├── api-service/                 # 📧 API 服务 (部署到 Vercel)
│   ├── api/
│   │   ├── admin/              # 后台管理 API
│   │   │   ├── login.js        # 管理员登录
│   │   │   ├── config.js       # 配置管理
│   │   │   └── themes.js       # 主题列表
│   │   ├── contact.js          # 联系表单 API
│   │   └── subscribe.js        # 订阅表单 API
│   ├── package.json
│   └── vercel.json
│
├── app/                         # 🌐 Next.js 页面
│   ├── admin/                  # 🔐 后台管理页面
│   │   ├── page.js             # 登录页
│   │   ├── layout.js           # 后台布局
│   │   └── dashboard/          # 仪表盘
│   ├── [locale]/               # 多语言路由
│   ├── about/
│   ├── contact/
│   ├── products/
│   ├── layout.js               # 根布局
│   ├── page.js                 # 首页
│   └── globals.css
│
├── components/
│   ├── ui/                     # 通用 UI 组件 (shadcn/ui)
│   └── themes/                 # 🎨 主题组件
│       └── labubu/             # labubu 主题
│           ├── navbar.js
│           ├── hero.js
│           ├── footer.js
│           ├── contact-form.js
│           ├── subscribe-form.js
│           └── ...
│
├── config/
│   └── theme.js                # 主题配置
│
├── data/                        # 📝 页面数据
│   ├── home.js
│   ├── about.js
│   ├── contact.js
│   ├── products.js
│   └── ...
│
├── lib/                         # 工具函数
│   ├── i18n.js                 # 国际化
│   ├── language-context.js     # 语言上下文
│   └── utils.js
│
├── locales/                     # 🌍 多语言翻译
│   ├── en.js
│   ├── es.js
│   ├── fr.js
│   ├── de.js
│   ├── ja.js
│   └── ko.js
│
├── public/
│   ├── themes/                 # 🖼️ 主题静态资源
│   │   └── labubu/
│   │       ├── logo1.webp
│   │       ├── home/
│   │       ├── about/
│   │       └── contact/
│   ├── product/                # 产品图片 (共用)
│   ├── robots.txt
│   └── sitemap.xml
│
├── scripts/
│   └── generate-sitemap.mjs    # Sitemap 生成脚本
│
├── next.config.mjs             # Next.js 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── package.json
```

---

## ⚙️ 环境要求

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| Node.js | 18.x | 20.x |
| npm | 9.x | 10.x |
| Next.js | 15.x | 15.1.x |

---

## 💻 本地开发

### 1. 克隆项目

```bash
git clone https://github.com/Reluct007/Labubu.git
cd labubu
```

### 2. 安装依赖

```bash
npm install --legacy-peer-deps
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
# API 服务地址 (本地开发可留空，使用默认值)
NEXT_PUBLIC_API_URL=https://your-api.vercel.app
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 5. 构建项目

```bash
npm run build
```

构建输出目录：`out/`

---

## 🚀 部署指南

### 前端部署 (Cloudflare Pages)

#### 步骤 1：连接 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → Create → Pages
3. 连接 GitHub 并选择仓库 `Reluct007/Labubu`

#### 步骤 2：配置构建设置

| 配置项 | 值 |
|-------|-----|
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `out` |
| 根目录 | `/` (留空) |

#### 步骤 3：配置环境变量

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://your-api.vercel.app` | Vercel API 服务地址 |
| `NODE_VERSION` | `20` | Node.js 版本 |
| `NPM_FLAGS` | `--legacy-peer-deps` | npm 安装参数 |

#### 步骤 4：部署

点击 "Save and Deploy"，等待构建完成。

---

### API 服务部署 (Vercel)

#### 步骤 1：导入项目

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New" → "Project"
3. 导入同一个 GitHub 仓库

#### 步骤 2：配置项目

| 配置项 | 值 |
|-------|-----|
| Root Directory | `api-service` |
| Framework Preset | Other |

#### 步骤 3：配置环境变量

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `RESEND_API_KEY` | `re_xxxxxxxx` | Resend API 密钥 |
| `CONTACT_EMAIL` | `your@email.com` | 接收表单邮件的邮箱 |
| `FROM_EMAIL` | `noreply@yourdomain.com` | 发件人邮箱 (需在 Resend 验证域名) |
| `ADMIN_USERNAME` | `admin` | 后台管理员用户名 |
| `ADMIN_PASSWORD` | `your-password` | 后台管理员密码 |
| `JWT_SECRET` | `random-secret-key` | JWT 签名密钥 |

#### 步骤 4：启用 Vercel KV

1. 进入 Vercel 项目 → Storage
2. 点击 "Create Database" → 选择 "KV"
3. 创建后自动添加环境变量

#### 步骤 5：部署

点击 "Deploy"，等待部署完成。

---

## 🔐 后台管理

### 访问后台

访问 `https://your-site.com/admin` 进入后台登录页面。

### 功能说明

后台管理支持以下功能：

1. **主题切换** - 选择当前激活的主题
2. **邮件设置** - 配置接收邮箱、发件邮箱、发件人名称
3. **网站设置** - 配置网站名称、描述

### 配置优先级

邮件配置的优先级：
1. 后台设置的值（存储在 Vercel KV）
2. Vercel 环境变量
3. 代码中的默认值

### 注意事项

- 主题切换后需要重新构建前端才能生效
- 邮件设置修改后立即生效，无需重新部署
- 发件邮箱的域名必须在 Resend 中验证

---

## 🎨 主题开发

### 主题结构

每个主题包含两部分：

```
components/themes/{theme-name}/    # 组件
public/themes/{theme-name}/        # 静态资源
```

### 创建新主题

#### 步骤 1：创建主题组件目录

```bash
mkdir -p components/themes/my-theme
```

#### 步骤 2：复制基础组件

从现有主题复制并修改：

```bash
cp -r components/themes/labubu/* components/themes/my-theme/
```

#### 步骤 3：创建主题资源目录

```bash
mkdir -p public/themes/my-theme/{home,about,contact}
```

添加主题图片：
- `public/themes/my-theme/logo1.webp` - Logo
- `public/themes/my-theme/home/` - 首页图片
- `public/themes/my-theme/about/` - 关于页图片
- `public/themes/my-theme/contact/` - 联系页图片

#### 步骤 4：注册主题

编辑 `config/theme.js`：

```javascript
export const themeConfig = {
  activeTheme: 'my-theme',  // 切换到新主题
  
  themes: {
    labubu: {
      name: 'Labubu Wholesale',
      description: 'Labubu 批发主题',
      assetsPath: '/themes/labubu',
    },
    'my-theme': {
      name: 'My Theme',
      description: '我的自定义主题',
      assetsPath: '/themes/my-theme',
    },
  },
};
```

#### 步骤 5：更新组件导入

修改 `app/layout.js` 中的组件导入路径：

```javascript
// 修改前
import Navbar from "@/components/themes/labubu/navbar";
import Footer from "@/components/themes/labubu/footer";

// 修改后
import Navbar from "@/components/themes/my-theme/navbar";
import Footer from "@/components/themes/my-theme/footer";
```

### 主题组件清单

| 组件 | 文件 | 说明 |
|-----|------|------|
| 导航栏 | `navbar.js` | 顶部导航 |
| Hero | `hero.js` | 首页大图区域 |
| 页脚 | `footer.js` | 底部页脚 |
| CTA | `cta.js` | 行动号召区域 |
| FAQ | `faq.js` | 常见问题 |
| 联系表单 | `contact-form.js` | 联系/询价表单 |
| 订阅表单 | `subscribe-form.js` | 邮件订阅表单 |
| 三列布局 | `three-column.js` | 三列卡片 |
| 四列布局 | `four-column.js` | 四列卡片 |
| 两列布局 | `two-column.js` | 图文两列 |
| 评价 | `testimonials.js` | 客户评价 |
| 语言切换 | `language-switcher.js` | 多语言切换器 |
| 返回顶部 | `scroll-to-top.js` | 返回顶部按钮 |

---

## 📧 邮件服务配置

### Resend 配置

1. 注册 [Resend](https://resend.com/) 账号
2. 创建 API Key：Settings → API Keys → Create API Key
3. 添加发件域名：Domains → Add Domain
4. 按提示添加 DNS 记录并验证

### 修改接收邮箱

在 Vercel 环境变量中修改 `CONTACT_EMAIL`：

```
CONTACT_EMAIL=newemail@example.com
```

修改后需要重新部署。

### 修改发件邮箱

1. 确保域名已在 Resend 验证
2. 在 Vercel 环境变量中修改 `FROM_EMAIL`：

```
FROM_EMAIL=noreply@yourdomain.com
```

---

## 🔐 环境变量说明

### Cloudflare Pages (前端)

| 变量名 | 必填 | 说明 |
|-------|------|------|
| `NEXT_PUBLIC_API_URL` | ✅ | Vercel API 服务地址 |
| `NODE_VERSION` | ✅ | Node.js 版本，建议 `20` |
| `NPM_FLAGS` | ✅ | 设置为 `--legacy-peer-deps` |

### Vercel (API 服务)

| 变量名 | 必填 | 说明 |
|-------|------|------|
| `RESEND_API_KEY` | ✅ | Resend API 密钥 |
| `CONTACT_EMAIL` | ✅ | 接收表单邮件的邮箱 |
| `FROM_EMAIL` | ✅ | 发件人邮箱 (需验证域名) |

---

## 📝 修改内容指南

| 修改内容 | 文件位置 |
|---------|---------|
| 首页内容 | `data/home.js` |
| 关于页内容 | `data/about.js` |
| 联系页内容 | `data/contact.js` |
| 产品数据 | `data/products.js` |
| 多语言翻译 | `locales/*.js` |
| SEO 元数据 | `app/layout.js`, 各页面 `metadata` |
| 主题组件 | `components/themes/{theme}/` |
| 主题图片 | `public/themes/{theme}/` |

---

## 🔧 常见问题

### Q: 构建失败，提示依赖冲突？

确保使用 `--legacy-peer-deps` 参数：

```bash
npm install --legacy-peer-deps
```

### Q: 表单提交成功但收不到邮件？

1. 检查 Vercel 环境变量是否正确配置
2. 确认 `FROM_EMAIL` 域名已在 Resend 验证
3. 查看 Vercel Function Logs 排查错误

### Q: 如何切换主题？

修改 `config/theme.js` 中的 `activeTheme`，并更新 `app/layout.js` 中的组件导入路径。

### Q: 如何添加新语言？

1. 在 `locales/` 目录创建新语言文件，如 `zh.js`
2. 在 `lib/i18n.js` 中注册新语言
3. 在 `app/[locale]/` 下添加对应路由

---

## 📄 License

MIT License
