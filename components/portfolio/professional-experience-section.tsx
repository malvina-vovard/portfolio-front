import { Timeline } from "@/components/ui/timeline"
import type { ProfessionalExperience } from "@/types/professional-experience"

type ProfessionalExperienceSectionProps = {
  experiences: ProfessionalExperience[]
}

export function ProfessionalExperienceSection({
  experiences,
}: ProfessionalExperienceSectionProps) {
  const timelineItems = experiences.map((item) => ({
    company: item.entreprise ?? "",
    period: formatExperiencePeriod(item.debut, item.fin),
    title: item.titre ?? "Experience professionnelle",
    content: (
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
        {item.description ?? "Description a venir."}
      </p>
    ),
  }))

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-12 lg:pt-16">
        <h2 className="bebas-neue-regular max-w-6xl text-[clamp(4.4rem,14.6vw,13.5rem)] leading-[0.82] tracking-normal text-[var(--portfolio-hero-accent)]">
          Expériences.
        </h2>
      </div>
      {timelineItems.length > 0 ? (
        <Timeline data={timelineItems} />
      ) : (
        <EmptyProfessionalExperiencesState />
      )}
    </section>
  )
}

function EmptyProfessionalExperiencesState() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
      <div className="rounded-[1.25rem] border border-foreground/10 bg-card px-6 py-10 shadow-[0_18px_55px_rgb(0_0_0/0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--portfolio-hero-accent)]">
          Parcours
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Les experiences professionnelles seront bientot disponibles.
        </p>
      </div>
    </div>
  )
}

function formatExperiencePeriod(start?: string | null, end?: string | null) {
  const formattedStart = formatExperienceDate(start)
  const formattedEnd = end ? formatExperienceDate(end) : "Aujourd'hui"

  if (!formattedStart) {
    return formattedEnd ?? "Periode a renseigner"
  }

  return `${formattedStart} - ${formattedEnd}`
}

function formatExperienceDate(value?: string | null) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
