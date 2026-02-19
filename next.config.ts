import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Fix for Tailwind CSS v4 + Next.js webpack:
    // Tailwind v4's @import "tailwindcss" generates virtual CSS imports
    // that webpack's css-loader tries to resolve as file paths, failing
    // with "Cannot find module './...'". We patch the css-loader rules
    // to disable @import resolution (PostCSS handles it instead).
    config.module.rules.forEach((rule: any) => {
      const rules = rule.oneOf ?? (Array.isArray(rule) ? rule : null);
      if (!rules) return;
      rules.forEach((r: any) => {
        if (!r.use) return;
        const uses = Array.isArray(r.use) ? r.use : [r.use];
        uses.forEach((u: any) => {
          if (
            u?.loader?.includes('css-loader') &&
            !u?.loader?.includes('postcss-loader')
          ) {
            if (u.options) {
              u.options.url = false;
              u.options.import = false;
            }
          }
        });
      });
    });
    return config;
  },
};

export default nextConfig;
