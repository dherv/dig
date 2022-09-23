/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "bwnzsyiyrdhnixiceulq.supabase.co",
      "dummyimage.com",
    ],
  },
};

module.exports = nextConfig;
