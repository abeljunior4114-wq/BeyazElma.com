/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'BeyazElma',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'benbalbazar@proton.me'
  }
};

export default nextConfig;


