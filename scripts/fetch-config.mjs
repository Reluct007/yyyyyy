/**
 * 从 API 获取配置并更新主题相关文件
 * 在构建前执行
 */

import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 需要更新主题导入的文件
const filesToUpdate = [
  'app/layout.js',
  'app/page.js',
  'app/about/page.js',
  'app/contact/page.js',
  'app/products/page.js',
  'app/products/[slug]/page.js',
  'app/product/page.js',
  'app/product/[slug]/page.js',
  'app/privacy-policy/page.js',
  'app/terms-and-conditions/page.js',
];

// 递归查找所有 page.js 文件
function findPageFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'admin') {
      findPageFiles(fullPath, files);
    } else if (item === 'page.js' || item === 'layout.js') {
      files.push(fullPath);
    }
  }
  return files;
}

async function fetchConfig() {
  if (!API_URL) {
    console.log('⏭️  NEXT_PUBLIC_API_URL not set, skipping config fetch');
    return;
  }

  try {
    console.log('📡 Fetching config from API...');
    const res = await fetch(`${API_URL}/api/admin/config`);
    const data = await res.json();

    if (!data.success) {
      console.log('⚠️  Failed to fetch config, using defaults');
      return;
    }

    const { activeTheme } = data.config;
    console.log(`🎨 Active theme: ${activeTheme}`);

    // 更新 config/theme.js
    const themeConfigPath = join(rootDir, 'config/theme.js');
    let themeConfig = readFileSync(themeConfigPath, 'utf-8');
    themeConfig = themeConfig.replace(
      /activeTheme:\s*['"][^'"]+['"]/,
      `activeTheme: '${activeTheme}'`
    );
    writeFileSync(themeConfigPath, themeConfig);
    console.log('✅ config/theme.js updated');

    // 查找所有需要更新的文件
    const appDir = join(rootDir, 'app');
    const pageFiles = findPageFiles(appDir);
    
    let updatedCount = 0;
    for (const filePath of pageFiles) {
      let content = readFileSync(filePath, 'utf-8');
      
      // 替换主题导入路径
      const oldPattern = /@\/components\/themes\/[^\/]+\//g;
      const newPath = `@/components/themes/${activeTheme}/`;
      
      if (content.match(oldPattern)) {
        const newContent = content.replace(oldPattern, newPath);
        if (newContent !== content) {
          writeFileSync(filePath, newContent);
          const relativePath = filePath.replace(rootDir + '/', '');
          console.log(`  ✅ ${relativePath}`);
          updatedCount++;
        }
      }
    }

    console.log(`✨ Updated ${updatedCount} files`);

  } catch (error) {
    console.log('⚠️  Error fetching config:', error.message);
  }
}

fetchConfig();
