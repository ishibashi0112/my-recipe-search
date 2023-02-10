/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "img.cpcdn.com",
  //       port: "",
  //       pathname: "/recipes/**",
  //     },
  //   ],
  // },
});

module.exports = nextConfig;
