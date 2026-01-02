# 主题开发指南

本文档详细说明如何创建和配置新主题。

---

## 📁 主题结构

每个主题的所有文件（代码 + 静态资源）都放在同一个目录：

```
components/themes/{theme-name}/
├── navbar.js              # 导航栏组件
├── hero.js                # Hero 组件
├── footer.js              # 页脚组件
├── contact-form.js        # 联系表单
├── subscribe-form.js      # 订阅表单
├── ...                    # 其他组件
└── assets/                # 静态资源（图片、图标等）
    ├── logo1.webp
    ├── home/
    │   ├── hero.webp
    │   └── ...
    └── about/
        └── ...
```

构建时，`assets/` 目录会自动复制到 `public/themes/{theme-name}/`。

组件中引用图片使用 `/themes/{theme-name}/` 路径：

```javascript
// 在 components/themes/my-theme/hero.js 中
<img src="/themes/my-theme/home/hero.webp" alt="Hero" />
```

---

## 🚀 创建新主题

### 步骤 1：创建主题目录

```bash
mkdir -p components/themes/my-theme/assets
```

### 步骤 2：复制基础组件

```bash
# 复制现有主题的组件
cp components/themes/labubu/*.js components/themes/my-theme/
```

### 步骤 3：添加静态资源

将图片放入 `assets/` 目录：

```
components/themes/my-theme/assets/
├── logo1.webp              # Logo
├── home/
│   ├── Cover-image.webp    # Hero 背景
│   ├── 1.webp              # 分类图片
│   └── ...
└── about/
    └── ...
```

### 步骤 4：注册主题

编辑 `config/theme.js`：

```javascript
export const themeConfig = {
  activeTheme: 'my-theme',
  
  themes: {
    labubu: {
      name: 'Labubu Wholesale',
      description: 'Labubu 批发主题',
      assetsPath: '/themes/labubu',
    },
    'my-theme': {
      name: 'My Theme',
      description: '我的主题',
      assetsPath: '/themes/my-theme',
    },
  },
};
```

### 步骤 5：更新组件导入

修改 `app/layout.js` 和其他页面文件中的组件导入路径。

---

## 🎨 组件列表

| 组件 | 文件 | 用途 |
|-----|------|------|
| 导航栏 | navbar.js | 顶部导航 |
| Hero | hero.js | 首页大图区域 |
| 页脚 | footer.js | 底部信息 |
| CTA | cta.js | 行动号召 |
| FAQ | faq.js | 常见问题 |
| 联系表单 | contact-form.js | 询价表单 |
| 订阅表单 | subscribe-form.js | 邮件订阅 |
| 三列布局 | three-column.js | 卡片展示 |
| 四列布局 | four-column.js | 卡片展示 |
| 两列布局 | two-column.js | 图文展示 |
| 评价 | testimonials.js | 客户评价 |
| 返回顶部 | scroll-to-top.js | 滚动按钮 |

---

## 📝 静态资源规范

### 推荐格式

- 图片：WebP（更小的文件体积）
- Logo：WebP 或 SVG

### 目录结构

```
assets/
├── logo1.webp           # 必需
├── home/
│   ├── Cover-image.webp # 必需：Hero 背景
│   └── ...
├── about/
│   └── ...
└── contact/
    └── ...
```

### 引用方式

```javascript
// 组件中引用
<img src="/themes/my-theme/logo1.webp" alt="Logo" />
<img src="/themes/my-theme/home/Cover-image.webp" alt="Hero" />
```

---

## 🔄 构建流程

1. `npm run build` 执行时，会先运行 `prebuild` 脚本
2. `scripts/copy-theme-assets.mjs` 自动将各主题的 `assets/` 复制到 `public/themes/`
3. Next.js 构建静态网站

> `public/themes/` 已加入 `.gitignore`，不需要提交到 Git。

---

## 📋 检查清单

创建新主题时确保：

### 组件
- [ ] navbar.js
- [ ] hero.js
- [ ] footer.js
- [ ] contact-form.js
- [ ] subscribe-form.js
- [ ] 其他需要的组件

### 资源 (assets/)
- [ ] logo1.webp
- [ ] home/Cover-image.webp
- [ ] 其他页面图片

### 配置
- [ ] config/theme.js 注册主题
- [ ] 页面文件更新组件导入

### 测试
- [ ] 本地运行 `npm run dev` 正常
- [ ] 构建 `npm run build` 成功
- [ ] 图片正常显示
