import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProfessionalExperienceSection } from "@/components/portfolio/professional-experience-section"
import { ProjectsSectionStack } from "@/components/portfolio/projects-section-stack"
import type { AboutContent, ContactContent } from "@/types/home-content"

type PortfolioHomeProps = {
  about: AboutContent
  contact: ContactContent
}

export function PortfolioHome({ about, contact }: PortfolioHomeProps) {
  return (
    <main>
      <HeroSection />
      <AboutSection about={about} contact={contact} />
      <ProfessionalExperienceSection />
      <div className="bg-black">
        <ProjectsSectionStack />
        <ContactSection contact={contact} />
      </div>
    </main>
  )
}
