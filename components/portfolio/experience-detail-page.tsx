import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStrapiMediaUrl } from "@/lib/strapi/media"
import type { ExperienceCategory } from "@/lib/portfolio/portfolio-data"
import type { LigneMedia, ProjectMedia, ProjectWithMedia } from "@/types/project"

type ExperienceDetailPageProps = {
  category: ExperienceCategory
  project: ProjectWithMedia
}

export function ExperienceDetailPage({
  category,
  project,
}: ExperienceDetailPageProps) {
  const tools = getProjectTools(project.outils)
  const mediaRows = project.ligne_medias ?? []

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto flex max-w-5xl flex-col gap-8">
        <Button
          asChild
          variant="ghost"
          className="w-fit text-[var(--portfolio-hero-accent)] hover:bg-[var(--portfolio-hero-accent)]/10 hover:text-[var(--portfolio-hero-accent)]"
        >
          <Link href={`/experiences/${category.slug}`}>
            <ArrowLeftIcon data-icon="inline-start" />
            {category.label}
          </Link>
        </Button>

        <header className="flex max-w-5xl flex-col gap-4">
          {project.date ? (
            <time
              dateTime={project.date}
              className="text-sm font-medium uppercase text-muted-foreground"
            >
              {formatProjectDate(project.date)}
            </time>
          ) : null}

          <h1 className="bebas-neue-regular text-7xl font-medium leading-[0.85] tracking-normal text-balance sm:text-8xl">
            {project.titre}
          </h1>

          {project.sous_titre ? (
            <p className="text-base uppercase tracking-[0.2em] text-muted-foreground sm:text-lg">
              {project.sous_titre}
            </p>
          ) : null}

          {project.description ? (
            <p className="max-w-full break-words text-base leading-8 text-foreground/82">
              {project.description}
            </p>
          ) : null}

          {tools.length > 0 ? (
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-sm font-medium text-foreground">
                Outils et apps
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="rounded-md border-foreground/10 bg-white px-3! py-4! text-sm leading-7 text-foreground/80 shadow-sm"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        {mediaRows.length > 0 ? (
          <section className="flex flex-col gap-5">
            {mediaRows.map((row) => (
              <ProjectMediaRow key={row.documentId ?? row.id} row={row} />
            ))}
          </section>
        ) : null}
      </article>
    </main>
  )
}

function getProjectTools(tools?: string | null) {
  return (
    tools
      ?.split(",")
      .map((tool) => tool.trim())
      .filter(Boolean) ?? []
  )
}

function formatProjectDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}

function ProjectMediaRow({ row }: { row: LigneMedia }) {
  const medias = (row.medias ?? []).slice(0, 2).filter(isSupportedMedia)

  if (medias.length === 0) {
    return null
  }

  if (medias.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-muted">
        <ProjectMediaItem media={medias[0]} sizes="(max-width: 1024px) 100vw, 1024px" />
      </div>
    )
  }

  return (
    <div className="grid w-full gap-5 sm:grid-cols-2">
      {medias.map((media) => (
        <div
          key={media.documentId ?? media.id}
          className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-muted"
        >
          <ProjectMediaItem
            media={media}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 502px"
          />
        </div>
      ))}
    </div>
  )
}

function ProjectMediaItem({
  media,
  sizes,
}: {
  media: ProjectMedia
  sizes: string
}) {
  const url = getMediaUrl(media)

  if (!url) {
    return null
  }

  if (media.mime?.startsWith("video/")) {
    return (
      <video
        className="h-full w-full bg-black object-cover"
        controls
        playsInline
        preload="metadata"
        src={url}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={media.alternativeText ?? media.caption ?? media.name}
      fill
      sizes={sizes}
      className="object-cover"
      unoptimized={isLocalMediaUrl(url)}
    />
  )
}

function isSupportedMedia(media: ProjectMedia) {
  return media.mime?.startsWith("image/") || media.mime?.startsWith("video/")
}

function getMediaUrl(media: ProjectMedia) {
  const path = media.mime?.startsWith("image/")
    ? media.formats?.large?.url ?? media.formats?.medium?.url ?? media.url
    : media.url

  return getStrapiMediaUrl(path)
}

function isLocalMediaUrl(url: string) {
  try {
    const mediaUrl = new URL(url)

    return mediaUrl.hostname === "localhost" || mediaUrl.hostname === "127.0.0.1"
  } catch {
    return false
  }
}
