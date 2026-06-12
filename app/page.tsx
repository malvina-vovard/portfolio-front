import { PortfolioHome } from "@/components/portfolio/portfolio-home"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  getAboutContent,
  getContactContent,
} from "@/lib/home-content/get-home-content"
import { getProfessionalExperiences } from "@/lib/professional-experiences/get-professional-experiences"
import { getFavoriteProjects } from "@/lib/projects/get-project"
import { defaultDescription, defaultTitle, getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: "/",
})

export default async function Home() {
  const [
    configuration,
    aboutContent,
    contactContent,
    professionalExperiences,
    favoriteProjects,
  ] = await Promise.all([
    getAppConfiguration(),
    getAboutContent(),
    getContactContent(),
    getProfessionalExperiences(),
    getFavoriteProjects(),
  ])

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <PortfolioHome
        about={aboutContent}
        contact={contactContent}
        professionalExperiences={professionalExperiences}
        favoriteProjects={favoriteProjects}
      />
    </div>
  )
}
