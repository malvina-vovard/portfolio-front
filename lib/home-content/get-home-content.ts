import "server-only"

import { isStrapiRequestError, strapiFetch } from "@/lib/strapi/api"
import { getStrapiMediaUrl } from "@/lib/strapi/media"
import type { StrapiResponse } from "@/lib/strapi/types"
import type {
  AboutContent,
  AboutContentAttributes,
  ContactContent,
  ContactContentAttributes,
} from "@/types/home-content"

function parseTags(tags?: string | string[] | null) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean)
  }

  return (
    tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []
  )
}

function mapAboutContent(
  attributes?: AboutContentAttributes | null,
): AboutContent {
  const avatar = attributes?.avatar
  const avatarPath =
    avatar?.formats?.large?.url ?? avatar?.formats?.medium?.url ?? avatar?.url

  return {
    title: attributes?.titre ?? null,
    subtitle: attributes?.sous_titre ?? null,
    description: attributes?.description ?? null,
    tags: parseTags(attributes?.tags),
    avatarUrl: getStrapiMediaUrl(avatarPath),
    avatarAlt: avatar?.alternativeText ?? avatar?.caption ?? avatar?.name ?? null,
  }
}

function mapContactContent(
  attributes?: ContactContentAttributes | null,
): ContactContent {
  return {
    email: attributes?.email ?? null,
    linkedin: attributes?.linkedin ?? null,
  }
}

export async function getAboutContent() {
  try {
    const response = await strapiFetch<
      StrapiResponse<AboutContentAttributes | null>
    >(
      "/about",
      {
        query: {
          populate: {
            avatar: true,
          },
        },
        next: {
          tags: ["about"],
        },
      },
    )

    return mapAboutContent(response.data)
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return mapAboutContent(null)
    }

    throw error
  }
}

export async function getContactContent() {
  try {
    const response = await strapiFetch<
      StrapiResponse<ContactContentAttributes | null>
    >("/contact", {
      next: {
        tags: ["contact"],
      },
    })

    return mapContactContent(response.data)
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return mapContactContent(null)
    }

    throw error
  }
}
