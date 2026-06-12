import type { ProjectCategory } from "@/types/project"

export function getProjectCategoryFromRoute(categorySlug: string) {
  const categoriesByRoute: Record<string, ProjectCategory> = {
    design: "design",
    "marketing-digital": "marketing_digital",
    marketing_digital: "marketing_digital",
    "site-web": "website",
    website: "website",
  }

  return categoriesByRoute[categorySlug] ?? null
}

export function getDisplayCategorySlugFromRoute(categorySlug: string) {
  const displaySlugByRoute: Record<string, string> = {
    design: "design",
    "marketing-digital": "marketing-digital",
    marketing_digital: "marketing-digital",
    "site-web": "site-web",
    website: "site-web",
  }

  return displaySlugByRoute[categorySlug] ?? categorySlug
}

export function getProjectCategoryRouteSlug(category: ProjectCategory) {
  const routeSlugByCategory: Record<ProjectCategory, string> = {
    design: "design",
    marketing_digital: "marketing-digital",
    website: "site-web",
  }

  return routeSlugByCategory[category]
}

export function getProjectRouteTitle(title: string) {
  return encodeURIComponent(title)
}

export function getProjectTitleFromRoute(slug: string) {
  return decodeURIComponent(slug).replaceAll("-", " ")
}
