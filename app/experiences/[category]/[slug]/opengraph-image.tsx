import { ImageResponse } from "next/og"

import {
  getDisplayCategorySlugFromRoute,
  getProjectCategoryFromRoute,
  getProjectTitleFromRoute,
} from "@/lib/projects/categories"
import { getProjectByTitleAndCategory } from "@/lib/projects/get-project"
import { getProjectPreviewImageUrl } from "@/lib/projects/project-media"
import { getCategoryBySlug } from "@/lib/portfolio/portfolio-data"
import { authorName, siteName, truncateDescription } from "@/lib/seo"
import { richTextToPlainText } from "@/lib/strapi/rich-text"

export const dynamic = "force-dynamic"

export const alt = "Portfolio Malvina - projet"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

type ProjectSocialImageProps = {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function Image({ params }: ProjectSocialImageProps) {
  const { category: categorySlug, slug } = await params
  const category = getCategoryBySlug(getDisplayCategorySlugFromRoute(categorySlug))
  const projectCategory = getProjectCategoryFromRoute(categorySlug)
  const decodedTitle = getProjectTitleFromRoute(slug)
  const project = projectCategory
    ? await getProjectByTitleAndCategory(decodedTitle, projectCategory)
    : null

  const title = project?.titre ?? decodedTitle
  const description =
    project?.mini_description ??
    richTextToPlainText(project?.description) ??
    "Projet du portfolio de Malvina"
  const imageUrl = project ? getProjectPreviewImageUrl(project) : null

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f8f6f1",
          color: "#141414",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: imageUrl
              ? "linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.58) 48%, rgba(10,10,10,0.12) 100%)"
              : "linear-gradient(135deg, #f8f6f1 0%, #e7ddd0 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "64px",
            color: imageUrl ? "#ffffff" : "#141414",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 28,
              letterSpacing: 0,
            }}
          >
            <span>{authorName}</span>
            <span>{siteName}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontSize: 28,
                color: imageUrl ? "rgba(255,255,255,0.82)" : "#6a6258",
              }}
            >
              {category?.label ?? "Projet"}
            </div>
            <h1
              style={{
                margin: 0,
                maxWidth: 820,
                fontSize: 76,
                lineHeight: 0.96,
                letterSpacing: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 780,
                fontSize: 30,
                lineHeight: 1.25,
                color: imageUrl ? "rgba(255,255,255,0.86)" : "#4a4740",
              }}
            >
              {truncateDescription(description, 118)}
            </p>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
