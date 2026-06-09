import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ExperienceCard } from "@/components/portfolio/experience-card"
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
    <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/">
              <ArrowLeftIcon data-icon="inline-start" />
              Retour
            </Link>
          </Button>
          <section className="grid gap-8 rounded-[2rem] bg-[var(--portfolio-secondary)] p-6 md:p-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="flex flex-col justify-between gap-10">
              <Icon aria-hidden="true" />
              <p className="text-sm text-muted-foreground">{category.label}</p>
            </div>
            <div className="flex max-w-3xl flex-col gap-5">
              <h1 className="font-heading text-5xl font-semibold tracking-normal">
                {category.title}
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                {category.description}
              </p>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.slug} experience={experience} />
            ))}
          </section>
        </div>
      </main>
  )
}
