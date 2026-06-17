"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type AboutGradientBubblesProps = {
  backgroundStart?: string
  backgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  className?: string
  opacity?: number
}

type BubbleConfig = {
  colorIndex: number
  x: number
  y: number
  radius: number
  orbitX: number
  orbitY: number
  speed: number
  phase: number
  alpha: number
}

const BUBBLES: BubbleConfig[] = [
  { colorIndex: 0, x: 0.32, y: 0.24, radius: 0.19, orbitX: 0.13, orbitY: 0.12, speed: 0.32, phase: 0.2, alpha: 0.54 },
  { colorIndex: 1, x: 0.68, y: 0.34, radius: 0.16, orbitX: 0.12, orbitY: 0.1, speed: 0.28, phase: 2.1, alpha: 0.46 },
  { colorIndex: 2, x: 0.5, y: 0.68, radius: 0.18, orbitX: 0.1, orbitY: 0.1, speed: 0.24, phase: 3.2, alpha: 0.36 },
  { colorIndex: 3, x: 0.2, y: 0.72, radius: 0.14, orbitX: 0.09, orbitY: 0.08, speed: 0.3, phase: 4.3, alpha: 0.3 },
  { colorIndex: 4, x: 0.82, y: 0.74, radius: 0.21, orbitX: 0.11, orbitY: 0.1, speed: 0.22, phase: 5.4, alpha: 0.42 },
]

const MOBILE_MAX_DPR = 1.25
const DESKTOP_MAX_DPR = 1.5
const TARGET_FRAME_MS = 1000 / 30

export function AboutGradientBubbles({
  backgroundStart = "#000000",
  backgroundEnd = "#050505",
  firstColor = "247, 115, 20",
  secondColor = "247, 115, 20",
  thirdColor = "137, 147, 158",
  fourthColor = "80, 80, 80",
  fifthColor = "247, 115, 20",
  className,
  opacity = 0.8,
}: AboutGradientBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) {
      return
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    })

    if (!context) {
      return
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const colors = [firstColor, secondColor, thirdColor, fourthColor, fifthColor].map(
      (color) => resolveRgbTriplet(color, container),
    )
    let animationFrameId = 0
    let isVisible = false
    let lastDrawTime = 0
    let reducedMotion = motionQuery.matches
    let width = 0
    let height = 0
    let dpr = 1

    const draw = (timestamp = 0) => {
      if (!width || !height) {
        return
      }

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = "screen"

      const elapsed = reducedMotion ? 0 : timestamp / 1000
      const scale = Math.max(width, height)

      for (const bubble of BUBBLES) {
        const x =
          width * bubble.x +
          Math.cos(elapsed * bubble.speed + bubble.phase) * width * bubble.orbitX
        const y =
          height * bubble.y +
          Math.sin(elapsed * bubble.speed + bubble.phase) * height * bubble.orbitY
        const radius = scale * bubble.radius
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
        const color = colors[bubble.colorIndex]

        gradient.addColorStop(0, `rgba(${color}, ${bubble.alpha})`)
        gradient.addColorStop(0.42, `rgba(${color}, ${bubble.alpha * 0.64})`)
        gradient.addColorStop(0.74, `rgba(${color}, ${bubble.alpha * 0.18})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }

      context.globalCompositeOperation = "source-over"
    }

    const animate = (timestamp: number) => {
      if (!isVisible || reducedMotion) {
        return
      }

      if (timestamp - lastDrawTime >= TARGET_FRAME_MS) {
        draw(timestamp)
        lastDrawTime = timestamp
      }

      animationFrameId = window.requestAnimationFrame(animate)
    }

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrameId)
      animationFrameId = 0
    }

    const startAnimation = () => {
      stopAnimation()
      draw()

      if (!reducedMotion && isVisible) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(
        window.devicePixelRatio || 1,
        width < 768 ? MOBILE_MAX_DPR : DESKTOP_MAX_DPR,
      )

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting

        if (isVisible) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { rootMargin: "240px 0px" },
    )
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      startAnimation()
    }

    resizeObserver.observe(container)
    intersectionObserver.observe(container)
    motionQuery.addEventListener("change", handleMotionChange)
    resize()
    draw()

    return () => {
      stopAnimation()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      motionQuery.removeEventListener("change", handleMotionChange)
    }
  }, [firstColor, fifthColor, fourthColor, secondColor, thirdColor])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{
        background: `linear-gradient(40deg, ${backgroundStart}, ${backgroundEnd})`,
        opacity,
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}

function resolveRgbTriplet(color: string, element: HTMLElement) {
  const trimmedColor = color.trim()
  const cssVariableMatch = /^var\((--[^),\s]+)(?:,[^)]+)?\)$/.exec(trimmedColor)

  if (!cssVariableMatch) {
    return trimmedColor
  }

  return (
    getComputedStyle(element).getPropertyValue(cssVariableMatch[1]).trim() ||
    trimmedColor
  )
}
