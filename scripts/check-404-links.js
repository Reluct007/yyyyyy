#!/usr/bin/env node

/**
 * 404死链检测脚本
 * 检测网站中的死链和404错误
 */

const fs = require('fs');
const path = require('path');
const { product } = require('../data/product.js');
const { products } = require('../data/products.js');
const slugify = require('slugify');

console.log('🔍 开始检测404死链...\n');

const ROOT_URL = 'https://www.labubuwholesale.com';
const issues = {
  invalidProductSlugs: [],
  invalidProductImages: [],
  missingPages: [],
  invalidLinks: [],
};

// 1. 检测无效的产品slug
console.log('1️⃣ 检测无效的产品slug...');
const validProductSlugs = new Set();
const invalidProductSlugs = [];

product.forEach((p) => {
  const slug = slugify(p.title, { lower: true, strict: true });
  const img = p.image;
  
  const isInvalidImage = img && (
    img.match(/\.(SS40|_SX38|\.SX38)/) ||
    img.match(/\/product\/[0-9]{1,3}$/) ||
    img.match(/\/product\/[A-Z0-9]{5,}[._-][A-Z0-9]/) ||
    img.match(/\/product\/[0-9]{2,3}[-_]/) ||
    !img.startsWith('/product/')
  );
  
  const hasValidTitle = p.title && 
                       p.title.length > 3 && 
                       !(/^\d+$/.test(p.title));
  
  if (!isInvalidImage && hasValidTitle && slug && slug.length > 2) {
    validProductSlugs.add(slug);
  } else {
    invalidProductSlugs.push({
      title: p.title?.substring(0, 60) || 'N/A',
      slug: slug || 'N/A',
      image: img || 'N/A',
      reason: !hasValidTitle ? 'Invalid title' : 
              isInvalidImage ? 'Invalid image' : 
              !slug || slug.length <= 2 ? 'Invalid slug' : 'Unknown'
    });
  }
});

issues.invalidProductSlugs = invalidProductSlugs;
console.log(`   ✅ 有效产品slug: ${validProductSlugs.size}`);
console.log(`   ❌ 无效产品slug: ${invalidProductSlugs.length}`);

// 2. 检测无效的产品图片路径
console.log('\n2️⃣ 检测无效的产品图片路径...');
const invalidImages = [];
product.forEach((p) => {
  if (!p.image) return;
  
  const img = p.image;
  const isInvalid = (
    img.match(/\.(SS40|_SX38|\.SX38)/) ||
    img.match(/\/product\/[0-9]{1,3}$/) ||
    img.match(/\/product\/[A-Z0-9]{5,}[._-][A-Z0-9]/) ||
    img.match(/\/product\/[0-9]{2,3}[-_]/) ||
    !img.startsWith('/product/')
  );
  
  if (isInvalid) {
    invalidImages.push({
      title: p.title?.substring(0, 60) || 'N/A',
      image: img,
      slug: slugify(p.title, { lower: true, strict: true })
    });
  }
});

issues.invalidProductImages = invalidImages;
console.log(`   ❌ 无效图片路径: ${invalidImages.length}`);

// 3. 检测缺失的页面
console.log('\n3️⃣ 检测缺失的页面...');
const missingPages = [];

// 检查产品分类页面
const validCategorySlugs = new Set(
  products.products.map(p => slugify(p.title, { lower: true, strict: true }))
);

// 检查已知的无效分类
const knownInvalidCategories = [
  'blind-boxes',
  'plush-toys',
  'bags',
  'poupees',
  'munecas',
  'puppen',
  'jouets-danimaux',
  'juguetes-de-animales',
  'tier-spielzeug'
];

knownInvalidCategories.forEach(cat => {
  if (!validCategorySlugs.has(cat)) {
    missingPages.push({
      path: `/products/${cat}`,
      type: 'Invalid category',
      status: 'Should redirect'
    });
  }
});

// 检查博客页面（应该不存在）
missingPages.push({
  path: '/blog',
  type: 'Blog page',
  status: 'Should redirect to /'
});

missingPages.push({
  path: '/terms-and-conditions',
  type: 'Terms page',
  status: 'Should redirect to /terms-conditions'
});

issues.missingPages = missingPages;
console.log(`   ⚠️  需要处理的页面: ${missingPages.length}`);

// 4. 检测sitemap中的潜在问题
console.log('\n4️⃣ 检测sitemap潜在问题...');
const sitemapPath = path.join(__dirname, '../app/sitemap.xml/route.js');
if (fs.existsSync(sitemapPath)) {
  console.log('   ✅ Sitemap文件存在');
} else {
  console.log('   ⚠️  Sitemap文件不存在');
}

// 5. 生成报告
console.log('\n📊 检测报告');
console.log('═══════════════════════════════════════\n');

if (invalidProductSlugs.length > 0) {
  console.log(`❌ 无效产品slug (前10个):`);
  invalidProductSlugs.slice(0, 10).forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title}`);
    console.log(`      Slug: ${item.slug}`);
    console.log(`      原因: ${item.reason}`);
  });
  if (invalidProductSlugs.length > 10) {
    console.log(`   ... 还有 ${invalidProductSlugs.length - 10} 个`);
  }
  console.log('');
}

if (invalidImages.length > 0) {
  console.log(`❌ 无效图片路径 (前10个):`);
  invalidImages.slice(0, 10).forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title}`);
    console.log(`      图片: ${item.image}`);
  });
  if (invalidImages.length > 10) {
    console.log(`   ... 还有 ${invalidImages.length - 10} 个`);
  }
  console.log('');
}

if (missingPages.length > 0) {
  console.log(`⚠️  需要处理的页面:`);
  missingPages.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.path} (${item.type}) - ${item.status}`);
  });
  console.log('');
}

// 6. 生成修复建议
console.log('💡 修复建议:');
console.log('═══════════════════════════════════════\n');
console.log('1. 无效产品slug:');
console.log('   - 这些产品应该被过滤，不会生成页面');
console.log('   - 如果访问这些URL，应该重定向到 /products');
console.log('   - 检查 middleware.js 和 next.config.mjs 中的重定向规则\n');

console.log('2. 无效图片路径:');
console.log('   - 这些图片路径会导致404错误');
console.log('   - 建议清理 product.js 数据文件');
console.log('   - 或使用 clean_products.py 脚本清理\n');

console.log('3. 缺失页面:');
console.log('   - 确保 middleware.js 中有正确的重定向规则');
console.log('   - 确保 next.config.mjs 中有301重定向\n');

// 7. 统计信息
console.log('\n📈 统计信息:');
console.log('═══════════════════════════════════════');
console.log(`总产品数: ${product.length}`);
console.log(`有效产品slug: ${validProductSlugs.size}`);
console.log(`无效产品slug: ${invalidProductSlugs.length}`);
console.log(`无效图片路径: ${invalidImages.length}`);
console.log(`需要处理的页面: ${missingPages.length}`);

// 保存报告到文件
const reportPath = path.join(__dirname, '../404-detection-report.json');
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
console.log(`\n✅ 详细报告已保存到: ${reportPath}`);

console.log('\n✨ 检测完成！\n');
