# Product Import Template - Instructions

## Required Fields (必填字段)
- title: Product title (产品标题)
- category: Product category (产品分类)
- description: Product description (产品描述)
- image: Main product image URL (主图片URL)

## Optional Fields (可选字段)
- images: Gallery images, comma-separated URLs (图片库，多个URL用逗号分隔)
- features: Product features in JSON format (产品特性，JSON格式)

## Image URL Formats (图片URL格式)

### External URLs (外链图片) - Will be auto-uploaded to R2
https://example.com/image.jpg
https://cdn.example.com/products/poker-set.webp

### Local Paths (本地路径) - Used as-is
/product/poker-set-500.webp
/product/images/chips.jpg

### R2 URLs (R2存储) - Used as-is
https://your-r2-domain.com/products/2026/01/image.webp

## Features Format (特性格式)

Use JSON array format:
[{"title":"High Quality","description":"Premium casino-grade materials"},{"title":"Complete Set","description":"Includes 500 chips, cards, and dealer button"}]

Or use simplified format (will be converted):
High Quality: Premium materials | Complete Set: Includes 500 chips

## Example Data (示例数据)

See product-import-template.csv for complete examples.

## Notes (注意事项)

1. External image URLs will be automatically downloaded and uploaded to R2 storage
2. If R2 is not configured, external URLs will be stored as-is
3. Features field can be left empty if product has no features
4. Images field can be left empty if product has no gallery images
5. Use double quotes for text fields containing commas
6. Escape double quotes inside fields with double quotes ("")
