import "server-only"

import { strapiFetch } from "@/lib/strapi/api"
import type { StrapiCollectionResponse } from "@/lib/strapi/types"
import type {
  ProjectCategory,
  ProjectWithCover,
  ProjectWithMedia,
} from "@/types/project"

export async function getProjectsByCategory(category: ProjectCategory) {
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
}

export async function getProjectByTitleAndCategory(
  title: string,
  category: ProjectCategory,
) {
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
}
