# Labubu Project

多主题网站项目，支持主题切换。

## 📁 项目结构

```
labubu/
├── api-service/               # �  API 服务 (部署到 Vercel)
│   ├── api/
│   │   ├── contact.js        # 联系表单 API
│   │   └── subscribe.js      # 订阅表单 API
│   ├── package.json
│   └── vercel.json
│
├── app/                       # 🌐 Next.js 页面 (部署到 Cloudflare)
├── components/
│   ├── ui/                   # 通用 UI 组件
│   └── themes/labubu/        # 主题组件
├── config/                    # 配置文件
├── data/                      # 共用数据
├── lib/                       # 工具函数
├── locales/                   # 多语言翻译
├── public/
│   ├── product/              # 产品图片 (共用)
│   └── themes/labubu/        # 主题图片
└── package.json
```

## 🚀 部署架构

```
GitHub 仓库
    │
    ├──→ Cloudflare Pages (前端网站)
    │    Root: ./
    │    Build: npm run build
    │
    └──→ Vercel (API 服务)
         Root: api-service
         自动部署 Serverless Functions
```

## 🔧 部署步骤

### 1. Cloudflare Pages (前端)

1. 连接 GitHub 仓库
2. 设置:
   - Root Directory: `./`
   - Build command: `npm run build`
   - Build output: `.next`
3. 环境变量:
   - `NEXT_PUBLIC_API_URL`: Vercel API 地址

### 2. Vercel (API 服务)

1. 导入同一个 GitHub 仓库
2. 设置:
   - Root Directory: `api-service`
3. 环境变量:
   - `RESEND_API_KEY`: Resend API 密钥
   - `CONTACT_EMAIL`: 接收邮件的邮箱
   - `FROM_EMAIL`: 发件人邮箱

## 💻 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## �  修改内容

- **产品数据**: `data/product.js`
- **页面文案**: `data/home.js`, `data/about.js` 等
- **主题组件**: `components/themes/labubu/`
- **主题图片**: `public/themes/labubu/`

## 🎨 主题系统

主题组件位于 `components/themes/` 目录，切换主题只需修改组件导入路径。
