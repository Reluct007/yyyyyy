import { jsonResponse } from '../../utils/response.js';
import { verifyToken } from '../../utils/jwt.js';

const CONFIG_KEY = 'site_config';

// 默认配置
const defaultConfig = {
  contactEmail: '',
  fromEmail: '',
  fromName: 'Labubu Wholesale',
  activeTheme: 'labubu',
  siteName: 'Labubu Wholesale',
  siteDescription: 'Premium designer collectibles',
};

// 触发 Cloudflare Pages 重新构建
async function triggerDeploy(deployHookUrl) {
  if (!deployHookUrl) return { triggered: false, reason: 'No deploy hook configured' };
  
  try {
    const res = await fetch(deployHookUrl, { method: 'POST' });
    if (res.ok) {
      return { triggered: true };
    }
    return { triggered: false, reason: `Deploy hook returned ${res.status}` };
  } catch (error) {
    return { triggered: false, reason: error.message };
  }
}

export async function handleConfig(request, env) {
  const jwtSecret = env.JWT_SECRET || 'your-secret-key-change-in-production';

  // GET 请求
  if (request.method === 'GET') {
    try {
      // 检查是否有 token
      const authHeader = request.headers.get('Authorization');
      let isAdmin = false;
      
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const payload = await verifyToken(token, jwtSecret);
        isAdmin = payload && payload.role === 'admin';
      }

      let config = await env.CONFIG_KV.get(CONFIG_KEY, 'json');
      if (!config) config = defaultConfig;

      // 非管理员只返回公开配置
      if (!isAdmin) {
        return jsonResponse({
          success: true,
          config: {
            activeTheme: config.activeTheme,
            siteName: config.siteName,
            siteDescription: config.siteDescription,
          }
        });
      }

      // 管理员返回完整配置
      return jsonResponse({
        success: true,
        config: {
          ...config,
          _effectiveContactEmail: config.contactEmail || env.CONTACT_EMAIL || 'Not set',
          _effectiveFromEmail: config.fromEmail || env.FROM_EMAIL || 'Not set',
        }
      });
    } catch (error) {
      console.error('Get config error:', error);
      return jsonResponse({ success: false, msg: 'Failed to get config' }, 500);
    }
  }

  // POST 请求 - 需要管理员权限
  if (request.method === 'POST') {
    try {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) {
        return jsonResponse({ success: false, msg: 'No token provided' }, 401);
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = await verifyToken(token, jwtSecret);

      if (!payload || payload.role !== 'admin') {
        return jsonResponse({ success: false, msg: 'Invalid or expired token' }, 401);
      }

      const updates = await request.json();

      // 获取当前配置
      let config = await env.CONFIG_KV.get(CONFIG_KEY, 'json');
      if (!config) config = defaultConfig;

      // 合并更新
      const newConfig = {
        ...config,
        ...updates,
        updatedAt: new Date().toISOString(),
        updatedBy: payload.username,
      };

      // 保存配置
      await env.CONFIG_KV.put(CONFIG_KEY, JSON.stringify(newConfig));

      // 如果主题变了，触发重新构建
      let deployResult = null;
      if (updates.activeTheme && updates.activeTheme !== config.activeTheme) {
        deployResult = await triggerDeploy(env.DEPLOY_HOOK_URL);
      }

      return jsonResponse({
        success: true,
        msg: deployResult?.triggered 
          ? 'Config saved. Rebuild triggered, please wait a few minutes.' 
          : 'Config updated successfully',
        config: newConfig,
        deploy: deployResult
      });
    } catch (error) {
      console.error('Update config error:', error);
      return jsonResponse({ success: false, msg: 'Failed to update config' }, 500);
    }
  }

  return jsonResponse({ success: false, msg: 'Method not allowed' }, 405);
}
