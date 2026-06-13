export const NEXT_PUBLIC_STRAPI_API_URL_ENV_NAME = "NEXT_PUBLIC_STRAPI_API_URL"

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
    getRequiredEnvValue(
      NEXT_PUBLIC_STRAPI_API_URL_ENV_NAME,
      process.env.NEXT_PUBLIC_STRAPI_API_URL,
    ),
    NEXT_PUBLIC_STRAPI_API_URL_ENV_NAME,
  )
}
