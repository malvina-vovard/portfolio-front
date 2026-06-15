import type { NextConfig } from "next";

function getStrapiImageRemotePatterns() {
  const configuredUrls = [
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
  ];
  const fallbackUrls = ["http://localhost:1338", "http://127.0.0.1:1338"];

  const patterns = [...configuredUrls, ...fallbackUrls].flatMap((value) => {
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

  // Add media subdomain pattern for Strapi
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (strapiApiUrl) {
    try {
      const url = new URL(strapiApiUrl);
      const protocol = url.protocol.replace(":", "") as "http" | "https";
      const hostname = url.hostname;
      
      // Replace the domain with the media subdomain
      const mediaHostname = hostname.replace("strapiapp.com", "media.strapiapp.com");
      
      patterns.push({
        protocol,
        hostname: mediaHostname,
        port: "",
        pathname: "/**",
        search: "",
      });
    } catch {
      // Ignore errors
    }
  }

  return patterns;
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
