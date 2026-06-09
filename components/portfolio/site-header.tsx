import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { portfolioNavigation } from "@/lib/portfolio/portfolio-data"

export function SiteHeader() {
  return (
    <header className="sticky top-0 isolate border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-lg font-semibold tracking-normal">
          Malvina
        </Link>
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {portfolioNavigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <nav aria-label="Navigation mobile" className="flex gap-1 overflow-x-auto md:hidden">
          {portfolioNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-3xl px-2 py-2 text-sm text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
