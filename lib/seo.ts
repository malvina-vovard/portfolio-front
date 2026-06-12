import type { Metadata } from "next"

import type { ExperienceCategory } from "@/lib/portfolio/portfolio-data"
import type { ProjectWithCover, ProjectWithMedia } from "@/types/project"

export const siteName = "Portfolio Malvina"
export const authorName = "Malvina"
export const defaultTitle =
  "Malvina - Portfolio marketing digital, design et sites web"
export const defaultDescription =
  "Portfolio de Malvina, creatrice digitale specialisee en marketing digital, design, identite visuelle, contenus et sites web."
export const seoKeywords = [
  "Malvina",
  "portfolio marketing digital",
  "portfolio design",
  "creation site web",
  "strategie social media",
  "identite visuelle",
  "UX writing",
  "SEO",
]

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!configuredUrl) {
    return "http://localhost:3000"
  }

  const url = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`

  return url.replace(/\/$/, "")
}

export function getAbsoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${getSiteUrl()}${normalizedPath}`
}

export function getAbsoluteMediaUrl(url?: string | null) {
  if (!url) {
    return null
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  return getAbsoluteUrl(url)
}

export function getRouteMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  keywords = [],
}: {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
}): Metadata {
  const url = getAbsoluteUrl(path)
  const absoluteImage = getAbsoluteMediaUrl(image) ?? getAbsoluteUrl("/opengraph-image")

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  }
}

export function getCategoryMetadata(category: ExperienceCategory) {
  return getRouteMetadata({
    title: `${category.label} - Projets de Malvina`,
    description: `${category.description} Decouvrez les projets de Malvina en ${category.label.toLowerCase()}.`,
    path: `/experiences/${category.slug}`,
    keywords: [category.label, category.title],
  })
}

export function getProjectMetadata({
  category,
  project,
  path,
  image,
}: {
  category: ExperienceCategory
  project: ProjectWithCover | ProjectWithMedia
  path: string
  image?: string | null
}) {
  const description =
    project.mini_description ??
    project.description ??
    `Projet ${project.titre} par Malvina en ${category.label.toLowerCase()}.`

  return getRouteMetadata({
    title: `${project.titre} - ${category.label}`,
    description: truncateDescription(description),
    path,
    image: image ?? "/opengraph-image",
    keywords: [
      project.titre,
      category.label,
      project.sous_titre,
      project.outils,
    ].filter(Boolean) as string[],
  })
}

export function truncateDescription(description: string, maxLength = 158) {
  if (description.length <= maxLength) {
    return description
  }

  return `${description.slice(0, maxLength - 1).trimEnd()}...`
}

export function getJsonLd(payload: Record<string, unknown>) {
  return JSON.stringify(payload).replace(/</g, "\\u003c")
}
