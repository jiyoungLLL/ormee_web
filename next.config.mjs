/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: 프로필 api 연동 후 테스트 이미지용 패턴 삭제
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
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
