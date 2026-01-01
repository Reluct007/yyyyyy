/**
 * 管理员登录 API
 * POST /api/admin/login
 */

// 简单的 JWT 实现
function generateToken(payload, secret) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const crypto = require('crypto');
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, msg: 'Method not allowed' });

  try {
    const { username, password } = req.body;

    // 从环境变量获取管理员凭据
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    if (!adminPassword) {
      return res.status(500).json({ success: false, msg: 'Admin not configured' });
    }

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    // 生成 token
    const token = generateToken({ username, role: 'admin' }, jwtSecret);

    return res.status(200).json({
      success: true,
      token,
      msg: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, msg: 'Login failed' });
  }
}
