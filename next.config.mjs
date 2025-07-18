/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ormee-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      // 피드백 임시 이미지
      { hostname: 'static.cdn.soomgo.com' },
      { hostname: 'img.freepik.com' },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      _http_common: false,
    };
    return config;
  },
};

export default nextConfig;
