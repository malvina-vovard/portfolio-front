import type { StrapiEntity } from "@/lib/strapi/types"

export type ProjectCategory = "marketing_digital" | "design" | "website"

export type Project = {
  titre: string
  categorie: ProjectCategory
  description?: string | null
  mini_description?: string | null
  date?: string | null
  outils?: string | null
  sous_titre?: string | null
  favoris?: boolean | null
}

export type ProjectMediaFormat = {
  url?: string | null
  width?: number | null
  height?: number | null
}

export type ProjectMedia = StrapiEntity<{
  name: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
  formats?: {
    thumbnail?: ProjectMediaFormat
    small?: ProjectMediaFormat
    medium?: ProjectMediaFormat
    large?: ProjectMediaFormat
    [key: string]: ProjectMediaFormat | undefined
  } | null
  url: string
  mime?: string | null
}>

export type LigneMedia = StrapiEntity<{
  medias?: ProjectMedia[] | null
}>

export type ProjectWithMedia = StrapiEntity<
  Project & {
    ligne_medias?: LigneMedia[] | null
  }
>

export type ProjectWithCover = StrapiEntity<
  Project & {
    couverture?: ProjectMedia | null
  }
>
