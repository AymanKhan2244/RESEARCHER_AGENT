import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker production build (creates a self-contained server.js)
  output: "standalone",
};

export default nextConfig;
