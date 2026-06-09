import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ImageIcon, VideoIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Experience, ExperienceCategory } from "@/lib/portfolio/portfolio-data"

type ExperienceDetailPageProps = {
  category: ExperienceCategory
  experience: Experience
}

export function ExperienceDetailPage({
  category,
  experience,
}: ExperienceDetailPageProps) {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
        <article className="mx-auto flex max-w-7xl flex-col gap-6">
          <Button asChild variant="ghost" className="w-fit">
            <Link href={`/experiences/${category.slug}`}>
              <ArrowLeftIcon data-icon="inline-start" />
              {category.label}
            </Link>
          </Button>

          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-card p-4 shadow-md ring-1 ring-foreground/5">
              <div className="relative min-h-[calc(34rem-2rem)] overflow-hidden rounded-[1.4rem]">
              <Image
                src={experience.imageUrl}
                alt={`Image principale du projet ${experience.client}`}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              </div>
            </div>
            <Card className="justify-between rounded-[2rem]">
              <CardHeader>
                <CardDescription>
                  {category.label} · {experience.period}
                </CardDescription>
                <CardTitle className="text-5xl leading-none">
                  {experience.client}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                <h1 className="text-2xl font-medium">{experience.title}</h1>
                <p className="text-lg leading-8 text-muted-foreground">
                  {experience.summary}
                </p>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <MetadataGroup title="Outils" values={experience.tools} />
                  <MetadataGroup title="Apps" values={experience.apps} />
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <Card className="rounded-[2rem] bg-[var(--portfolio-secondary)]">
              <CardHeader>
                <CardDescription>Galerie projet</CardDescription>
                <CardTitle>Texte, outils, images et videos.</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground">
                <p>
                  Les supports du projet rassemblent le contexte, les choix creatifs,
                  les outils mobilises et les medias les plus representatifs.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    <ImageIcon data-icon="inline-start" />
                    Image
                  </Badge>
                  <Badge variant="outline">
                    <VideoIcon data-icon="inline-start" />
                    Video
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardDescription>Recit projet</CardDescription>
                <CardTitle>Approche</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {experience.content.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          </section>
        </article>
      </main>
  )
}

function MetadataGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} variant="secondary">
            {value}
          </Badge>
        ))}
      </div>
    </div>
  )
}
