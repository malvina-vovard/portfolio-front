import { notFound } from "next/navigation"

import { ExperienceDetailPage } from "@/components/portfolio/experience-detail-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  getDisplayCategorySlugFromRoute,
  getProjectCategoryFromRoute,
  getProjectTitleFromRoute,
} from "@/lib/projects/categories"
import { getProjectByTitleAndCategory } from "@/lib/projects/get-project"
import {
  featuredExperiences,
  getCategoryBySlug,
} from "@/lib/portfolio/portfolio-data"

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

function getDisplayCategoryFromRoute(categorySlug: string) {
  return getCategoryBySlug(getDisplayCategorySlugFromRoute(categorySlug))
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
    getProjectTitleFromRoute(slug),
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
