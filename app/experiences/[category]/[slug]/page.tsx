import { notFound } from "next/navigation"

import { ExperienceDetailPage } from "@/components/portfolio/experience-detail-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import { getProjectByTitleAndCategory } from "@/lib/projects/get-project"
import {
  featuredExperiences,
  getCategoryBySlug,
} from "@/lib/portfolio/portfolio-data"
import type { ProjectCategory } from "@/types/project"

type ExperienceDetailRouteProps = {
  params: Promise<{
    category: string
    slug: string
  }>
}

export function generateStaticParams() {
  return featuredExperiences.map((experience) => ({
    category: experience.categorySlug,
    slug: experience.slug,
  }))
}

function getProjectCategoryFromRoute(categorySlug: string): ProjectCategory | null {
  const categoriesByRoute: Record<string, ProjectCategory> = {
    design: "design",
    "marketing-digital": "marketing_digital",
    marketing_digital: "marketing_digital",
    "site-web": "website",
    website: "website",
  }

  return categoriesByRoute[categorySlug] ?? null
}

function getDisplayCategoryFromRoute(categorySlug: string) {
  const displaySlugByRoute: Record<string, string> = {
    design: "design",
    "marketing-digital": "marketing-digital",
    marketing_digital: "marketing-digital",
    "site-web": "site-web",
    website: "site-web",
  }

  return getCategoryBySlug(displaySlugByRoute[categorySlug] ?? categorySlug)
}

function getProjectTitleFromSlug(slug: string) {
  return decodeURIComponent(slug).replaceAll("-", " ")
}

export default async function ExperienceDetailRoute({
  params,
}: ExperienceDetailRouteProps) {
  const { category: categorySlug, slug } = await params
  const category = getDisplayCategoryFromRoute(categorySlug)
  const projectCategory = getProjectCategoryFromRoute(categorySlug)

  if (!category || !projectCategory) {
    notFound()
  }

  const project = await getProjectByTitleAndCategory(
    getProjectTitleFromSlug(slug),
    projectCategory,
  )


  if (!project) {
    notFound()
  }

  const configuration = await getAppConfiguration()

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <ExperienceDetailPage category={category} project={project} />
    </div>
  )
}
