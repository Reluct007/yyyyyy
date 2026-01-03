/**
 * Labubu API - Cloudflare Workers
 * 处理邮件发送和后台管理
 */

import { handleContact } from './handlers/contact.js';
import { handleSubscribe } from './handlers/subscribe.js';
import { handleLogin } from './handlers/admin/login.js';
import { handleConfig } from './handlers/admin/config.js';

// CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// 处理 OPTIONS 预检请求
function handleOptions() {
  return new Response(null, { headers: corsHeaders });
}

// JSON 响应
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 处理 CORS 预检
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    try {
      // 根路径 - API 状态
      if (path === '/' || path === '') {
        return jsonResponse({
          success: true,
          msg: 'Labubu API is running',
          endpoints: [
            'POST /api/contact',
            'POST /api/subscribe',
            'POST /api/admin/login',
            'GET/POST /api/admin/config'
          ]
        });
      }

      // 路由
      if (path === '/api/contact' && request.method === 'POST') {
        return await handleContact(request, env);
      }

      if (path === '/api/subscribe' && request.method === 'POST') {
        return await handleSubscribe(request, env);
      }

      if (path === '/api/admin/login' && request.method === 'POST') {
        return await handleLogin(request, env);
      }

      if (path === '/api/admin/config') {
        return await handleConfig(request, env);
      }

      // 404
      return jsonResponse({ success: false, msg: 'Not found' }, 404);

    } catch (error) {
      console.error('Error:', error);
      return jsonResponse({ success: false, msg: 'Internal server error' }, 500);
    }
  },
};
