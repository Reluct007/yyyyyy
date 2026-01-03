/**
 * 复制静态资源到 public 目录
 * 在 npm run build 之前自动执行
 */

import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const assetsDir = join(rootDir, 'components/features/assets');
const targetDir = join(rootDir, 'public/themes/labubu');

console.log('🎨 Copying assets...');

if (existsSync(assetsDir)) {
  // 清理目标目录
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true });
  }
  
  // 创建目标目录并复制
  mkdirSync(targetDir, { recursive: true });
  cpSync(assetsDir, targetDir, { recursive: true });
  
  console.log('  ✅ Assets copied to public/themes/labubu');
} else {
  console.log('  ⏭️  No assets folder found');
}

console.log('✨ Done!');
