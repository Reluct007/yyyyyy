import { NextResponse } from 'next/server';

// 邮件配置 - 从环境变量读取
const emailConfig = {
  contactEmail: process.env.CONTACT_EMAIL || 'info@labubuwholesale.com',
  fromEmail: process.env.FROM_EMAIL || 'noreply@labubuwholesale.com',
  fromName: 'Labubu Wholesale',
  subjects: {
    quote: 'New Quote Request',
  },
};

export async function POST(request) {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const formData = await request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company') || 'Not provided';
    const phone = formData.get('phone') || 'Not provided';
    const quantity = formData.get('quantity') || 'Not specified';
    const message = formData.get('message');

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, msg: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // 发送邮件给管理员
    const { data, error } = await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: `${emailConfig.subjects.quote} - ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Quantity</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${quantity}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="color: #666; margin-top: 20px;">
          Sent from Labubu Wholesale website
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, msg: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: 'Thank you! Your message has been sent successfully.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, msg: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
