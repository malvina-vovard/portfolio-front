"use client"

import { useEffect, useRef, type MouseEvent } from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Badge } from "@/components/ui/badge"
import { homeHighlights } from "@/lib/portfolio/portfolio-data"

const HERO_BACKGROUND_IMAGE_URL = "/images/hero-chrome-background.png"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-background-layer",
            ".hero-grid-background",
            ".hero-badge",
            ".hero-eyebrow",
            ".hero-title",
            ".hero-highlight-card",
            ".hero-cta",
          ],
          { clearProps: "all" },
        )
      })

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { duration: 0.85, ease: "power3.out" },
        })

        timeline
          .fromTo(
            ".hero-background-layer",
            { filter: "blur(8px)", scale: 1.08 },
            { filter: "blur(0px)", scale: 1, duration: 1.4, ease: "power2.out" },
          )
          .from(".hero-grid-background", { autoAlpha: 0, scale: 1.04, duration: 1 }, 0.08)
          .from(".hero-badge", { scale: 0.94, y: 8 }, 0.16)
          .from(".hero-eyebrow", { autoAlpha: 0, y: 20 }, 0.32)
          .fromTo(
            ".hero-title",
            { clipPath: "inset(0 0 24% 0)", y: 18 },
            { clipPath: "inset(0 0 0% 0)", duration: 0.95, y: 0 },
            0.42,
          )
          .from(
            ".hero-highlight-card",
            {
              autoAlpha: 0,
              rotation: -4,
              stagger: 0.08,
              y: 42,
            },
            0.78,
          )
          .from(".hero-cta", { autoAlpha: 0, scale: 0.88, y: 18 }, 1)

        gsap.to(".hero-background-layer", {
          ease: "none",
          scale: 1.08,
          scrollTrigger: {
            end: "bottom top",
            scrub: true,
            start: "top top",
            trigger: section,
          },
        })

        gsap.to(".hero-grid-background", {
          ease: "none",
          yPercent: -10,
          scrollTrigger: {
            end: "bottom top",
            scrub: true,
            start: "top top",
            trigger: section,
          },
        })
      })
    }, section)

    return () => context.revert()
  }, [])

  const animateHighlightCard = (event: MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    gsap.to(event.currentTarget, {
      duration: 0.42,
      ease: "power3.out",
      rotation: isEntering ? 1.4 : 0,
      scale: isEntering ? 1.035 : 1,
      y: isEntering ? -8 : 0,
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh-5rem)] overflow-hidden bg-background px-4 sm:px-6 lg:px-8"
    >
      <div
        className="hero-background-layer absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE_URL})` }}
        aria-hidden="true"
      />
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgb(255_255_255/0.84),transparent_34%),linear-gradient(90deg,rgb(255_255_255/0.88)_0%,rgb(255_255_255/0.34)_48%,rgb(255_255_255/0.82)_100%)]" /> */}
      <div className="hero-grid-background portfolio-grid-background absolute inset-0 opacity-60 will-change-transform" />

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] py-5 md:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4 ">
          <div className="flex flex-col gap-3">
            <Badge className="hero-badge w-fit bg-[var(--portfolio-hero-accent)] text-white" variant="secondary">
              Portfolio
            </Badge>
            
          </div>

         
        </div>

        <div className="grid min-h-0 items-end gap-6 py-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,0.5fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="hero-eyebrow plus-jakarta-sans-portfolio mb-2 text-sm font-semibold uppercase tracking-normal text-foreground/65 sm:text-base">
              Malvina Vovard
            </p>
            <h1 className="hero-title bebas-neue-regular max-w-6xl text-[clamp(4.4rem,14.6vw,13.5rem)] leading-[0.82] tracking-normal text-balance will-change-transform">
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
                    className="hero-highlight-card rounded-3xl bg-background/76 p-3 shadow-sm backdrop-blur will-change-transform"
                    onMouseEnter={(event) => animateHighlightCard(event, true)}
                    onMouseLeave={(event) => animateHighlightCard(event, false)}
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
              className="hero-cta inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[var(--portfolio-hero-accent)] px-5 text-sm font-bold text-white transition-colors hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--portfolio-hero-accent)]/30"
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
