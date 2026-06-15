import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProjectRouteTitle } from "@/lib/projects/categories"
import { getStrapiMediaUrl } from "@/lib/strapi/media"
import type { ExperienceCategory } from "@/lib/portfolio/portfolio-data"
import type { ProjectMedia, ProjectWithCover } from "@/types/project"

type ExperienceCategoryPageProps = {
  category: ExperienceCategory
  projects: ProjectWithCover[]
}

export function ExperienceCategoryPage({
  category,
  projects,
}: ExperienceCategoryPageProps) {
  const Icon = category.icon

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-28 h-[28rem] w-[28rem] rounded-full border border-[2px] border-[var(--portfolio-hero-accent)]/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[32rem] h-[22rem] w-[30rem] rotate-[-10deg] rounded-[4rem] border border-[2px] border-[var(--portfolio-hero-accent)]/50"
      />
      <p
        aria-hidden="true"
        className="bebas-neue-regular pointer-events-none absolute -right-8 top-[16rem] hidden text-[18rem] leading-none tracking-normal text-foreground/[0.035] lg:block"
      >
        PROJETS
      </p>

      <section className="relative px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12 ">
        <div className="mx-auto max-w-7xl">
          <Button asChild variant="ghost" className="mb-6 w-fit">
            <Link href="/">
              <ArrowLeftIcon data-icon="inline-start" />
              Retour
            </Link>
          </Button>

          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Icon
                aria-hidden="true"
                className="size-4 text-[var(--portfolio-hero-accent)]"
              />
              {category.label}
            </div>
            <h1 className="bebas-neue-regular text-[clamp(5rem,14vw,13rem)] leading-[0.78] tracking-normal">
              {category.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectFeatureCard
                key={project.documentId ?? project.id}
                category={category}
                project={project}
                isReversed={index % 2 === 1}
              />
            ))
          ) : (
            <EmptyProjectsState />
          )}
        </div>
      </section>
    </main>
  )
}

function ProjectFeatureCard({
  category,
  project,
  isReversed,
}: {
  category: ExperienceCategory
  project: ProjectWithCover
  isReversed: boolean
}) {
  const tools = getProjectTools(project.outils)
  const coverUrl = getCoverUrl(project.couverture)
  const projectHref = `/experiences/${category.slug}/${getProjectRouteTitle(project.titre)}`

  return (
    <article className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card shadow-[0_24px_70px_rgb(0_0_0/0.1)]">
      <div
        className={[
          "grid min-w-0 gap-0 lg:grid-cols-2",
          isReversed ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <Link href={projectHref} className="group block min-w-0 p-4 sm:p-6">
          <div className="overflow-hidden rounded-[1rem] border border-foreground/10 bg-background shadow-[0_18px_55px_rgb(0_0_0/0.12)]">
            <div className="flex h-10 items-center gap-2 border-b border-foreground/10 bg-muted px-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 h-5 flex-1 rounded-md bg-background" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={
                    project.couverture?.alternativeText ??
                    project.couverture?.caption ??
                    `Visuel du projet ${project.titre}`
                  }
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized={isLocalMediaUrl(coverUrl)}
                />
              ) : (
                <div className="grid h-full place-items-center px-6 text-center text-sm text-muted-foreground">
                  Aucun visuel de couverture
                </div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(0_0_0/0.35))]" />
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 flex-col justify-between p-6 sm:min-h-[28rem] sm:p-8 lg:p-10">
          <div className="min-w-0">
            {project.date ? (
              <div className="mb-6 flex items-center justify-between gap-5">
                <span className="rounded-full border border-foreground/12 px-3 py-1 text-xs font-medium uppercase text-muted-foreground">
                  {formatProjectDate(project.date)}
                </span>
              </div>
            ) : null}

            {project.sous_titre ? (
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {project.sous_titre}
              </p>
            ) : null}
            <h2 className="bebas-neue-regular mt-3 max-w-xl break-words text-5xl font-semibold leading-[0.9] tracking-normal text-balance sm:text-6xl">
              {project.titre}
            </h2>
            {project.mini_description ? (
              <p className="mt-5 max-w-xl overflow-hidden whitespace-pre-line text-base leading-7 text-muted-foreground [display:-webkit-box] [overflow-wrap:anywhere] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] sm:[-webkit-line-clamp:8]">
                {project.mini_description}
              </p>
            ) : null}
          </div>

          <div className="mt-10">
            {tools.length > 0 ? (
              <div className="mb-7 flex flex-wrap gap-2">
                {tools.slice(0, 8).map((tag) => (
                  <Badge
                    key={`${project.documentId ?? project.id}-${tag}`}
                    variant="outline"
                    className="rounded-md border-foreground/10 bg-white px-3! py-4! text-sm leading-7 text-foreground/80 shadow-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]">
                <Link href={projectHref}>
                  Voir le projet
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function EmptyProjectsState() {
  return (
    <div className="rounded-[1.5rem] border border-foreground/10 bg-card px-6 py-14 text-center shadow-[0_24px_70px_rgb(0_0_0/0.08)]">
      <p className="bebas-neue-regular text-5xl leading-none tracking-normal">
        Aucun projet pour le moment
      </p>
    </div>
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

function getCoverUrl(media?: ProjectMedia | null) {
  if (!media?.mime?.startsWith("image/")) {
    return null
  }

  return getStrapiMediaUrl(
    media.formats?.large?.url ?? media.formats?.medium?.url ?? media.url,
  )
}

function isLocalMediaUrl(url: string) {
  try {
    const mediaUrl = new URL(url)

    return mediaUrl.hostname === "localhost" || mediaUrl.hostname === "127.0.0.1"
  } catch {
    return false
  }
}
