import "server-only"

import { isStrapiRequestError, strapiFetch } from "@/lib/strapi/api"
import type { StrapiCollectionResponse } from "@/lib/strapi/types"
import type { ProfessionalExperience } from "@/types/professional-experience"

export async function getProfessionalExperiences() {
  try {
    const response = await strapiFetch<
      StrapiCollectionResponse<ProfessionalExperience>
    >("/experiences-pro", {
      query: {
        sort: "debut:desc",
      },
      next: {
        revalidate: 60,
        tags: ["professional-experiences"],
      },
    })

    return response.data
  } catch (error) {
    if (isStrapiRequestError(error)) {
      return []
    }

    throw error
  }
}
