import { Resend } from 'resend';

const emailConfig = {
  contactEmail: process.env.CONTACT_EMAIL || 'info@labubuwholesale.com',
  fromEmail: process.env.FROM_EMAIL || 'noreply@labubuwholesale.com',
  fromName: 'Labubu Wholesale',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, msg: 'Method not allowed' });

  try {
    const { name, email, company, phone, quantity, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: 'Please fill in all required fields' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
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

    return res.status(200).json({ success: true, msg: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ success: false, msg: 'Failed to send message' });
  }
}
