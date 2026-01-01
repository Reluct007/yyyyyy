/**
 * 简单的 JWT 实现（适用于 Cloudflare Workers）
 */

// Base64URL 编码
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64URL 解码
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

// HMAC-SHA256 签名
async function sign(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

// 生成 Token
export async function generateToken(payload, secret) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 小时过期
  }));
  const signature = await sign(`${header}.${body}`, secret);
  return `${header}.${body}.${signature}`;
}

// 验证 Token
export async function verifyToken(token, secret) {
  try {
    const [header, body, signature] = token.split('.');
    const expectedSig = await sign(`${header}.${body}`, secret);
    
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp < Date.now()) return null;
    
    return payload;
  } catch {
    return null;
  }
}
