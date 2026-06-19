import { getStrapiMediaUrl } from "@/lib/strapi/media"
import type { ProjectMedia, ProjectWithMedia } from "@/types/project"

export function getProjectPreviewImageUrl(project: ProjectWithMedia) {
  const coverImageUrl = getProjectMediaUrl(project.couverture)

  if (coverImageUrl) {
    return coverImageUrl
  }

  const media = project.ligne_medias
    ?.flatMap((row) => row.medias ?? [])
    .find((item) => item.mime?.startsWith("image/"))

  return getProjectMediaUrl(media)
}

export function getProjectMediaUrl(media?: ProjectMedia | null) {
  if (!media?.mime?.startsWith("image/")) {
    return null
  }

  return getStrapiMediaUrl(
    media.formats?.large?.url ?? media.formats?.medium?.url ?? media.url,
  )
}
