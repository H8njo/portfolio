/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // black-hole-effect는 git 의존성으로 src의 TS/TSX를 직접 export하므로 트랜스파일 필요.
  transpilePackages: ["black-hole-effect"],
};

export default nextConfig;
