import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Vercel / Node host)
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Keep resolution inside this app (avoids picking up a lockfile above Desktop)
    root: path.join(__dirname),
  },
};

export default nextConfig;
