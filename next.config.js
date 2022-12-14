/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "miro.medium.com",
      "firebasestorage.googleapis.com",
      "www.google.com",
    ],
  },
};

module.exports = nextConfig;
