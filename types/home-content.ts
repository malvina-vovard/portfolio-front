import type { ProjectMedia } from "@/types/project"

export type AboutContentAttributes = {
  titre?: string | null
  sous_titre?: string | null
  description?: string | null
  tags?: string | string[] | null
  avatar?: ProjectMedia | null
}

export type AboutContent = {
  title: string | null
  subtitle: string | null
  description: string | null
  tags: string[]
  avatarUrl: string | null
  avatarAlt: string | null
}

export type ContactContentAttributes = {
  email?: string | null
  linkedin?: string | null
}

export type ContactContent = {
  email: string | null
  linkedin: string | null
}
