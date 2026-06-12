import "server-only"

import { strapiFetch } from "@/lib/strapi/api"
import type { StrapiCollectionResponse } from "@/lib/strapi/types"
import type { ProjectCategory, ProjectWithMedia } from "@/types/project"

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
