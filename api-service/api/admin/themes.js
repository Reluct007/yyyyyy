/**
 * 主题列表 API
 * GET /api/admin/themes - 获取可用主题列表
 */

// 可用主题配置（与前端 config/theme.js 保持同步）
const availableThemes = {
  labubu: {
    id: 'labubu',
    name: 'Labubu Wholesale',
    description: 'Labubu 批发主题 - 设计师收藏品',
    preview: '/themes/labubu/logo1.webp',
  },
  // 添加更多主题时在这里注册
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, msg: 'Method not allowed' });

  try {
    const themes = Object.values(availableThemes);
    
    return res.status(200).json({
      success: true,
      themes
    });
  } catch (error) {
    console.error('Get themes error:', error);
    return res.status(500).json({ success: false, msg: 'Failed to get themes' });
  }
}
