import { isStrapiRequestError, strapiFetch } from "@/lib/strapi/api"
import type { StrapiResponse } from "@/lib/strapi/types"
import type {
  AppConfiguration,
  AppConfigurationAttributes,
} from "@/lib/app-configuration/app-configuration-types"

const HEX_COLOR_PATTERN = /^#(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/

function getHexColor(value?: string | null) {
  if (!value || !HEX_COLOR_PATTERN.test(value)) {
    return null
  }

  return value
}

function mapAppConfiguration(
  attributes?: AppConfigurationAttributes | null,
): AppConfiguration {
  return {
    primaryColor: getHexColor(attributes?.couleur_principale),
  }
}

export async function getAppConfiguration() {
  try {
    const response = await strapiFetch<
      StrapiResponse<AppConfigurationAttributes | null>
    >("/app-configuration", {
      next: {
        tags: ["app-configuration"],
      },
    })

    return mapAppConfiguration(response.data)
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return mapAppConfiguration(null)
    }

    throw error
  }
}
