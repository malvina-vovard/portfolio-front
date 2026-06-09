import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon, MailIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { skillBadges } from "@/lib/portfolio/portfolio-data"

const PROFILE_IMAGE_URL = "/images/malvina4.jpeg"
  // "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"


const DEFAULT_ABOUT_DESCRIPTION =
  "J'accompagne les marques dans la construction d'une presence digitale claire: une strategie qui tient debout, des pages qui convertissent, et des visuels qui restent en tete."

type AboutSectionProps = {
  description?: string | null
}

export function AboutSection({ description }: AboutSectionProps) {
  return (
    <section
      id="a-propos"
      className="relative w-full overflow-hidden bg-[#35373a] px-4 py-14 mt-5 sm:px-6 lg:px-8"
    >
      <BackgroundGradientAnimation
        interactive={false}
        gradientBackgroundStart="#000000"
        gradientBackgroundEnd="#050505"
        firstColor="247, 115, 20"
        secondColor="255, 255, 255"
        thirdColor="247, 115, 20"
        fourthColor="80, 80, 80"
        fifthColor="247, 115, 20"
        pointerColor="247, 115, 20"
        size="50%"
        containerClassName=" absolute inset-0 h-full w-full opacity-50"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
        <Card className="min-h-[32rem] rounded-[2rem] border-white/12 bg-[rgb(0_0_0/0.5)] text-white shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur-xl lg:col-span-2">
          <CardContent>
            <div className="relative min-h-96 overflow-hidden rounded-[1.4rem]">
              <Image
                src={PROFILE_IMAGE_URL}
                alt="Portrait editorial de Malvina"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </CardContent>
          <div className="flex flex-col gap-1.5 px-(--card-spacing)">
            <CardTitle className="text-2xl">Malvina, creatrice de projets digitaux</CardTitle>
            <CardDescription className="text-white/62">
              Strategie, design et contenus pour faire avancer une marque avec coherence.
            </CardDescription>
          </div>
          <CardFooter className="flex flex-wrap gap-2">
            <Button asChild className="bg-[var(--portfolio-hero-accent)] text-white hover:bg-[color-mix(in_oklch,var(--portfolio-hero-accent),black_12%)]">
              <Link href="#contact">
                <MailIcon data-icon="inline-start" />
                Contact
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/8 text-white hover:bg-white/14 hover:text-white"
            >
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <ExternalLinkIcon data-icon="inline-start" />
                LinkedIn
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-[2rem] border-white/12 bg-[rgb(0_0_0/0.5)] text-white shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur-xl lg:col-span-3">
          <CardContent className="flex flex-col gap-8 ">
            <p className="max-w-3xl text-white/95 leading-6">
              {description ?? DEFAULT_ABOUT_DESCRIPTION}
            </p>
            <div className="h-[1px] w-full bg-white/10"></div>
            <div className="flex flex-wrap gap-2">
              {skillBadges.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className=" text-sm bg-white/5 py-4! px-3! rounded-md font-light text-white/95"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
