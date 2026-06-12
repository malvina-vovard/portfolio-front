import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProfessionalExperienceSection } from "@/components/portfolio/professional-experience-section"
import {
  ProjectsSectionStack,
  type HomeProject,
} from "@/components/portfolio/projects-section-stack"
import {
  getProjectCategoryRouteSlug,
  getProjectRouteTitle,
} from "@/lib/projects/categories"
import { getStrapiMediaUrl } from "@/lib/strapi/media"
import type { AboutContent, ContactContent } from "@/types/home-content"
import type { ProfessionalExperience } from "@/types/professional-experience"
import type { ProjectMedia, ProjectWithCover } from "@/types/project"

type PortfolioHomeProps = {
  about: AboutContent
  contact: ContactContent
  professionalExperiences: ProfessionalExperience[]
  favoriteProjects: ProjectWithCover[]
}

export function PortfolioHome({
  about,
  contact,
  professionalExperiences,
  favoriteProjects,
}: PortfolioHomeProps) {
  const homeProjects = favoriteProjects.map(mapHomeProject)

  return (
    <main>
      <HeroSection />
      <AboutSection about={about} contact={contact} />
      <ProfessionalExperienceSection experiences={professionalExperiences} />
      <div className="bg-black">
        <ProjectsSectionStack projects={homeProjects} />
        <ContactSection contact={contact} />
      </div>
    </main>
  )
}

function mapHomeProject(project: ProjectWithCover): HomeProject {
  const categorySlug = getProjectCategoryRouteSlug(project.categorie)
  const coverUrl = getCoverUrl(project.couverture)
  const tools = parseProjectTools(project.outils)

  return {
    category: getProjectCategoryLabel(project.categorie),
    company: project.sous_titre ?? "",
    href: `/experiences/${categorySlug}/${getProjectRouteTitle(project.titre)}`,
    id: project.documentId ?? String(project.id),
    imageAlt:
      project.couverture?.alternativeText ??
      project.couverture?.caption ??
      `Visuel du projet ${project.titre}`,
    imageUrl: coverUrl,
    period: project.date ? formatProjectDate(project.date) : null,
    summary: project.mini_description ?? project.description ?? "",
    title: project.titre,
    tools,
  }
}

function getProjectCategoryLabel(category: ProjectWithCover["categorie"]) {
  const labels: Record<ProjectWithCover["categorie"], string> = {
    design: "Design",
    marketing_digital: "Marketing digital",
    website: "Site web",
  }

  return labels[category]
}

function getCoverUrl(media?: ProjectMedia | null) {
  if (!media?.mime?.startsWith("image/")) {
    return null
  }

  return getStrapiMediaUrl(
    media.formats?.large?.url ?? media.formats?.medium?.url ?? media.url,
  )
}

function parseProjectTools(tools?: string | null) {
  return (
    tools
      ?.split(",")
      .map((tool) => tool.trim())
      .filter(Boolean) ?? []
  )
}

function formatProjectDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}
