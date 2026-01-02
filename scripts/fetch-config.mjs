/**
 * 从 API 获取配置并更新 config/theme.js
 * 在构建前执行
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    // 读取当前 theme.js
    const themeConfigPath = join(rootDir, 'config/theme.js');
    let themeConfig = readFileSync(themeConfigPath, 'utf-8');

    // 更新 activeTheme
    themeConfig = themeConfig.replace(
      /activeTheme:\s*['"][^'"]+['"]/,
      `activeTheme: '${activeTheme}'`
    );

    writeFileSync(themeConfigPath, themeConfig);
    console.log('✅ Config updated');

  } catch (error) {
    console.log('⚠️  Error fetching config:', error.message);
  }
}

fetchConfig();
