import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProfessionalExperienceSection } from "@/components/portfolio/professional-experience-section"
import { ProjectsSectionStack } from "@/components/portfolio/projects-section-stack"
import type { AboutContent, ContactContent } from "@/types/home-content"
import type { ProfessionalExperience } from "@/types/professional-experience"

type PortfolioHomeProps = {
  about: AboutContent
  contact: ContactContent
  professionalExperiences: ProfessionalExperience[]
}

export function PortfolioHome({
  about,
  contact,
  professionalExperiences,
}: PortfolioHomeProps) {
  return (
    <main>
      <HeroSection />
      <AboutSection about={about} contact={contact} />
      <ProfessionalExperienceSection experiences={professionalExperiences} />
      <div className="bg-black">
        <ProjectsSectionStack />
        <ContactSection contact={contact} />
      </div>
    </main>
  )
}
