/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Demo imagery (picsum) is served via a redirect that Vercel's image
    // optimizer fails on — which left every product image blank. Load images
    // directly so they always render. (Re-enable optimization once real,
    // single-origin product photos / Shopify CDN images are in place.)
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Shopify CDN — enable once products are connected.
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      // Placeholder/demo imagery used by the dummy catalog.
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
