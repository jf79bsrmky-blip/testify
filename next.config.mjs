// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  output: 'standalone', // 🔥 REQUIRED for pm2 + production mode

  experimental: {
    // Remove appDir, it is auto in app router
  },

  async rewrites() {
    return []; // backend + frontend same server
  },
};

export default nextConfig;
