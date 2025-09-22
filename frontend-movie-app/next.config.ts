import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],  //allow TMDB images
  },
  reactStrictMode: true,
};

export default nextConfig;
