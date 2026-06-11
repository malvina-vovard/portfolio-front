import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { experienceCategories, featuredExperiences, type Experience } from "@/lib/portfolio/portfolio-data"

export function AllProjectsPage() {
  return (
    <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-24 h-[28rem] w-[28rem] rounded-full border border-[2px] border-[var(--portfolio-hero-accent)]/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-9rem] top-[30rem] h-[20rem] w-[27rem] rotate-[-8deg] rounded-[4rem] border border-[2px] border-[var(--portfolio-hero-accent)]/30"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12">
        <Button asChild variant="ghost" className="w-fit">
          <Link href="/">
            <ArrowLeftIcon data-icon="inline-start" />
            Retour
          </Link>
        </Button>

        <section className="max-w-5xl border-l-4 border-[var(--portfolio-hero-accent)] pl-5 sm:pl-7">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Tous les projets
          </p>
          <h1 className="mt-4 bebas-neue-regular text-[clamp(5.5rem,14vw,13rem)] leading-[0.78] tracking-normal">
            Projets par expertise
          </h1>
        </section>

        {experienceCategories.map((category, categoryIndex) => {
          const Icon = category.icon
          const experiences = featuredExperiences.filter(
            (experience) => experience.categorySlug === category.slug,
          )

          return (
            <section
              key={category.slug}
              className="relative border-t border-foreground/12 pt-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full border border-[var(--portfolio-hero-accent)]/30 bg-[var(--portfolio-hero-accent)]/10 text-[var(--portfolio-hero-accent)]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--portfolio-hero-accent)]">
                    {category.label}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-balance sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {category.description}
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-fit border-[var(--portfolio-hero-accent)] bg-[var(--portfolio-hero-accent)] text-white shadow-[0_14px_34px_rgb(247_115_20/0.22)] hover:bg-[var(--portfolio-hero-accent)]/90 hover:text-white"
                >
                  <Link href={`/experiences/${category.slug}`}>
                    Voir la page
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {experiences.map((experience) => (
                  <AllProjectCard key={experience.slug} experience={experience} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

function AllProjectCard({ experience }: { experience: Experience }) {
  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card shadow-[0_18px_55px_rgb(0_0_0/0.08)] transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/experiences/${experience.categorySlug}/${experience.slug}`}
        className="block p-3"
      >
        <div className="relative aspect-[16/11] overflow-hidden rounded-[1rem] bg-muted">
          <Image
            src={experience.imageUrl}
            alt={`Visuel du projet ${experience.client}`}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgb(0_0_0/0.32))]" />
          <span className="absolute left-4 top-4 rounded-full bg-background/92 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur">
            {experience.period}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-7 pt-2">
        <div className="h-1 w-12 rounded-full bg-[var(--portfolio-hero-accent)]" />
        <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {experience.client}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-balance">
          {experience.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {experience.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[...experience.tools, ...experience.apps].slice(0, 6).map((tag) => (
            <Badge
              key={`${experience.slug}-${tag}`}
              variant="outline"
              className="h-auto rounded-md border-foreground/10 bg-white px-3! py-2! text-xs leading-5 text-foreground/80 shadow-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex justify-end pt-8">
          <Button asChild variant="outline" className="w-fit">
            <Link href={`/experiences/${experience.categorySlug}/${experience.slug}`}>
              Voir le projet
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
