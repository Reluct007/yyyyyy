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
    contactEmail: config.contactEmail || env.CONTACT_EMAIL || 'larry@pokerset.com',
    fromEmail: config.fromEmail || env.FROM_EMAIL || 'noreply@pokerset.com',
    fromName: config.fromName || 'Poker Kit',
  };
}

export async function handleContact(request, env) {
  try {
    const { name, email, company, phone, quantity, message } = await request.json();

    if (!name || !email || !message) {
      return jsonResponse({ success: false, msg: 'Please fill in all required fields' }, 400);
    }

    // 获取动态配置
    const emailConfig = await getEmailConfig(env);

    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: `New Quote Request - ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 10px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 10px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 10px; border: 1px solid #ddd;">${company || 'Not provided'}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 10px; border: 1px solid #ddd;">${phone || 'Not provided'}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Quantity</td><td style="padding: 10px; border: 1px solid #ddd;">${quantity || 'Not specified'}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 10px; border: 1px solid #ddd;">${message}</td></tr>
        </table>
      `,
    });

    return jsonResponse({ success: true, msg: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    return jsonResponse({ success: false, msg: 'Failed to send message' }, 500);
  }
}
