import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 获取 Cloudflare 环境和 R2 绑定
        const { env } = await getCloudflareContext();
        const bucket = env.UPLOADS_BUCKET;

        if (!bucket) {
            console.error('R2 bucket not configured');
            return NextResponse.json({
                error: 'Storage not configured. Please configure R2 bucket binding.'
            }, { status: 500 });
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}-${safeName}`;

        // 上传到 R2
        const arrayBuffer = await file.arrayBuffer();
        await bucket.put(filename, arrayBuffer, {
            httpMetadata: {
                contentType: file.type || 'application/octet-stream',
            },
        });

        // 返回 URL
        return NextResponse.json({
            success: true,
            filename: filename,
            url: `/api/uploads/${filename}`,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            error: 'Upload failed',
            details: error.message
        }, { status: 500 });
    }
}

// 获取文件列表
export async function GET(request) {
    try {
        const { env } = await getCloudflareContext();
        const bucket = env.UPLOADS_BUCKET;

        if (!bucket) {
            return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
        }

        const listed = await bucket.list({ limit: 100 });
        const files = listed.objects.map(obj => ({
            name: obj.key,
            size: obj.size,
            uploaded: obj.uploaded,
            url: `/api/uploads/${obj.key}`,
        }));

        return NextResponse.json({ files });
    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }
}
