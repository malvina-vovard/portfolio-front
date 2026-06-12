import { PortfolioHome } from "@/components/portfolio/portfolio-home"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  getAboutContent,
  getContactContent,
} from "@/lib/home-content/get-home-content"
import { getProfessionalExperiences } from "@/lib/professional-experiences/get-professional-experiences"

export default async function Home() {
  const [
    configuration,
    aboutContent,
    contactContent,
    professionalExperiences,
  ] = await Promise.all([
    getAppConfiguration(),
    getAboutContent(),
    getContactContent(),
    getProfessionalExperiences(),
  ])

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <PortfolioHome
        about={aboutContent}
        contact={contactContent}
        professionalExperiences={professionalExperiences}
      />
    </div>
  )
}
