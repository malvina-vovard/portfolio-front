import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ExperienceCard } from "@/components/portfolio/experience-card"
import { SiteHeader } from "@/components/portfolio/site-header"
import { experienceCategories, featuredExperiences } from "@/lib/portfolio/portfolio-data"

export function AllProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/">
              <ArrowLeftIcon data-icon="inline-start" />
              Retour
            </Link>
          </Button>
          <section className="rounded-[2rem] bg-[var(--portfolio-primary)] p-6 text-primary-foreground md:p-10">
            <p className="text-sm text-primary-foreground/70">Tous les projets</p>
            <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold tracking-normal">
              Les projets non affiches en home, classes par expertise.
            </h1>
          </section>

          {experienceCategories.map((category) => {
            const experiences = featuredExperiences.filter(
              (experience) => experience.categorySlug === category.slug,
            )

            return (
              <section key={category.slug} className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{category.label}</p>
                    <h2 className="font-heading text-3xl font-semibold tracking-normal">
                      {category.title}
                    </h2>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/experiences/${category.slug}`}>Voir la page</Link>
                  </Button>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {experiences.map((experience) => (
                    <ExperienceCard key={experience.slug} experience={experience} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}
