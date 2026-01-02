/**
 * 复制主题静态资源到 public 目录
 * 
 * 从 components/themes/{theme}/assets/ 复制到 public/themes/{theme}/
 * 在 npm run build 之前自动执行
 */

import { existsSync, mkdirSync, cpSync, readdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const themesDir = join(rootDir, 'components/themes');
const publicThemesDir = join(rootDir, 'public/themes');

// 获取所有主题
const themes = readdirSync(themesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('🎨 Copying theme assets...');

for (const theme of themes) {
  const assetsDir = join(themesDir, theme, 'assets');
  const targetDir = join(publicThemesDir, theme);

  if (existsSync(assetsDir)) {
    // 清理目标目录
    if (existsSync(targetDir)) {
      rmSync(targetDir, { recursive: true });
    }
    
    // 创建目标目录并复制
    mkdirSync(targetDir, { recursive: true });
    cpSync(assetsDir, targetDir, { recursive: true });
    
    console.log(`  ✅ ${theme}: assets copied`);
  } else {
    console.log(`  ⏭️  ${theme}: no assets folder`);
  }
}

console.log('✨ Done!');
