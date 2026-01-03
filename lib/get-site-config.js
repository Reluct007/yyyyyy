/**
 * 服务端获取站点配置
 * 用于 SSR 时动态生成 metadata
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://labubu-api.reluct007.workers.dev';

// 默认配置
const defaultConfig = {
  siteName: 'Labubu Wholesale',
  seoTitle: 'Labubu Wholesale - Premium Designer Collectibles & Custom Toys',
  seoDescription: 'Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.',
  seoKeywords: 'labubu, wholesale, designer toys, collectibles, vinyl figures, plush toys, blind box',
};

// 缓存配置（避免每次请求都调用 API）
let cachedConfig = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 分钟缓存

export async function getSiteConfig() {
  // 检查缓存
  if (cachedConfig && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    const res = await fetch(`${API_URL}/api/admin/config`, {
      next: { revalidate: 60 }, // Next.js 缓存 60 秒
    });
    
    if (!res.ok) {
      return defaultConfig;
    }

    const data = await res.json();
    
    if (data.success && data.config) {
      cachedConfig = {
        siteName: data.config.siteName || defaultConfig.siteName,
        seoTitle: data.config.seoTitle || defaultConfig.seoTitle,
        seoDescription: data.config.seoDescription || defaultConfig.seoDescription,
        seoKeywords: data.config.seoKeywords || defaultConfig.seoKeywords,
      };
      cacheTime = Date.now();
      return cachedConfig;
    }
  } catch (error) {
    console.error('Failed to fetch site config:', error);
  }

  return defaultConfig;
}
