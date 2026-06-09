import { notFound } from "next/navigation"

import { ExperienceDetailPage } from "@/components/portfolio/experience-detail-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  featuredExperiences,
  getCategoryBySlug,
  getExperienceBySlug,
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

export default async function ExperienceDetailRoute({
  params,
}: ExperienceDetailRouteProps) {
  const { category: categorySlug, slug } = await params
  const category = getCategoryBySlug(categorySlug)
  const experience = getExperienceBySlug(categorySlug, slug)

  if (!category || !experience) {
    notFound()
  }

  const configuration = await getAppConfiguration()

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <ExperienceDetailPage category={category} experience={experience} />
    </div>
  )
}
