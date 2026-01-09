import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

// 从 R2 获取并提供文件
export async function GET(request, { params }) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json({ error: 'Filename required' }, { status: 400 });
        }

        const { env } = await getCloudflareContext();
        const bucket = env.UPLOADS_BUCKET;

        if (!bucket) {
            return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
        }

        const object = await bucket.get(filename);

        if (!object) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000');

        return new Response(object.body, { headers });
    } catch (error) {
        console.error('File serve error:', error);
        return NextResponse.json({ error: 'Failed to retrieve file' }, { status: 500 });
    }
}
