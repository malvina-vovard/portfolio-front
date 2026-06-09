import { notFound } from "next/navigation"

import { ExperienceCategoryPage } from "@/components/portfolio/experience-category-page"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import {
  experienceCategories,
  getCategoryBySlug,
  getExperiencesByCategory,
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
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  const configuration = await getAppConfiguration()
  const experiences = getExperiencesByCategory(category.slug)

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <ExperienceCategoryPage category={category} experiences={experiences} />
    </div>
  )
}
