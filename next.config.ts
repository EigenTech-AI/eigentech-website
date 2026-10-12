import type { NextConfig } from 'next';

// Static export for GitHub Pages. With the custom domain (www.eigentech.ai) no base path is needed;
// set NEXT_PUBLIC_BASE_PATH=/eigentech-website only if you serve it from username.github.io/eigentech-website.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
