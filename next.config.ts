import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/project-screenshot": ["./data/**/*"],
  },
};

export default nextConfig;
