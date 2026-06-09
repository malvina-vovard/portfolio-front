import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Experience } from "@/lib/portfolio/portfolio-data"

type ExperienceCardProps = {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="rounded-[2rem] [--card-spacing:--spacing(3)]">
      <CardContent>
        <div className="relative min-h-72 overflow-hidden rounded-[1.4rem]">
          <Image
            src={experience.imageUrl}
            alt={`Visuel du projet ${experience.client}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardDescription>
          {experience.client} · {experience.period}
        </CardDescription>
        <CardTitle className="text-2xl">{experience.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-7 text-muted-foreground">{experience.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.tools.slice(0, 3).map((tool) => (
            <Badge key={tool} variant="secondary">
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={`/experiences/${experience.categorySlug}/${experience.slug}`}>
            Voir l&apos;experience
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
