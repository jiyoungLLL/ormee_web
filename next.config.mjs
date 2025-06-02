/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: 프로필 api 연동 후 테스트 이미지용 패턴 삭제
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      // 피드백 임시 이미지
      { hostname: 'static.cdn.soomgo.com' },
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
