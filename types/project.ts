import type { StrapiEntity } from "@/lib/strapi/types"

export type ProjectCategory = "marketing_digital" | "design" | "website"

export type RichTextTextNode = {
  type: "text"
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type RichTextLinkNode = {
  type: "link"
  url: string
  children: RichTextInlineNode[]
  rel?: string | null
  target?: string | null
}

export type RichTextInlineNode = RichTextTextNode | RichTextLinkNode

export type RichTextBlockNode = {
  type: string
  children?: RichTextNode[]
  format?: "ordered" | "unordered" | string
  level?: number
  url?: string
  image?: ProjectMedia | null
  [key: string]: unknown
}

export type RichTextNode = RichTextInlineNode | RichTextBlockNode
export type RichTextContent = RichTextBlockNode[]

export type Project = {
  titre: string
  categorie: ProjectCategory
  description?: RichTextContent | string | null
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
    couverture?: ProjectMedia | null
    ligne_medias?: LigneMedia[] | null
  }
>

export type ProjectWithCover = StrapiEntity<
  Project & {
    couverture?: ProjectMedia | null
  }
>
