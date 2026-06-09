import { getRequiredPublicStrapiApiUrl } from "@/lib/strapi/env"

export function getStrapiMediaUrl(path?: string | null) {
  if (!path) {
    return null
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${getRequiredPublicStrapiApiUrl()}${normalizedPath}`
}
