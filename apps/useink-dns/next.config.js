/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['web3'], // https://turbo.build/repo/docs/handbook/sharing-code/internal-packages#6-configuring-your-app
};

module.exports = nextConfig;
