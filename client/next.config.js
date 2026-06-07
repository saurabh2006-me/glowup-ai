/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
  },
};

module.exports = nextConfig;
