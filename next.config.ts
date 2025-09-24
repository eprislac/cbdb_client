import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["cbdb.mine", "*.cbdb.mine"],
};

export default nextConfig;
