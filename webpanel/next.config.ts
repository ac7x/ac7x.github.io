import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  // 啟用靜態匯出
  basePath: process.env.NODE_ENV === 'production' ? '/webpanel' : '',
  images: {
    unoptimized: true, // 在靜態匯出中需要
  },
  trailingSlash: true, // 對靜態匯出有幫助
};

export default nextConfig;
