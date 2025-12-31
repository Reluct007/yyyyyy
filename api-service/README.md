# Labubu API Service

邮件服务 API，部署到 Vercel Serverless Functions。

## 部署到 Vercel

1. 在 Vercel 导入项目时，设置 **Root Directory** 为 `api-service`
2. 添加环境变量：
   - `RESEND_API_KEY` - Resend API 密钥
   - `CONTACT_EMAIL` - 接收邮件的邮箱
   - `FROM_EMAIL` - 发件人邮箱

## API 端点

- `POST /api/contact` - 联系表单
- `POST /api/subscribe` - 订阅表单

## 前端调用

部署后获取 Vercel 域名（如 `https://xxx.vercel.app`），在前端配置中使用。
