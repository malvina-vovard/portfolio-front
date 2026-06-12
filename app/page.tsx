import { PortfolioHome } from "@/components/portfolio/portfolio-home"
import { getAppConfiguration } from "@/lib/app-configuration/get-app-configuration"
import { getPortfolioThemeStyle } from "@/lib/app-configuration/theme-style"
import {
  getAboutContent,
  getContactContent,
} from "@/lib/home-content/get-home-content"

export default async function Home() {
  const [configuration, aboutContent, contactContent] = await Promise.all([
    getAppConfiguration(),
    getAboutContent(),
    getContactContent(),
  ])

  return (
    <div style={getPortfolioThemeStyle(configuration)}>
      <PortfolioHome about={aboutContent} contact={contactContent} />
    </div>
  )
}
