import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["cbdb.mine", ".cbdb.mine", "pro.local", ".pro.local"],
};

export default nextConfig;
