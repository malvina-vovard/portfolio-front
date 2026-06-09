import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExperienceCard } from "@/components/portfolio/experience-card"
import { experienceCategories, featuredExperiences } from "@/lib/portfolio/portfolio-data"

export function FeaturedExperiencesSection() {
  const previewExperiences = featuredExperiences.slice(0, 3)

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground">Projets selectionnes</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-normal">
              Trois portes d&apos;entree, une meme exigence.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/projets">
              Tous les projets
              <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {previewExperiences.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {experienceCategories.map((category) => {
            const Icon = category.icon

            return (
              <Card key={category.slug} className="rounded-[2rem]">
                <CardHeader>
                  <Icon aria-hidden="true" />
                  <CardDescription>{category.label}</CardDescription>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <p className="leading-7 text-muted-foreground">{category.description}</p>
                  <Button asChild variant="outline" className="w-fit">
                    <Link href={`/experiences/${category.slug}`}>
                      Explorer
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
