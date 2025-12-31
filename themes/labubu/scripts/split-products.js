const fs = require('fs');
const path = require('path');
const { product } = require('../data/product.js');

// 创建分片目录
const chunksDir = path.join(__dirname, '../data/product-chunks');
if (!fs.existsSync(chunksDir)) {
  fs.mkdirSync(chunksDir, { recursive: true });
}

// 每个分片的产品数量
const CHUNK_SIZE = 100;

// 计算需要多少个分片
const totalChunks = Math.ceil(product.length / CHUNK_SIZE);

console.log(`总产品数: ${product.length}`);
console.log(`分片大小: ${CHUNK_SIZE}`);
console.log(`总分片数: ${totalChunks}`);
console.log('');

// 拆分产品数据
for (let i = 0; i < totalChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, product.length);
  const chunk = product.slice(start, end);
  
  const chunkFile = path.join(chunksDir, `chunk-${i}.js`);
  const content = `export const products = ${JSON.stringify(chunk, null, 2)};`;
  
  fs.writeFileSync(chunkFile, content, 'utf8');
  console.log(`✓ 创建 chunk-${i}.js (${chunk.length} 产品)`);
}

// 创建索引文件
const indexContent = `// 产品数据分片索引
export const TOTAL_CHUNKS = ${totalChunks};
export const CHUNK_SIZE = ${CHUNK_SIZE};
export const TOTAL_PRODUCTS = ${product.length};

// 动态导入分片
export async function getProductChunk(chunkIndex) {
  const chunk = await import(\`./product-chunks/chunk-\${chunkIndex}.js\`);
  return chunk.products;
}

// 获取所有产品（仅在必要时使用）
export async function getAllProducts() {
  const allProducts = [];
  for (let i = 0; i < TOTAL_CHUNKS; i++) {
    const chunk = await getProductChunk(i);
    allProducts.push(...chunk);
  }
  return allProducts;
}

// 按标题查找产品（优化版）
export async function findProductByTitle(title) {
  for (let i = 0; i < TOTAL_CHUNKS; i++) {
    const chunk = await getProductChunk(i);
    const found = chunk.find(p => p.title === title);
    if (found) return found;
  }
  return null;
}
`;

fs.writeFileSync(path.join(__dirname, '../data/product-index.js'), indexContent, 'utf8');
console.log('');
console.log('✓ 创建 product-index.js');
console.log('');
console.log('完成！产品数据已拆分为', totalChunks, '个分片');
