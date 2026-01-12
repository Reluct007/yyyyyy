import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

// Initialize R2 client
const getR2Client = () => {
    if (!process.env.CLOUDFLARE_ACCOUNT_ID ||
        !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ||
        !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
        throw new Error('R2 credentials not configured');
    }

    return new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        },
    });
};

export async function POST(request) {
    try {
        // Get form data
        const formData = await request.formData();
        const file = formData.get('file');
        const path = formData.get('path');

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Initialize R2 client
        const r2Client = getR2Client();

        // Upload to R2
        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: path,
            Body: buffer,
            ContentType: file.type,
        });

        await r2Client.send(command);

        // Construct public URL
        const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${path}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: path,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
