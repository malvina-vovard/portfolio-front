import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { homeHighlights } from "@/lib/portfolio/portfolio-data"

const HERO_BACKGROUND_IMAGE_URL = "/images/hero-chrome-background.png"

export function HeroSection() {
  return (
    <section
      className="relative h-[calc(100svh-5rem)] overflow-hidden bg-background bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE_URL})` }}
    >
      {/* <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.1)_0%,rgb(255_255_255/0.6k)_36%,rgb(255_255_255/0.1)_72%,rgb(255_255_255/0)_100%)]" /> */}
      <div className="portfolio-grid-background absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between py-8 md:py-10">
        <Badge className="w-fit bg-[var(--portfolio-hero-accent)] text-white" variant="secondary">
          Portfolio
        </Badge>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div className="flex max-w-3xl flex-col gap-6">
            <div
              className="rounded-3xl px-6 py-3 shadow-sm backdrop-blur"
            >
              <h1 className="font-heading text-5xl md:text-7xl font-semibold leading-none tracking-normal text-balance  ">
                Marketing, web et design pour marques qui veulent respirer.
              </h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-foreground/70 sm:text-lg">
              Une selection de projets entre strategie digitale, sites web et
              univers visuels, pour donner plus de clarte aux marques.
            </p>
            <Button
              asChild
              size="lg"
              className="w-fit bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]"
            >
              <Link href="/projets">
                Voir tous les projets
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <div className="ml-auto grid w-full max-w-xl grid-cols-3 gap-2">
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
        </div>
        <div aria-hidden="true" />
      </div>
    </section>
  )
}
