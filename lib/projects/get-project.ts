import "server-only"

import { isStrapiRequestError, strapiFetch } from "@/lib/strapi/api"
import type { StrapiCollectionResponse } from "@/lib/strapi/types"
import type {
  ProjectCategory,
  ProjectWithCover,
  ProjectWithMedia,
} from "@/types/project"

export async function getFavoriteProjects() {
  try {
    const response = await strapiFetch<StrapiCollectionResponse<ProjectWithCover>>(
      "/projets",
      {
        query: {
          filters: {
            favoris: {
              $eq: true,
            },
          },
          populate: {
            couverture: true,
          },
        },
        next: {
          revalidate: 60,
          tags: ["projects", "projects:favorites"],
        },
      },
    )

    return response.data
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return []
    }

    throw error
  }
}

export async function getProjectsByCategory(category: ProjectCategory) {
  try {
    const response = await strapiFetch<StrapiCollectionResponse<ProjectWithCover>>(
      "/projets",
      {
        query: {
          filters: {
            categorie: {
              $eq: category,
            },
          },
          populate: {
            couverture: true,
          },
        },
        next: {
          revalidate: 60,
          tags: ["projects", `projects:${category}`],
        },
      },
    )

    return response.data
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return []
    }

    throw error
  }
}

export async function getProjectByTitleAndCategory(
  title: string,
  category: ProjectCategory,
) {
  try {
    const response = await strapiFetch<StrapiCollectionResponse<ProjectWithMedia>>(
      "/projets",
      {
        query: {
          filters: {
            titre: {
              $eq: title,
            },
            categorie: {
              $eq: category,
            },
          },
          populate: {
            ligne_medias: {
              populate: "medias",
            },
          },
        },
        next: {
          revalidate: 60,
          tags: ["projects", `project:${category}:${title}`],
        },
      },
    )

    return response.data[0] ?? null
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return null
    }

    throw error
  }
}
