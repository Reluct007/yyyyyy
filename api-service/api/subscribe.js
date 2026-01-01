import { Resend } from 'resend';
import { kvGet } from '../lib/cloudflare-kv.js';

const CONFIG_KEY = 'site_config';

// 获取邮件配置
async function getEmailConfig() {
  let config = {};
  
  try {
    config = await kvGet(CONFIG_KEY) || {};
  } catch (e) {
    console.log('KV not available, using env vars');
  }

  return {
    contactEmail: config.contactEmail || process.env.CONTACT_EMAIL || 'info@labubuwholesale.com',
    fromEmail: config.fromEmail || process.env.FROM_EMAIL || 'noreply@labubuwholesale.com',
    fromName: config.fromName || 'Labubu Wholesale',
    siteName: config.siteName || 'Labubu Wholesale',
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, msg: 'Method not allowed' });

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, msg: 'Please enter a valid email' });
    }

    // 获取动态配置
    const emailConfig = await getEmailConfig();
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 通知管理员
    await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: 'New Newsletter Subscription',
      html: `<h2>New Subscription</h2><p><strong>${email}</strong></p>`,
    });

    // 发送欢迎邮件
    await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: email,
      subject: `Welcome to ${emailConfig.siteName} Newsletter!`,
      html: `
        <h1 style="color: #f97316;">Welcome to ${emailConfig.siteName}!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll be the first to know about new products and exclusive deals!</p>
      `,
    });

    return res.status(200).json({ success: true, msg: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ success: false, msg: 'Failed to subscribe' });
  }
}
