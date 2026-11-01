import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    // Keep resolution inside this app (avoids picking up a lockfile above Desktop)
    root: path.join(__dirname),
  },
};

export default nextConfig;
