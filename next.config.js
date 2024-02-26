/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.MODE === "production",
  },
  reactStrictMode: process.env.NODE_ENV === "development",
};

module.exports = nextConfig;
