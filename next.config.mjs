/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'export'，启用 SSR
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
