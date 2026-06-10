import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProfessionalExperienceSection } from "@/components/portfolio/professional-experience-section"
import { ProjectsSectionStack } from "@/components/portfolio/projects-section-stack"

type PortfolioHomeProps = {
  aboutDescription?: string | null
}

export function PortfolioHome({ aboutDescription }: PortfolioHomeProps) {
  return (
    <main>
      <HeroSection />
      <AboutSection description={aboutDescription} />
      <ProfessionalExperienceSection />
      <ProjectsSectionStack />
      <ContactSection />
    </main>
  )
}
