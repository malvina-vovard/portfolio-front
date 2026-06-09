export const STRAPI_API_URL_ENV_NAME = "STRAPI_API_URL"
export const PUBLIC_STRAPI_API_URL_ENV_NAME = "NEXT_PUBLIC_STRAPI_API_URL"

function normalizeUrl(value: string, envName: string) {
  try {
    return new URL(value).origin
  } catch {
    throw new Error(`${envName} must be a valid absolute URL.`)
  }
}

function getRequiredEnvValue(envName: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${envName} is required to contact the Strapi backend.`)
  }

  return value
}

export function getRequiredStrapiApiUrl() {
  return normalizeUrl(
    getRequiredEnvValue(STRAPI_API_URL_ENV_NAME, process.env.STRAPI_API_URL),
    STRAPI_API_URL_ENV_NAME,
  )
}

export function getRequiredPublicStrapiApiUrl() {
  return normalizeUrl(
    getRequiredEnvValue(
      PUBLIC_STRAPI_API_URL_ENV_NAME,
      process.env.NEXT_PUBLIC_STRAPI_API_URL,
    ),
    PUBLIC_STRAPI_API_URL_ENV_NAME,
  )
}
