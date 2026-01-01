/**
 * 配置管理 API
 * GET /api/admin/config - 获取配置
 * POST /api/admin/config - 更新配置
 */

import { kv } from '@vercel/kv';

// 验证 JWT Token
function verifyToken(token, secret) {
  try {
    const [header, body, signature] = token.split('.');
    const crypto = require('crypto');
    const expectedSig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
    
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    
    return payload;
  } catch {
    return null;
  }
}

// 默认配置
const defaultConfig = {
  // 邮件配置
  contactEmail: '',      // 留空则使用环境变量
  fromEmail: '',         // 留空则使用环境变量
  fromName: 'Labubu Wholesale',
  
  // 主题配置
  activeTheme: 'labubu',
  
  // 网站配置
  siteName: 'Labubu Wholesale',
  siteDescription: 'Premium designer collectibles',
};

// 配置键名
const CONFIG_KEY = 'site_config';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  // GET 请求 - 公开配置（部分字段）
  if (req.method === 'GET') {
    try {
      // 检查是否有 token（管理员请求完整配置）
      const authHeader = req.headers.authorization;
      const isAdmin = authHeader && verifyToken(authHeader.replace('Bearer ', ''), jwtSecret);

      let config = await kv.get(CONFIG_KEY);
      
      if (!config) {
        config = defaultConfig;
      }

      // 非管理员只返回公开配置
      if (!isAdmin) {
        return res.status(200).json({
          success: true,
          config: {
            activeTheme: config.activeTheme,
            siteName: config.siteName,
            siteDescription: config.siteDescription,
          }
        });
      }

      // 管理员返回完整配置
      return res.status(200).json({
        success: true,
        config: {
          ...config,
          // 显示实际使用的值
          _effectiveContactEmail: config.contactEmail || process.env.CONTACT_EMAIL || 'Not set',
          _effectiveFromEmail: config.fromEmail || process.env.FROM_EMAIL || 'Not set',
        }
      });
    } catch (error) {
      console.error('Get config error:', error);
      return res.status(500).json({ success: false, msg: 'Failed to get config' });
    }
  }

  // POST 请求 - 需要管理员权限
  if (req.method === 'POST') {
    try {
      // 验证 token
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ success: false, msg: 'No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = verifyToken(token, jwtSecret);

      if (!payload || payload.role !== 'admin') {
        return res.status(401).json({ success: false, msg: 'Invalid or expired token' });
      }

      const updates = req.body;

      // 获取当前配置
      let config = await kv.get(CONFIG_KEY);
      if (!config) {
        config = defaultConfig;
      }

      // 合并更新
      const newConfig = {
        ...config,
        ...updates,
        updatedAt: new Date().toISOString(),
        updatedBy: payload.username,
      };

      // 保存配置
      await kv.set(CONFIG_KEY, newConfig);

      return res.status(200).json({
        success: true,
        msg: 'Config updated successfully',
        config: newConfig
      });
    } catch (error) {
      console.error('Update config error:', error);
      return res.status(500).json({ success: false, msg: 'Failed to update config' });
    }
  }

  return res.status(405).json({ success: false, msg: 'Method not allowed' });
}
