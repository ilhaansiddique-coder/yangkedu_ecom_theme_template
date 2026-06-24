import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS folder so the app stays self-contained and
  // ignores any lockfile in a parent directory.
  turbopack: {
    root: __dirname,
  },
  // Allow remote demo product imagery from picsum.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
