import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Experience, ExperienceCategory } from "@/lib/portfolio/portfolio-data"

type ExperienceCategoryPageProps = {
  category: ExperienceCategory
  experiences: Experience[]
}

export function ExperienceCategoryPage({
  category,
  experiences,
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
          <Button
            asChild
            variant="ghost"
            className="mb-6 w-fit"
          >
            <Link href="/">
              <ArrowLeftIcon data-icon="inline-start" />
              Retour
            </Link>
          </Button>

          <div className="max-w-5xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <Icon aria-hidden="true" className="size-4 text-[var(--portfolio-hero-accent)]" />
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
          {experiences.map((experience, index) => (
            <ProjectFeatureCard
              key={experience.slug}
              experience={experience}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function ProjectFeatureCard({
  experience,
  isReversed,
}: {
  experience: Experience
  isReversed: boolean
}) {
  const projectHref = `/experiences/${experience.categorySlug}/${experience.slug}`

  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card shadow-[0_24px_70px_rgb(0_0_0/0.1)]">
      <div
        className={[
          "grid gap-0 lg:grid-cols-2",
          isReversed ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <Link href={projectHref} className="group block p-4 sm:p-6">
          <div className="overflow-hidden rounded-[1rem] border border-foreground/10 bg-background shadow-[0_18px_55px_rgb(0_0_0/0.12)]">
            <div className="flex h-10 items-center gap-2 border-b border-foreground/10 bg-muted px-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 h-5 flex-1 rounded-md bg-background" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={experience.imageUrl}
                alt={`Visuel du projet ${experience.client}`}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(0_0_0/0.35))]" />
            </div>
          </div>
        </Link>

        <div className="flex min-h-[28rem] flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-6 flex items-center justify-between gap-5">
              <span className="rounded-full border border-foreground/12 px-3 py-1 text-xs font-medium text-muted-foreground">
                {experience.period}
              </span>
            </div>

            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {experience.client}
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-5xl">
              {experience.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {experience.summary}
            </p>
          </div>

          <div className="mt-10">
            <div className="mb-7 flex flex-wrap gap-2">
              {[...experience.tools, ...experience.apps].slice(0, 6).map((tag) => (
                <Badge
                  key={`${experience.slug}-${tag}`}
                  variant="outline"
                  className="rounded-md border-foreground/10 bg-white px-3! py-4! text-sm leading-7 text-foreground/80 shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

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
