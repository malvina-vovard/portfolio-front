"use client"

import { useEffect, useRef, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon, MailIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Badge } from "@/components/ui/badge"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { skillBadges } from "@/lib/portfolio/portfolio-data"
import type { AboutContent, ContactContent } from "@/types/home-content"

const PROFILE_IMAGE_URL = "/images/malvina4.jpeg"

const DEFAULT_ABOUT_DESCRIPTION =
  "J'accompagne les marques dans la construction d'une presence digitale claire: une strategie qui tient debout, des pages qui convertissent, et des visuels qui restent en tete."
const DEFAULT_ABOUT_TITLE = "Malvina, creatrice de projets digitaux"
const DEFAULT_ABOUT_SUBTITLE =
  "Strategie, design et contenus pour faire avancer une marque avec coherence."

type AboutSectionProps = {
  about: AboutContent
  contact: ContactContent
}

export function AboutSection({ about, contact }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const avatarUrl = about.avatarUrl ?? PROFILE_IMAGE_URL
  const tags = about.tags.length > 0 ? about.tags : skillBadges
  const emailHref = contact.email ? `mailto:${contact.email}` : "#contact"
  const linkedinHref = contact.linkedin ?? null

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
            ".about-gradient",
            ".about-watermark",
            ".about-card",
            ".about-portrait-image",
            ".about-description",
            ".about-divider",
          ],
          { clearProps: "all" },
        )
      })

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { duration: 0.9, ease: "power3.out" },
          scrollTrigger: {
            end: "top 18%",
            start: "top 72%",
            toggleActions: "play none none reverse",
            trigger: section,
          },
        })

        timeline
          .from(".about-watermark", { autoAlpha: 0, x: 80 }, 0)
          .from(
            ".about-card",
            {
              autoAlpha: 0,
              rotation: (index) => (index === 0 ? -2.5 : 2.5),
              stagger: 0.16,
              y: 72,
            },
            0.08,
          )
          .from(".about-description", { autoAlpha: 0, y: 24 }, 0.48)
          .from(".about-divider", { scaleX: 0, transformOrigin: "left center" }, 0.62)

        gsap.to(".about-gradient", {
          ease: "none",
          scale: 1.12,
          yPercent: -4,
          scrollTrigger: {
            end: "bottom top",
            scrub: true,
            start: "top bottom",
            trigger: section,
          },
        })

        gsap.to(".about-portrait-image", {
          ease: "none",
          yPercent: -9,
          scrollTrigger: {
            end: "bottom top",
            scrub: true,
            start: "top bottom",
            trigger: section,
          },
        })
      })
    }, section)

    return () => context.revert()
  }, [])

  const animateSurface = (event: MouseEvent<HTMLElement>, isEntering: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    gsap.to(event.currentTarget, {
      duration: 0.45,
      ease: "power3.out",
      filter: isEntering ? "drop-shadow(0 22px 28px rgb(0 0 0 / 0.24))" : "none",
      force3D: false,
      y: isEntering ? -6 : 0,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="relative w-full overflow-hidden bg-[#35373a] px-4 py-14 mt-5 sm:px-6 lg:px-8"
    >
      <BackgroundGradientAnimation
        interactive={false}
        gradientBackgroundStart="#000000"
        gradientBackgroundEnd="#050505"
        firstColor="var(--portfolio-hero-accent-rgb)"
        secondColor="var(--portfolio-hero-accent-rgb)"
        thirdColor="137, 147, 158"
        fourthColor="80, 80, 80"
        fifthColor="var(--portfolio-hero-accent-rgb)"
        pointerColor="137, 147, 158"
        size="50%"
        containerClassName="about-gradient absolute inset-0 h-full w-full opacity-80 will-change-transform"
      />
      <h1 className="about-watermark z-30 absolute bottom-0 right-5 bebas-neue-regular max-w-6xl text-[clamp(4.4rem,14.6vw,13.5rem)] leading-[0.82] tracking-normal text-white/30 will-change-transform">
        A propos.
      </h1>
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
        <Card
          className="about-card min-h-[32rem] rounded-[2rem] border border-white/12 bg-[rgb(0_0_0/0.5)] text-white shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur-xl will-change-transform lg:col-span-2"
          onMouseEnter={(event) => animateSurface(event, true)}
          onMouseLeave={(event) => animateSurface(event, false)}
        >
          <CardContent>
            <div className="relative min-h-96 overflow-hidden rounded-[1.4rem]">
              <Image
                src={avatarUrl}
                alt={about.avatarAlt ?? "Portrait editorial de Malvina"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={92}
                className="about-portrait-image scale-110 object-cover will-change-transform"
                unoptimized={isLocalMediaUrl(avatarUrl)}
              />
            </div>
          </CardContent>
          <div className="flex flex-col gap-1.5 px-(--card-spacing)">
            <CardTitle className="text-2xl">
              {about.title ?? DEFAULT_ABOUT_TITLE}
            </CardTitle>
            <CardDescription className="text-white/62">
              {about.subtitle ?? DEFAULT_ABOUT_SUBTITLE}
            </CardDescription>
          </div>
          <CardFooter className="flex flex-wrap gap-2">
            <Button asChild className="bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]">
              <Link href={emailHref}>
                <MailIcon data-icon="inline-start" />
                Contact
              </Link>
            </Button>
            {linkedinHref ? (
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/8 text-white hover:bg-white/14 hover:text-white"
              >
                <a href={linkedinHref} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon data-icon="inline-start" />
                  LinkedIn
                </a>
              </Button>
            ) : null}
          </CardFooter>
        </Card>

        <Card
          className="about-card rounded-[2rem] border border-white/12 bg-[rgb(0_0_0/0.5)] text-white shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur-xl will-change-transform lg:col-span-3"
          onMouseEnter={(event) => animateSurface(event, true)}
          onMouseLeave={(event) => animateSurface(event, false)}
        >
          <CardContent className="flex flex-col gap-8 ">
            <p className="about-description font-medium max-w-3xl whitespace-pre-line text-white/95 leading-6">
              {about.description ?? DEFAULT_ABOUT_DESCRIPTION}
            </p>
            <div className="about-divider h-[1px] w-full bg-white/10"></div>
            <div className="flex flex-wrap gap-2">
              {tags.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="text-sm bg-white/5 py-4! px-3! rounded-md text-white/95"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function isLocalMediaUrl(url: string) {
  try {
    const mediaUrl = new URL(url)

    return mediaUrl.hostname === "localhost" || mediaUrl.hostname === "127.0.0.1"
  } catch {
    return false
  }
}
