/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.squarespace-cdn.com',
      'storage.googleapis.com',
      'assets.cdn.filesafe.space',
      'video.squarespace-cdn.com',
    ],
  },
};

module.exports = nextConfig;
