import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { homeHighlights } from "@/lib/portfolio/portfolio-data"

const HERO_BACKGROUND_IMAGE_URL = "/images/hero-chrome-background.png"

export function HeroSection() {
  return (
    <section
      className="relative h-[calc(100svh-5rem)] overflow-hidden bg-background bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE_URL})` }}
    >
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgb(255_255_255/0.84),transparent_34%),linear-gradient(90deg,rgb(255_255_255/0.88)_0%,rgb(255_255_255/0.34)_48%,rgb(255_255_255/0.82)_100%)]" /> */}
      <div className="portfolio-grid-background absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] py-5 md:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4 ">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-[var(--portfolio-hero-accent)] text-white" variant="secondary">
              Portfolio
            </Badge>
            
          </div>

         
        </div>

        <div className="grid min-h-0 items-end gap-6 py-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,0.5fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="plus-jakarta-sans-portfolio mb-2 text-sm font-semibold uppercase tracking-normal text-foreground/65 sm:text-base">
              Malvina Vovard
            </p>
            <h1 className="bebas-neue-regular max-w-6xl text-[clamp(4.4rem,14.6vw,13.5rem)] leading-[0.82] tracking-normal text-balance">
              Marketing, web et design.
            </h1>
          </div>

          <div className="grid w-full max-w-xl gap-4 justify-self-start lg:justify-self-end">
    

            <div className="grid grid-cols-3 gap-2">
              {homeHighlights.map((highlight) => {
                const Icon = highlight.icon

                return (
                  <div
                    key={highlight.label}
                    className="rounded-3xl bg-background/76 p-3 shadow-sm backdrop-blur"
                  >
                    <Icon className="mb-8" aria-hidden="true" />
                    <p className="text-xs text-muted-foreground">{highlight.label}</p>
                    <p className="text-sm font-medium">{highlight.value}</p>
                  </div>
                )
              })}
            </div>

            <Link
              href="/projets"
              className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[var(--portfolio-hero-accent)] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--portfolio-hero-accent)]/30"
            >
              Voir tous les projets
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

       
      </div>
    </section>
  )
}
