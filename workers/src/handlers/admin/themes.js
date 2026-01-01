import { jsonResponse } from '../../utils/response.js';

// 可用主题配置
const availableThemes = {
  labubu: {
    id: 'labubu',
    name: 'Labubu Wholesale',
    description: 'Labubu 批发主题 - 设计师收藏品',
    preview: '/themes/labubu/logo1.webp',
  },
};

export async function handleThemes(request, env) {
  try {
    const themes = Object.values(availableThemes);
    return jsonResponse({ success: true, themes });
  } catch (error) {
    console.error('Get themes error:', error);
    return jsonResponse({ success: false, msg: 'Failed to get themes' }, 500);
  }
}
