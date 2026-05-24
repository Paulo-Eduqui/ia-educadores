/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Desabilita PWA em desenvolvimento para facilitar o debug
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "ia-educadores-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 86400, // 24 horas
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["supabase.co", "supabase.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
});

module.exports = nextConfig;
