import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.FSCO_STATIC_EXPORT === "true"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
