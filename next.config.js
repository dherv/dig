/** @type {import('next').NextConfig} */
const nextPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const withPWA = nextPWA({
  dest: "public",
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "bwnzsyiyrdhnixiceulq.supabase.co",
      "dummyimage.com",
    ],
  },
});

module.exports = nextConfig;
