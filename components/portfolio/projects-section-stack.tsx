"use client"

import { useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const cardOffsets = [
  { rotate: -4, x: -18, y: 10 },
  { rotate: 3, x: 16, y: -6 },
  { rotate: -1.5, x: 8, y: 18 },
  { rotate: 4.5, x: -10, y: -14 },
  { rotate: -3, x: 20, y: 12 },
]

const infoLayouts = [
  {
    positions: [
      { x: 230, y: -170 },
      { x: -270, y: -150 },
      { x: -245, y: 185 },
    ],
    rotations: ["rotate-[3deg]", "rotate-[-2deg]", "rotate-[-4deg]"],
  },
  {
    positions: [
      { x: -270, y: -170 },
      { x: 250, y: -150 },
      { x: 245, y: 185 },
    ],
    rotations: ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[4deg]"],
  },
  {
    positions: [
      { x: 250, y: 170 },
      { x: -270, y: 145 },
      { x: -245, y: -185 },
    ],
    rotations: ["rotate-[4deg]", "rotate-[-3deg]", "rotate-[2deg]"],
  },
  {
    positions: [
      { x: -270, y: 170 },
      { x: 250, y: 145 },
      { x: 245, y: -185 },
    ],
    rotations: ["rotate-[-4deg]", "rotate-[3deg]", "rotate-[-2deg]"],
  },
  {
    positions: [
      { x: 0, y: -235 },
      { x: -300, y: 30 },
      { x: 295, y: 50 },
    ],
    rotations: ["rotate-[2deg]", "rotate-[-4deg]", "rotate-[3deg]"],
  },
]

const INFO_LAYOUT_BASE_HEIGHT = 820
const INFO_LAYOUT_MIN_SCALE = 0.72

export type HomeProject = {
  category: string
  company: string
  href: string
  id: string
  imageAlt: string
  imageUrl: string | null
  period: string | null
  summary: string
  title: string
  tools: string[]
}

type ProjectStackProps = {
  projects: HomeProject[]
}

type ProjectInfoProps = {
  project: HomeProject
  index: number
}

type ProjectCardProps = {
  project: HomeProject
  index: number
  total: number
}

type ToolBadgeProps = {
  tool: string
}

type ProjectsSectionStackProps = {
  projects: HomeProject[]
}

export function ProjectsSectionStack({ projects }: ProjectsSectionStackProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stackProjects = useMemo(() => projects.slice(0, 5), [projects])

  useEffect(() => {
    if (stackProjects.length === 0) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: reduce), (max-width: 1023px)", () => {
        gsap.set(".project-stack-card, .project-stack-info", { clearProps: "all" })
      })

      media.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-stack-card")
        const infoGroups = gsap.utils.toArray<HTMLElement>(".project-stack-info")

        gsap.set(cards, { autoAlpha: 1, transformOrigin: "50% 55%" })
        gsap.set(infoGroups, { autoAlpha: 1 })
        gsap.set(".project-stack-info [data-info-part]", {
          autoAlpha: 0,
          scale: 0.82,
          x: 0,
          y: 0,
        })
        gsap.set(".project-stack-frame", { autoAlpha: 0, scale: 0.88, y: 96 })

        gsap.to(".project-stack-frame", {
          autoAlpha: 1,
          ease: "power2.out",
          scale: 1,
          scrollTrigger: {
            end: "top top",
            invalidateOnRefresh: true,
            scrub: 0.9,
            start: "top 88%",
            trigger: section,
          },
          y: 0,
        })

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            anticipatePin: 1,
            end: () => `+=${window.innerHeight * (stackProjects.length * 1.8)}`,
            invalidateOnRefresh: true,
            pin: true,
            scrub: 1.35,
            start: "top top",
            trigger: section,
          },
        })

        timeline.to({}, { duration: 0.55 })

        stackProjects.forEach((project, index) => {
          const infoGroup = infoGroups[index]
          const card = cards[index]
          const layout = infoLayouts[index % infoLayouts.length]

          timeline
            .to(
              infoGroup?.querySelectorAll("[data-info-part]") ?? [],
              {
                autoAlpha: 1,
                duration: 1.05,
                scale: () => getInfoLayoutScale(),
                stagger: 0.12,
                x: (partIndex) =>
                  (layout.positions[partIndex]?.x ?? 0) * getInfoLayoutScale(),
                y: (partIndex) =>
                  (layout.positions[partIndex]?.y ?? 0) * getInfoLayoutScale(),
              },
              index === 0 ? "+=0.22" : "+=0.08",
            )
            .to({}, { duration: 1.1 })

          if (index < stackProjects.length - 1) {
            timeline
              .to(infoGroup?.querySelectorAll("[data-info-part]") ?? [], {
                autoAlpha: 0,
                duration: 0.68,
                scale: 0.88,
                stagger: 0.07,
                x: 0,
                y: 0,
              })
              .to(
                card,
                {
                  autoAlpha: 0,
                  duration: 0.72,
                  rotate: index % 2 === 0 ? -14 : 13,
                  scale: 0.86,
                  yPercent: -95,
                },
                "<0.08",
              )
          } else {
            timeline.to(infoGroup?.querySelectorAll("[data-info-part]") ?? [], {
              duration: 0.62,
              scale: () => getInfoLayoutScale(),
            })
          }
        })
      })
    }, section)

    return () => context.revert()
  }, [stackProjects])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden rounded-b-[clamp(3rem,7vw,6.5rem)] bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-0"
    >
      <div className="mx-auto max-w-7xl lg:grid lg:min-h-screen lg:grid-rows-[auto_1fr] lg:py-8 lg:[@media(max-height:820px)]:py-4">
        <div className="mb-10 flex flex-col gap-5 lg:mb-0">
          <h2 className="bebas-neue-regular text-[clamp(5rem,15vw,13rem)] leading-[0.82] tracking-normal lg:[@media(max-height:820px)]:text-[clamp(4.2rem,11vw,8rem)]">
            Projets.
          </h2>
          <div className="flex justify-start md:justify-end">
            <Button asChild variant="outline" className="w-fit">
              <Link href="/projets">
                Tous les projets
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden min-h-0 place-items-center lg:grid">
          {stackProjects.length > 0 ? (
            <div className="project-stack-frame relative grid h-[min(34rem,calc(100vh-13rem))] min-h-[26rem] w-full max-w-5xl place-items-center">
              <ProjectStack projects={stackProjects} />
              {stackProjects.map((project, index) => (
                <ProjectInfo key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <EmptyFavoriteProjectsState />
          )}
        </div>

        <div className="grid gap-5 lg:hidden">
          {stackProjects.length > 0 ? (
            stackProjects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <EmptyFavoriteProjectsState />
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <div className="relative aspect-[4/5] w-[min(34vw,25rem,calc((100vh-18rem)*0.8))] min-w-[17rem]">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} total={projects.length} />
      ))}
    </div>
  )
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const offset = cardOffsets[index % cardOffsets.length]

  return (
    <div
      className="project-stack-card absolute inset-0 overflow-hidden rounded-[1.35rem] bg-muted shadow-[0_28px_80px_rgb(0_0_0/0.18)] ring-1 ring-foreground/10 will-change-transform"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg)`,
        zIndex: total - index,
      }}
    >
      {project.imageUrl ? (
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="32rem"
          className="object-cover"
          unoptimized={isLocalMediaUrl(project.imageUrl)}
        />
      ) : (
        <div className="grid h-full place-items-center px-6 text-center text-sm text-muted-foreground">
          Aucun visuel de couverture
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_56%,rgb(0_0_0/0.34))]" />
      <div className="absolute bottom-4 left-4 rounded-full bg-background/92 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  )
}

function ProjectInfo({ project, index }: ProjectInfoProps) {
  const layout = infoLayouts[index % infoLayouts.length]

  return (
    <div className="project-stack-info pointer-events-none absolute left-1/2 top-1/2 z-20">
      <div
        data-info-part
        className={`absolute left-0 top-0 w-72 origin-center -translate-x-1/2 -translate-y-1/2 ${layout.rotations[0]} rounded-[1rem] bg-[var(--portfolio-hero-accent)] px-5 py-4 text-white shadow-[0_20px_50px_color-mix(in_oklch,var(--portfolio-hero-accent),transparent_76%)] will-change-transform`}
      >
        <p className="mb-2 text-xs uppercase tracking-normal text-white/70">
          {project.category} / {project.company}
        </p>
        <h3 className="text-3xl font-semibold leading-[1.02] tracking-normal text-balance">
          {project.title}
        </h3>
        {project.period ? (
          <p className="mt-4 text-sm font-semibold text-white/80">
            {project.period}
          </p>
        ) : null}
      </div>

      <div
        data-info-part
        className={`absolute left-0 top-0 w-80 origin-center -translate-x-1/2 -translate-y-1/2 ${layout.rotations[1]} rounded-[1rem] border border-foreground/12 bg-background px-5 py-4 shadow-[0_18px_45px_rgb(0_0_0/0.1)] will-change-transform`}
      >
        <p className="max-w-full whitespace-pre-line text-base leading-7 [overflow-wrap:anywhere]">
          {project.summary}
        </p>
        <Button
          asChild
          className="pointer-events-auto mt-5 w-fit bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]"
        >
          <Link href={project.href} prefetch={false}>
            Voir le projet
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <div
        data-info-part
        className={`absolute left-0 top-0 flex w-80 origin-center -translate-x-1/2 -translate-y-1/2 ${layout.rotations[2]} flex-wrap gap-2 rounded-[1rem] border border-white/12 bg-[rgb(0_0_0/0.88)] p-4 text-white shadow-[0_18px_45px_rgb(0_0_0/0.22)] ring-1 ring-white/10 backdrop-blur will-change-transform`}
      >
        {project.tools.slice(0, 6).map((tool) => (
          <ToolBadge key={`${project.id}-${tool}`} tool={tool} />
        ))}
      </div>
    </div>
  )
}

function ToolBadge({ tool }: ToolBadgeProps) {
  return (
    <Badge
      variant="default"
      className="rounded-md border border-white/22 bg-white/14 px-3! py-4! text-sm leading-7 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]"
    >
      {tool}
    </Badge>
  )
}

function MobileProjectCard({ project, index }: ProjectInfoProps) {
  return (
    <article className="border-t border-foreground/15 py-8 last:border-b">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-muted">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 2rem), 1px"
            className="object-cover"
            unoptimized={isLocalMediaUrl(project.imageUrl)}
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center text-sm text-muted-foreground">
            Aucun visuel de couverture
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {project.company}
        </p>
        <h3 className="font-heading text-4xl font-semibold tracking-normal">{project.title}</h3>
        <p className="max-w-full whitespace-pre-line text-base leading-7 text-muted-foreground [overflow-wrap:anywhere]">
          {project.summary}
        </p>
        {project.tools.length > 0 ? (
          <div className="flex flex-wrap gap-2 rounded-[1rem] bg-[rgb(0_0_0/0.88)] p-4">
            {project.tools.slice(0, 6).map((tool) => (
              <ToolBadge key={`${project.id}-mobile-${tool}`} tool={tool} />
            ))}
          </div>
        ) : null}
        <Button asChild className="w-fit bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]">
          <Link href={project.href} prefetch={false}>
            Voir le projet
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </article>
  )
}

function EmptyFavoriteProjectsState() {
  return (
    <div className="w-full rounded-[1.25rem] border border-foreground/10 bg-card px-6 py-12 text-center shadow-[0_18px_55px_rgb(0_0_0/0.08)]">
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--portfolio-hero-accent)]">
        Selection
      </p>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
        Les projets favoris seront bientot disponibles.
      </p>
    </div>
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

function getInfoLayoutScale() {
  return gsap.utils.clamp(
    INFO_LAYOUT_MIN_SCALE,
    1,
    window.innerHeight / INFO_LAYOUT_BASE_HEIGHT,
  )
}
