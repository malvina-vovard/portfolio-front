import { notFound } from "next/navigation"

import { ExperienceDetailPage } from "@/components/portfolio/experience-detail-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  getCategoryBySlug
} from "@/lib/portfolio/portfolio-data"
import {
  getDisplayCategorySlugFromRoute,
  getProjectCategoryFromRoute,
  getProjectTitleFromRoute
} from "@/lib/projects/categories"
import { getProjectByTitleAndCategory } from "@/lib/projects/get-project"
import { getJsonLd, getProjectMetadata } from "@/lib/seo"
import { getStrapiMediaUrl } from "@/lib/strapi/media"
import { richTextToPlainText } from "@/lib/strapi/rich-text"
import type { ProjectMedia, ProjectWithMedia } from "@/types/project"

export const dynamic = "force-dynamic"

type ExperienceDetailRouteProps = {
  params: Promise<{
    category: string
    slug: string
  }>
}

function getDisplayCategoryFromRoute(categorySlug: string) {
  return getCategoryBySlug(getDisplayCategorySlugFromRoute(categorySlug))
}

export async function generateMetadata({ params }: ExperienceDetailRouteProps) {
  const { category: categorySlug, slug } = await params
  const category = getDisplayCategoryFromRoute(categorySlug)
  const projectCategory = getProjectCategoryFromRoute(categorySlug)

  if (!category || !projectCategory) {
    return {}
  }

  const project = await getProjectForRoute(category.slug, slug, projectCategory)

  if (!project) {
    return {}
  }

  return getProjectMetadata({
    category,
    project,
    path: `/experiences/${category.slug}/${slug}`,
    image: getProjectLeadImage(project),
  })
}

export default async function ExperienceDetailRoute({
  params,
}: ExperienceDetailRouteProps) {
  const { category: categorySlug, slug } = await params
  const category = getDisplayCategoryFromRoute(categorySlug)
  const projectCategory = getProjectCategoryFromRoute(categorySlug)

  console.log("category : ",category);
  console.log("projectCategory : ",projectCategory);

  if (!category || !projectCategory) {
    console.log('404 car pas category ou projectCategory');
    notFound()
  }

  const project = await getProjectForRoute(category.slug, slug, projectCategory)
  console.log("project : ",project);
  console.log("category.slug : ",category.slug);
  console.log("projectCategory : ",projectCategory);
  
  if (!project) {
    console.log('404 car pas project');
    notFound()
  }

  const configuration = await getAppConfiguration()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.titre,
    description:
      (project.mini_description ?? richTextToPlainText(project.description)) ||
      `Projet ${project.titre} par Malvina`,
    creator: {
      "@type": "Person",
      name: "Malvina",
    },
    about: category.label,
    dateCreated: project.date,
    image: getProjectLeadImage(project),
  }

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(jsonLd) }}
      />
      <ExperienceDetailPage category={category} project={project} />
    </div>
  )
}

function getProjectLeadImage(project: ProjectWithMedia) {
  const media = project.ligne_medias
    ?.flatMap((row) => row.medias ?? [])
    .find((item) => item.mime?.startsWith("image/"))

  return getProjectMediaUrl(media)
}

async function getProjectForRoute(
  _categorySlug: string,
  slug: string,
  projectCategory: NonNullable<ReturnType<typeof getProjectCategoryFromRoute>>,
) {
  const decodedTitle = getProjectTitleFromRoute(slug)

  return getProjectByTitleAndCategory(decodedTitle, projectCategory)
}

function getProjectMediaUrl(media?: ProjectMedia | null) {
  if (!media) {
    return null
  }

  return getStrapiMediaUrl(
    media.formats?.large?.url ?? media.formats?.medium?.url ?? media.url,
  )
}
