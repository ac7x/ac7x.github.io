/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/webpanel' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/webpanel/' : '',
}

module.exports = nextConfig;