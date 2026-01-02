/**
 * 主题 B 特有的配置
 * 只包含主题相关的设置（品牌、logo、hero背景等），不包含业务数据
 * 业务数据（产品、FAQ内容等）从 @/data/home 共享
 */

// 主题 B 的品牌配置
export const themeBrand = {
  name: "B For Anything",
  logo: "/themes/b/logo1.webp",
};

// 主题 B 的导航按钮配置
export const themeNavButton = {
  text: "Free Quote",
  title: "Request a Free Quote",
  description: "Please provide any additional details or specific requirements..."
};

// 主题 B 的 Hero 区域配置
export const themeHero = {
  bg_image: "/themes/b/home/Cover-image.webp",
  button: [
    { title: "Explore Products", variant: "default", href: "/products" },
    { title: "Contact Us", variant: "outline", href: "/contact" }
  ],
  feature: [
    { title: "Premium Quality", description: "ISO certified manufacturing" },
    { title: "Custom Engineering", description: "Tailored to your specifications" },
    { title: "Fast Turnaround", description: "Efficient production timelines" },
    { title: "24/7 Support", description: "Always here to help" }
  ]
};

// 主题 B 的 CTA 配置
export const themeCta = {
  cards: [
    { title: "Contact Us", href: "/contact", icon: "File", description: "Get in touch with our team." },
    { title: "About Us", href: "/about", icon: "Book", description: "Learn more about our company." }
  ]
};

// 主题 B 的 Footer 配置
export const themeFooter = {
  brand: "© 2025 B For Anything | All rights reserved.",
  policies: [
    { title: "Terms of Service", href: "/terms-and-conditions" },
    { title: "Privacy Policy", href: "/privacy-policy" }
  ]
};

// 主题 B 的导航菜单
export const themeNavMenu = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
