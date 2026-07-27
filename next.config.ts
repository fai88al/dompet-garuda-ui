import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dompetgaruda.com",
      },
    ],
  },
};

export default nextConfig;
