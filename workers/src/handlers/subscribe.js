import { jsonResponse } from '../utils/response.js';
import { sendEmail } from '../utils/resend.js';

const CONFIG_KEY = 'site_config';

// 获取邮件配置
async function getEmailConfig(env) {
  let config = {};
  
  try {
    const stored = await env.CONFIG_KV.get(CONFIG_KEY, 'json');
    if (stored) config = stored;
  } catch (e) {
    console.log('KV not available, using env vars');
  }

  return {
    contactEmail: config.contactEmail || env.CONTACT_EMAIL || 'info@labubuwholesale.com',
    fromEmail: config.fromEmail || env.FROM_EMAIL || 'noreply@labubuwholesale.com',
    fromName: config.fromName || 'Labubu Wholesale',
    siteName: config.siteName || 'Labubu Wholesale',
  };
}

export async function handleSubscribe(request, env) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return jsonResponse({ success: false, msg: 'Please enter a valid email' }, 400);
    }

    // 获取动态配置
    const emailConfig = await getEmailConfig(env);

    // 通知管理员
    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: 'New Newsletter Subscription',
      html: `<h2>New Subscription</h2><p><strong>${email}</strong></p>`,
    });

    // 发送欢迎邮件
    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: email,
      subject: `Welcome to ${emailConfig.siteName} Newsletter!`,
      html: `
        <h1 style="color: #f97316;">Welcome to ${emailConfig.siteName}!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll be the first to know about new products and exclusive deals!</p>
      `,
    });

    return jsonResponse({ success: true, msg: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return jsonResponse({ success: false, msg: 'Failed to subscribe' }, 500);
  }
}
