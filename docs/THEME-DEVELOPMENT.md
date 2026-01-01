# 主题开发指南

本文档详细说明如何创建和配置新主题。

---

## 📁 主题结构

每个主题由两部分组成：

```
components/themes/{theme-name}/    # React 组件
public/themes/{theme-name}/        # 静态资源（图片、图标等）
```

### 组件目录结构

```
components/themes/{theme-name}/
├── navbar.js              # 导航栏
├── hero.js                # 首页 Hero 区域
├── footer.js              # 页脚
├── cta.js                 # 行动号召区域
├── faq.js                 # 常见问题
├── contact.js             # 联系页面布局
├── contact-form.js        # 联系/询价表单
├── subscribe-form.js      # 邮件订阅表单
├── three-column.js        # 三列卡片布局
├── four-column.js         # 四列卡片布局
├── two-column.js          # 图文两列布局
├── testimonials.js        # 客户评价
├── language-switcher.js   # 语言切换器
├── scroll-to-top.js       # 返回顶部按钮
├── header.js              # 页面标题头部
└── policy.js              # 政策页面布局
```

### 静态资源目录结构

```
public/themes/{theme-name}/
├── logo1.webp             # Logo 图片
├── home/                  # 首页图片
│   ├── Cover-image.webp   # Hero 背景图
│   ├── 1.webp
│   ├── 2.webp
│   └── ...
├── about/                 # 关于页图片
│   ├── 1.webp
│   └── ...
└── contact/               # 联系页图片
    └── ...
```

---

## 🚀 创建新主题

### 步骤 1：创建目录结构

```bash
# 创建组件目录
mkdir -p components/themes/my-theme

# 创建资源目录
mkdir -p public/themes/my-theme/{home,about,contact}
```

### 步骤 2：复制基础组件

从现有主题复制所有组件：

```bash
cp components/themes/labubu/*.js components/themes/my-theme/
```

### 步骤 3：添加主题资源

将图片放入对应目录：

```
public/themes/my-theme/
├── logo1.webp              # 必需：Logo
├── home/
│   ├── Cover-image.webp    # 必需：Hero 背景
│   ├── 1.webp              # 分类图片
│   ├── 2.webp
│   ├── 3.webp
│   ├── c.webp
│   ├── image.webp
│   ├── Labels.webp
│   ├── Customization.webp
│   └── Packaging.webp
├── about/
│   └── 3.webp              # 关于页图片
└── contact/
    └── (可选图片)
```

> 💡 建议使用 WebP 格式，文件更小加载更快

### 步骤 4：注册主题

编辑 `config/theme.js`：

```javascript
export const themeConfig = {
  // 切换到新主题
  activeTheme: 'my-theme',
  
  themes: {
    labubu: {
      name: 'Labubu Wholesale',
      description: 'Labubu 批发主题',
      assetsPath: '/themes/labubu',
    },
    // 添加新主题
    'my-theme': {
      name: 'My Custom Theme',
      description: '我的自定义主题',
      assetsPath: '/themes/my-theme',
    },
  },
};
```

### 步骤 5：更新组件导入

修改 `app/layout.js`：

```javascript
// 修改导入路径
import Navbar from "@/components/themes/my-theme/navbar";
import CTA from "@/components/themes/my-theme/cta";
import Footer from "@/components/themes/my-theme/footer";
import ScrollToTop from "@/components/themes/my-theme/scroll-to-top";
```

修改 `app/page.js`：

```javascript
import Hero from "@/components/themes/my-theme/hero";
import ThreeColumn from "@/components/themes/my-theme/three-column";
import TwoColumn from "@/components/themes/my-theme/two-column";
import FourColumn from "@/components/themes/my-theme/four-column";
import Testimonials from "@/components/themes/my-theme/testimonials";
import FAQ from "@/components/themes/my-theme/faq";
```

同样更新其他页面的组件导入。

---

## 🎨 自定义组件

### 修改导航栏 (navbar.js)

```javascript
// 修改 Logo
<img
  alt="My Theme logo"
  src="/themes/my-theme/logo1.webp"
  className="w-8"
/>
<span className="text-xl font-bold">My Theme</span>

// 修改导航链接
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products/", label: "Products" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
```

### 修改 Hero 区域 (hero.js)

```javascript
// 修改背景图
<img
  src="/themes/my-theme/home/Cover-image.webp"
  alt="Hero background"
/>

// 修改标题和描述
<h1>Welcome to My Theme</h1>
<p>Your custom description here...</p>
```

### 修改页脚 (footer.js)

```javascript
// 修改公司信息
const companyName = "My Company";
const companyEmail = "info@mycompany.com";

// 修改链接
const footerLinks = {
  products: [...],
  company: [...],
  legal: [...],
};
```

### 修改联系表单 (contact-form.js)

表单字段和验证逻辑在 `contact-form.js` 中定义。

```javascript
// 修改表单字段
const [data, setData] = useState({
  name: "",
  email: "",
  company: "",
  phone: "",
  quantity: "",
  message: ""
});

// 修改 API 地址（通常不需要修改，使用环境变量）
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api.vercel.app';
```

---

## 🌍 多语言支持

### 组件内翻译

在组件中使用翻译对象：

```javascript
const translations = {
  title: {
    en: "Welcome",
    es: "Bienvenido",
    fr: "Bienvenue",
    de: "Willkommen",
    ja: "ようこそ",
    ko: "환영합니다"
  }
};

// 使用
const t = (key) => translations[key]?.[locale] || translations[key]?.en;

return <h1>{t('title')}</h1>;
```

### 使用语言上下文

```javascript
import { useLanguage } from "@/lib/language-context";

export default function MyComponent() {
  const { locale, translations } = useLanguage();
  
  return <h1>{translations.welcome}</h1>;
}
```

---

## 📝 数据配置

### 页面数据文件

| 文件 | 用途 |
|-----|------|
| `data/home.js` | 首页内容 |
| `data/about.js` | 关于页内容 |
| `data/contact.js` | 联系页内容 |
| `data/products.js` | 产品列表 |
| `data/privacy.js` | 隐私政策 |
| `data/terms.js` | 服务条款 |

### 修改首页数据 (data/home.js)

```javascript
export const home = {
  hero: {
    badge: "Premium Products",
    title: "Welcome to My Store",
    description: "Your store description...",
    image: "/themes/my-theme/home/Cover-image.webp",
  },
  categories: {
    title: "Our Categories",
    subtitle: "Browse our collection",
    items: [
      {
        title: "Category 1",
        description: "Description...",
        image: "/themes/my-theme/home/1.webp",
        badge: "New",
      },
      // ...
    ],
  },
  // ...
};
```

---

## 🎯 最佳实践

### 1. 保持组件结构一致

新主题应保持与现有主题相同的组件接口，确保数据兼容。

### 2. 使用 Tailwind CSS

所有样式使用 Tailwind CSS 类名，保持一致性：

```javascript
<div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold text-foreground">
    Title
  </h1>
</div>
```

### 3. 响应式设计

确保所有组件支持响应式：

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

### 4. 图片优化

- 使用 WebP 格式
- 提供合适的尺寸
- 添加 `loading="lazy"` 属性
- 使用 Next.js Image 组件（静态导出时使用 `unoptimized`）

```javascript
<img
  src="/themes/my-theme/image.webp"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
/>
```

### 5. 无障碍访问

- 为图片添加 `alt` 属性
- 使用语义化 HTML 标签
- 确保颜色对比度足够
- 支持键盘导航

---

## 🔄 切换主题

### 方法 1：修改配置文件

编辑 `config/theme.js`：

```javascript
activeTheme: 'my-theme',  // 改为目标主题名
```

### 方法 2：环境变量（高级）

可以通过环境变量动态切换主题：

```javascript
// config/theme.js
export const themeConfig = {
  activeTheme: process.env.NEXT_PUBLIC_THEME || 'labubu',
  // ...
};
```

然后在部署时设置环境变量：

```
NEXT_PUBLIC_THEME=my-theme
```

---

## 📋 主题检查清单

创建新主题时，确保完成以下项目：

### 组件

- [ ] navbar.js - 导航栏
- [ ] hero.js - Hero 区域
- [ ] footer.js - 页脚
- [ ] cta.js - CTA 区域
- [ ] contact-form.js - 联系表单
- [ ] subscribe-form.js - 订阅表单
- [ ] three-column.js - 三列布局
- [ ] four-column.js - 四列布局
- [ ] two-column.js - 两列布局
- [ ] faq.js - FAQ
- [ ] testimonials.js - 评价

### 资源

- [ ] logo1.webp - Logo
- [ ] home/Cover-image.webp - Hero 背景
- [ ] home/ 目录下的其他图片
- [ ] about/ 目录下的图片

### 配置

- [ ] config/theme.js 中注册主题
- [ ] app/layout.js 更新导入
- [ ] app/page.js 更新导入
- [ ] 其他页面更新导入

### 测试

- [ ] 首页显示正常
- [ ] 导航链接正常
- [ ] 响应式布局正常
- [ ] 表单提交正常
- [ ] 多语言切换正常
