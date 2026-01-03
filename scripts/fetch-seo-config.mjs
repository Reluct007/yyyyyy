/**
 * 构建时从 API 获取 SEO 配置
 * 在 npm run build 之前执行
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSeoConfig() {
  if (!API_URL) {
    console.log('⏭️  NEXT_PUBLIC_API_URL not set, using default SEO config');
    return;
  }

  try {
    console.log('📡 Fetching SEO config from API...');
    const res = await fetch(`${API_URL}/api/admin/config`);
    const data = await res.json();

    if (!data.success) {
      console.log('⚠️  Failed to fetch config, using defaults');
      return;
    }

    const { seoTitle, seoDescription, seoKeywords, siteName } = data.config;

    // 如果有 SEO 配置，更新 layout.js 中的 metadata
    if (seoTitle || seoDescription || seoKeywords) {
      console.log('🔧 Updating SEO metadata...');
      
      const layoutPath = join(rootDir, 'app/layout.js');
      let layoutContent = readFileSync(layoutPath, 'utf-8');

      // 更新 title
      if (seoTitle) {
        layoutContent = layoutContent.replace(
          /title:\s*\{[\s\S]*?default:\s*["'][^"']*["']/,
          `title: {\n    default: "${seoTitle}"`
        );
        console.log(`  ✅ Title: ${seoTitle}`);
      }

      // 更新 description
      if (seoDescription) {
        layoutContent = layoutContent.replace(
          /description:\s*["'][^"']*["'],/,
          `description: "${seoDescription}",`
        );
        console.log(`  ✅ Description: ${seoDescription.substring(0, 50)}...`);
      }

      // 更新 keywords
      if (seoKeywords) {
        const keywordsArray = seoKeywords.split(',').map(k => k.trim());
        layoutContent = layoutContent.replace(
          /keywords:\s*\[[^\]]*\]/,
          `keywords: ${JSON.stringify(keywordsArray)}`
        );
        console.log(`  ✅ Keywords: ${seoKeywords}`);
      }

      writeFileSync(layoutPath, layoutContent);
      console.log('✨ SEO config updated!');
    } else {
      console.log('ℹ️  No custom SEO config found, using defaults');
    }

  } catch (error) {
    console.log('⚠️  Error fetching SEO config:', error.message);
  }
}

fetchSeoConfig();
