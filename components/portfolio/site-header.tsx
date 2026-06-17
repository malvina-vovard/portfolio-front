"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { portfolioNavigation } from "@/lib/portfolio/portfolio-data"
import { cn } from "@/lib/utils"

const normalizePathname = (pathname: string | null) => {
  if (!pathname || pathname === "/") {
    return "/"
  }

  return pathname.replace(/\/+$/, "")
}

const isNavItemActive = (href: string, pathname: string) => {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [clientPathname, setClientPathname] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const lastScrollYRef = useRef(0)
  const scrollDeltaRef = useRef(0)
  const [activePill, setActivePill] = useState({ left: 0, width: 0, ready: false })
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const activePathname = clientPathname ? normalizePathname(clientPathname) : null

  const activeIndex = activePathname
    ? portfolioNavigation.findIndex((item) => isNavItemActive(item.href, activePathname))
    : -1

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setClientPathname(pathname)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [pathname])

  useLayoutEffect(() => {
    const updateActivePill = () => {
      if (!navRef.current || activeIndex < 0) {
        setActivePill((pill) => ({ ...pill, ready: false }))
        return
      }

      const activeLink = linkRefs.current[activeIndex]

      if (!activeLink) {
        return
      }

      setActivePill({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        ready: true,
      })
    }

    updateActivePill()

    const frameId = window.requestAnimationFrame(updateActivePill)
    window.addEventListener("resize", updateActivePill)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener("resize", updateActivePill)
    }
  }, [activeIndex])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollYRef.current

      if (currentScrollY < 24) {
        scrollDeltaRef.current = 0
        setIsHeaderHidden(false)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (scrollDifference > 0) {
        scrollDeltaRef.current = Math.max(0, scrollDeltaRef.current) + scrollDifference

        if (scrollDeltaRef.current > 28 && currentScrollY > 96) {
          setIsHeaderHidden(true)
        }
      } else if (scrollDifference < 0) {
        scrollDeltaRef.current = Math.min(0, scrollDeltaRef.current) + scrollDifference

        if (Math.abs(scrollDeltaRef.current) > 6) {
          setIsHeaderHidden(false)
        }
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 isolate z-40 border-b bg-background/85 backdrop-blur transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:border-b-0 md:bg-transparent md:backdrop-blur-none",
        isHeaderHidden && "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8 md:justify-center">
        <LiquidGlassNavFilter />

        <nav aria-label="Navigation principale" className="liquid-glass-nav absolute left-1/2 hidden -translate-x-1/2 rounded-full md:block">
          <div
            className="liquid-glass-nav__refract"
            style={{
              backdropFilter:
                "blur(16px) url(#liquid-glass-nav-filter) brightness(1.08) saturate(1.55)",
              WebkitBackdropFilter:
                "blur(16px) url(#liquid-glass-nav-filter) brightness(1.08) saturate(1.55)",
            }}
            aria-hidden="true"
          />
          <div className="liquid-glass-nav__tint" aria-hidden="true" />
          <div className="liquid-glass-nav__specular" aria-hidden="true" />
          <div
            ref={navRef}
            className="liquid-glass-nav__content flex items-center gap-1 p-1.5"
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-1.5 bottom-1.5 rounded-full bg-black shadow-[inset_0_1px_0_rgb(255_255_255/0.22)] transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                activePill.ready ? "opacity-100" : "opacity-0"
              )}
              style={{
                left: activePill.left,
                width: activePill.width,
              }}
            />
            {portfolioNavigation.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <Link
                  key={item.href}
                  ref={(node) => {
                    linkRefs.current[index] = node
                  }}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive}
                  className={cn(
                    "relative z-10 flex h-10 items-center rounded-full px-4 text-sm font-medium text-foreground/72 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-foreground/20",
                    isActive && "text-white hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="md:hidden"
              aria-label="Ouvrir le menu"
              onClick={(event) => event.currentTarget.blur()}
            >
              <MenuIcon data-icon="inline-start" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="data-[vaul-drawer-direction=right]:w-[80vw] data-[vaul-drawer-direction=right]:sm:max-w-none p-3 before:bg-background/88 before:backdrop-blur-xl">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription className="sr-only">
                Liens principaux du portfolio.
              </DrawerDescription>
            </DrawerHeader>
            <nav aria-label="Navigation mobile" className="flex flex-col gap-2 px-4 py-6">
              {portfolioNavigation.map((item) => {
                const isActive = activePathname
                  ? isNavItemActive(item.href, activePathname)
                  : false

                return (
                  <DrawerClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive}
                      className={cn(
                        "rounded-3xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        "data-[active=true]:bg-foreground data-[active=true]:text-background data-[active=true]:hover:bg-foreground data-[active=true]:hover:text-background"
                      )}
                    >
                      {item.label}
                    </Link>
                  </DrawerClose>
                )
              })}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}

function LiquidGlassNavFilter() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      className="pointer-events-none absolute overflow-hidden"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="liquid-glass-nav-filter"
          colorInterpolationFilters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feImage
            result="dispMap"
            x="0"
            y="0"
            width="432"
            height="52"
            preserveAspectRatio="none"
            href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'360'%20height%3D'60'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'gx'%20x1%3D'0%25'%20y1%3D'0%25'%20x2%3D'100%25'%20y2%3D'0%25'%3E%3Cstop%20offset%3D'0%25'%20stop-color%3D'%23000'%2F%3E%3Cstop%20offset%3D'100%25'%20stop-color%3D'%23f00'%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D'gy'%20x1%3D'0%25'%20y1%3D'0%25'%20x2%3D'0%25'%20y2%3D'100%25'%3E%3Cstop%20offset%3D'0%25'%20stop-color%3D'%23000'%2F%3E%3Cstop%20offset%3D'100%25'%20stop-color%3D'%230f0'%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D'b'%3E%3CfeGaussianBlur%20stdDeviation%3D'7'%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Crect%20width%3D'360'%20height%3D'60'%20rx%3D'30'%20fill%3D'url(%23gx)'%20style%3D'mix-blend-mode%3Ascreen'%2F%3E%3Crect%20width%3D'360'%20height%3D'60'%20rx%3D'30'%20fill%3D'url(%23gy)'%20style%3D'mix-blend-mode%3Ascreen'%2F%3E%3Crect%20width%3D'360'%20height%3D'60'%20rx%3D'30'%20fill%3D'%23808080'%20filter%3D'url(%23b)'%2F%3E%3C%2Fsvg%3E"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="dispMap"
            scale="-28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
