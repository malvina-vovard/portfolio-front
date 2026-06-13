import { getRequiredStrapiApiUrl } from "@/lib/strapi/env"

export function getStrapiMediaUrl(path?: string | null) {
  if (!path) {
    return null
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  const mediaBaseUrl = getStrapiMediaBaseUrl()

  if (!mediaBaseUrl) {
    return null
  }

  return `${mediaBaseUrl}${normalizedPath}`
}

function getStrapiMediaBaseUrl() {
  try {
    return getRequiredStrapiApiUrl()
  } catch {
    return null
  }
}
