"use client"

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react"
import React, { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  company: string
  period: string
  title: string
  content: React.ReactNode
}

type TimelineProps = {
  data: TimelineEntry[]
  title?: string
}

export const Timeline = ({ data, title }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 45%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full overflow-hidden bg-background font-sans"
      ref={containerRef}
    >
      

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="relative grid gap-5 py-8 pl-10 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-8 md:py-12 md:pl-0"
            initial={{ opacity: 0, y: 42 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.36, once: false }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="md:pr-4 md:text-right">
              <p className="text-sm font-semibold uppercase tracking-normal text-[var(--portfolio-hero-accent)]">
                {item.period}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
                {item.company}
              </p>
            </div>

            <div aria-hidden="true" className="hidden md:block" />

            <div className="relative md:pl-0">
              {item.content}
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="pointer-events-none absolute left-6 top-8 z-0 w-[2px] overflow-visible md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-[var(--portfolio-hero-accent)] shadow-[0_0_22px_color-mix(in_oklch,var(--portfolio-hero-accent),transparent_34%)]"
          >
            <motion.div
              style={{ opacity: opacityTransform }}
              className="absolute left-1/2 top-full size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--portfolio-hero-accent)] shadow-[0_0_28px_color-mix(in_oklch,var(--portfolio-hero-accent),transparent_18%)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
