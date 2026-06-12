import { AllProjectsPage } from "@/components/portfolio/all-projects-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata({
  title: "Tous les projets - Marketing digital, design et sites web",
  description:
    "Explorez les projets de Malvina par expertise: marketing digital, design, identite visuelle, UX writing et creation de sites web.",
  path: "/projets",
  keywords: ["projets marketing digital", "projets design", "portfolio web"],
})

export default async function ProjectsRoute() {
  const configuration = await getAppConfiguration()

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <AllProjectsPage />
    </div>
  )
}
