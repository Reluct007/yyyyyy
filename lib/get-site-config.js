/**
 * 服务端获取站点配置
 * 用于 SSR 时动态生成 metadata
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yooyooy.com';

// 默认配置
const defaultConfig = {
  siteName: 'Labubu Wholesale',
  seoTitle: 'Labubu Wholesale - Premium Designer Collectibles & Custom Toys',
  seoDescription: 'Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.',
  seoKeywords: 'labubu, wholesale, designer toys, collectibles, vinyl figures, plush toys, blind box',
};

export async function getSiteConfig() {
  try {
    // 禁用所有缓存，确保每次都获取最新配置
    const res = await fetch(`${API_URL}/api/admin/config`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!res.ok) {
      console.error('Config API returned:', res.status);
      return defaultConfig;
    }

    const data = await res.json();
    
    if (data.success && data.config) {
      return {
        siteName: data.config.siteName || defaultConfig.siteName,
        seoTitle: data.config.seoTitle || defaultConfig.seoTitle,
        seoDescription: data.config.seoDescription || defaultConfig.seoDescription,
        seoKeywords: data.config.seoKeywords || defaultConfig.seoKeywords,
      };
    }
  } catch (error) {
    console.error('Failed to fetch site config:', error);
  }

  return defaultConfig;
}
