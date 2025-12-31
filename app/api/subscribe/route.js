import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// 邮件配置 - 从环境变量读取
const emailConfig = {
  contactEmail: process.env.CONTACT_EMAIL || 'info@labubuwholesale.com',
  fromEmail: process.env.FROM_EMAIL || 'noreply@labubuwholesale.com',
  fromName: 'Labubu Wholesale',
  subjects: {
    subscribe: 'New Newsletter Subscription',
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    // 验证邮箱
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, msg: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // 方案1: 添加到 Resend Audience (如果你有 Resend Audience)
    // const { data: audienceData, error: audienceError } = await resend.contacts.create({
    //   email: email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // });

    // 方案2: 发送通知邮件给管理员
    const { data, error } = await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: emailConfig.subjects.subscribe,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p style="font-size: 18px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <strong>${email}</strong>
        </p>
        <p style="color: #666; margin-top: 20px;">
          Sent from Labubu Wholesale website
        </p>
      `,
    });

    // 方案3: 发送欢迎邮件给订阅者
    await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: email,
      subject: 'Welcome to Labubu Wholesale Newsletter!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #f97316;">Welcome to Labubu Wholesale!</h1>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll be the first to know about:</p>
          <ul>
            <li>New product releases</li>
            <li>Exclusive wholesale deals</li>
            <li>Industry trends and insights</li>
          </ul>
          <p>Stay tuned for exciting updates!</p>
          <p style="color: #666; margin-top: 30px;">
            Best regards,<br>
            The Labubu Wholesale Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, msg: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: 'Successfully subscribed! Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, msg: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
