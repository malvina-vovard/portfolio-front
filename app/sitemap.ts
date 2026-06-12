import type { MetadataRoute } from "next"

import {
  experienceCategories,
  featuredExperiences,
} from "@/lib/portfolio/portfolio-data"
import { getProjectCategoryFromRoute, getProjectRouteTitle } from "@/lib/projects/categories"
import { getProjectsByCategory } from "@/lib/projects/get-project"
import { getAbsoluteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: [getAbsoluteUrl("/opengraph-image")],
    },
    {
      url: getAbsoluteUrl("/projets"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [getAbsoluteUrl("/opengraph-image")],
    },
    ...experienceCategories.map((category) => ({
      url: getAbsoluteUrl(`/experiences/${category.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ]

  const cmsProjects = (
    await Promise.all(
      experienceCategories.map(async (category) => {
        const projectCategory = getProjectCategoryFromRoute(category.slug)

        if (!projectCategory) {
          return []
        }

        const projects = await getProjectsByCategory(projectCategory)

        return projects.map((project) => ({
          url: getAbsoluteUrl(
            `/experiences/${category.slug}/${getProjectRouteTitle(project.titre)}`,
          ),
          lastModified: project.date ? new Date(project.date) : now,
          changeFrequency: "monthly" as const,
          priority: 0.75,
        }))
      }),
    )
  ).flat()

  const fallbackProjects = featuredExperiences.map((experience) => ({
    url: getAbsoluteUrl(`/experiences/${experience.categorySlug}/${experience.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [experience.imageUrl],
  }))

  const routesByUrl = new Map<string, MetadataRoute.Sitemap[number]>()

  for (const route of [...staticRoutes, ...fallbackProjects, ...cmsProjects]) {
    routesByUrl.set(route.url, route)
  }

  return Array.from(routesByUrl.values())
}
