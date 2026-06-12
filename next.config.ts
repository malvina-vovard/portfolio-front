import type { NextConfig } from "next";

function getStrapiImageRemotePatterns() {
  const configuredUrls = [
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    process.env.STRAPI_API_URL,
  ];
  const fallbackUrls = ["http://localhost:1338", "http://127.0.0.1:1338"];

  return [...configuredUrls, ...fallbackUrls].flatMap((value) => {
    if (!value) {
      return [];
    }

    try {
      const url = new URL(value);

      return [
        {
          protocol: url.protocol.replace(":", "") as "http" | "https",
          hostname: url.hostname,
          port: url.port,
          pathname: "/uploads/**",
          search: "",
        },
      ];
    } catch {
      return [];
    }
  });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      ...getStrapiImageRemotePatterns(),
    ],
  },
  compress: true,
};

export default nextConfig;
