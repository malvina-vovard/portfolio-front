import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { educationIcon, formationItems } from "@/lib/portfolio/portfolio-data"

export function FormationSection() {
  const EducationIcon = educationIcon

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="flex min-h-80 flex-col justify-between rounded-[2rem] bg-[var(--portfolio-primary)] p-8 text-primary-foreground">
          <EducationIcon aria-hidden="true" />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-primary-foreground/70">Formations</p>
            <h2 className="font-heading text-4xl font-semibold tracking-normal">
              Les bases strategiques et creatives.
            </h2>
          </div>
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardDescription>Parcours academique</CardDescription>
            <CardTitle>Une formation hybride: marketing, design et digital.</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {formationItems.map((item) => (
              <article key={`${item.title}-${item.period}`} className="flex flex-col gap-4">
                <div className="grid gap-2 md:grid-cols-[0.6fr_1fr]">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.school} · {item.period}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Separator />
              </article>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
