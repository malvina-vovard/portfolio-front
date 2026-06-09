import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { penToolIcon, workTimelineItems } from "@/lib/portfolio/portfolio-data"

export function ProfessionalExperienceSection() {
  const PenToolIcon = penToolIcon

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardDescription>Experiences</CardDescription>
            <CardTitle>Des missions concretes, de la strategie a l&apos;execution.</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {workTimelineItems.map((item) => (
              <article
                key={`${item.title}-${item.period}`}
                className="rounded-[1.4rem] bg-muted p-5"
              >
                <Badge variant="secondary">{item.period}</Badge>
                <h3 className="mt-8 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.company}</p>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>

        <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-foreground p-8 text-background">
          <PenToolIcon aria-hidden="true" />
          <div className="absolute -bottom-10 -right-10 text-[10rem] font-semibold leading-none text-background/10">
            360
          </div>
          <div className="relative mt-24">
            <p className="text-sm text-background/65">Posture</p>
            <p className="mt-4 text-3xl font-medium leading-tight">
              Penser juste, produire propre, livrer utile.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
