/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@keyguard/ui", "@keyguard/lib", "@keyguard/database"],
  reactStrictMode: false,
  compiler: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};
