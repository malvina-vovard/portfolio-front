import { AllProjectsPage } from "@/components/portfolio/all-projects-page"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"

export default async function ProjectsRoute() {
  const configuration = await getAppConfiguration()

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <AllProjectsPage />
    </div>
  )
}
