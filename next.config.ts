import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // STRAPI: add your Strapi domain here
      // { protocol: 'https', hostname: 'your-strapi-domain.com' },
    ],
  },
}

export default nextConfig
