/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['crypto-js'],
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL,
    API_URL_V3: process.env.API_URL_V3,
    SOCKET_URL: process.env.SOCKET_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    APPLE_REDIRECT_URL: process.env.APPLE_REDIRECT_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS, // Updated to public variable
    SERVER_TYPE: process.env.SERVER_TYPE,
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},


};

module.exports = nextConfig;
