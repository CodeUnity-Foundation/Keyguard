/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@keyguard/ui", "@keyguard/lib", "@keyguard/database"],
  reactStrictMode: false,
  compiler: {},
  webpack: {},
};
