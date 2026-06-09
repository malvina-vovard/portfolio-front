import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { FeaturedExperiencesSection } from "@/components/portfolio/featured-experiences-section"
import { FormationSection } from "@/components/portfolio/formation-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProfessionalExperienceSection } from "@/components/portfolio/professional-experience-section"

type PortfolioHomeProps = {
  aboutDescription?: string | null
}

export function PortfolioHome({ aboutDescription }: PortfolioHomeProps) {
  return (
    <main>
      <HeroSection />
      <AboutSection description={aboutDescription} />
      <FormationSection />
      <ProfessionalExperienceSection />
      <FeaturedExperiencesSection />
      <ContactSection />
    </main>
  )
}
