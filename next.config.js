/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['axios', 'fs', 'path'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        child_process: false,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/bot',
        destination: '/api/bot',
      },
    ];
  },
}

module.exports = nextConfig
