import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["cbdb.mine", ".cbdb.mine", "pro.local", ".pro.local"],
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"],
  },
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    API_URL: process.env.API_URL,
    APP_SECRET: process.env.APP_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_INTERNAL_URL: process.env.APP_INTERNAL_URL,
    SECRET_KEY_BASE: process.env.SECRET_KEY_BASE,
  },
};

export default nextConfig;
