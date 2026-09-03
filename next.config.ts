import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// The repository name must match exactly (case-sensitive) for GitHub Pages
const repoName = "Convert.io";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
