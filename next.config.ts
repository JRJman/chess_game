import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export mode
  images: {
    unoptimized: true, // Required for static export if using <Image />
  },
  assetPrefix: "/chess/", // Set to '/' for proper asset resolution
  basePath: "", // Optional: Set a base path if you are deploying to a sub-directory
};

export default nextConfig;
