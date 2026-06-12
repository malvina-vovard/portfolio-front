import type { StrapiEntity } from "@/lib/strapi/types"

export type ProfessionalExperienceAttributes = {
  titre?: string | null
  description?: string | null
  entreprise?: string | null
  debut?: string | null
  fin?: string | null
}

export type ProfessionalExperience =
  StrapiEntity<ProfessionalExperienceAttributes>
