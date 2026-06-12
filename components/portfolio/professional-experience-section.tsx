import { Timeline } from "@/components/ui/timeline"
import { workTimelineItems } from "@/lib/portfolio/portfolio-data"

export function ProfessionalExperienceSection() {
  const timelineItems = workTimelineItems.map((item) => ({
    company: item.company,
    period: item.period,
    title: item.title,
    content: (
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
        {item.description}
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
      <Timeline
        data={timelineItems}
      />
    </section>
  )
}
