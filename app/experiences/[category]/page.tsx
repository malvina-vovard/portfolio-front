import { notFound } from "next/navigation"

import { ExperienceCategoryPage } from "@/components/portfolio/experience-category-page"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import {
  getDisplayCategorySlugFromRoute,
  getProjectCategoryFromRoute,
} from "@/lib/projects/categories"
import { getProjectsByCategory } from "@/lib/projects/get-project"
import {
  experienceCategories,
  getCategoryBySlug,
} from "@/lib/portfolio/portfolio-data"

type ExperienceCategoryRouteProps = {
  params: Promise<{
    category: string
  }>
}

export function generateStaticParams() {
  return experienceCategories.map((category) => ({
    category: category.slug,
  }))
}

export default async function ExperienceCategoryRoute({
  params,
}: ExperienceCategoryRouteProps) {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(getDisplayCategorySlugFromRoute(categorySlug))
  const projectCategory = getProjectCategoryFromRoute(categorySlug)

  if (!category || !projectCategory) {
    notFound()
  }

  const configuration = await getAppConfiguration()
  const projects = await getProjectsByCategory(projectCategory)

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <ExperienceCategoryPage category={category} projects={projects} />
    </div>
  )
}
