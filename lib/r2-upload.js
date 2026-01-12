// R2 Upload Utility
// Handles uploading images to Cloudflare R2 storage

/**
 * Upload a file to Cloudflare R2
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder path (e.g., 'products')
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadToR2(file, folder = 'products') {
    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided');
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.');
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new Error('File size exceeds 10MB limit.');
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop();
        const filename = `${timestamp}-${randomString}.${extension}`;

        // Create path with date folder structure
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const path = `${folder}/${year}/${month}/${filename}`;

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', path);

        // Upload to API route
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        const data = await response.json();

        return {
            success: true,
            url: data.url,
            path: data.path
        };
    } catch (error) {
        console.error('R2 upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Upload an image from a URL to R2
 * @param {string} imageUrl - The URL of the image to download and upload
 * @param {string} folder - Optional folder path
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadExternalImageToR2(imageUrl, folder = 'products') {
    try {
        // Fetch the image
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image from URL');
        }

        // Convert to blob
        const blob = await response.blob();

        // Get filename from URL or generate one
        const urlPath = new URL(imageUrl).pathname;
        const originalFilename = urlPath.split('/').pop() || 'image.jpg';

        // Create File object from blob
        const file = new File([blob], originalFilename, { type: blob.type });

        // Upload to R2
        return await uploadToR2(file, folder);
    } catch (error) {
        console.error('External image upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Check if R2 is configured
 * @returns {boolean}
 */
export function isR2Configured() {
    return !!(
        process.env.CLOUDFLARE_ACCOUNT_ID &&
        process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
        process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
        process.env.CLOUDFLARE_R2_BUCKET_NAME
    );
}
