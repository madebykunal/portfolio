import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  turbopack: {
    rules: {
      '*.css': {
        condition: { not: 'foreign' },
        loaders: ['@tailwindcss/webpack'],
        type: 'css',
      },
    },
  },
};

export default nextConfig;
