import {
  BarChart3Icon,
  BrushIcon,
  Code2Icon,
  GraduationCapIcon,
  MegaphoneIcon,
  PaletteIcon,
  PenToolIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ExperienceCategorySlug = "marketing-digital" | "site-web" | "design"

export type ExperienceCategory = {
  slug: ExperienceCategorySlug
  label: string
  title: string
  description: string
  icon: LucideIcon
}

export type FormationItem = {
  title: string
  school: string
  period: string
  description: string
}

export type WorkTimelineItem = {
  title: string
  company: string
  period: string
  description: string
}

export const portfolioNavigation = [
  { label: "À propos", href: "/" },
  { label: "Marketing digital", href: "/experiences/marketing-digital" },
  { label: "Site web", href: "/experiences/site-web" },
  { label: "Design", href: "/experiences/design" },
]

export const skillBadges = [
  "Strategie social media",
  "Identite visuelle",
  "Direction artistique",
  "SEO",
  "Landing pages",
  "Emailing",
  "Figma",
  "Analytics",
]

export const experienceCategories: ExperienceCategory[] = [
  {
    slug: "marketing-digital",
    label: "Marketing digital",
    title: "Campagnes, acquisition et contenus",
    description:
      "Stratégie éditoriale, tunnels de conversion, reporting et coordination de campagnes.",
    icon: MegaphoneIcon,
  },
  {
    slug: "site-web",
    label: "Site web",
    title: "E-commerce et parcours web",
    description:
      "Développement de solutions e-commerce et de parcours web centrés sur l'expérience utilisateur.",
    icon: Code2Icon,
  },
  {
    slug: "design",
    label: "Design",
    title: "Design graphique et identité visuelle",
    description:
      "Développement de concepts visuels alliant sens du détail et direction artistique.",
    icon: PaletteIcon,
  },
]

export const formationItems: FormationItem[] = [
  {
    title: "Master communication digitale",
    school: "Ecole de communication",
    period: "2023 - 2025",
    description:
      "Strategie de marque, acquisition, contenu, pilotage de projet et analyse des performances.",
  },
  {
    title: "Bachelor marketing et design",
    school: "Parcours creation digitale",
    period: "2020 - 2023",
    description:
      "Design graphique, social media, UX, outils de creation et methodologie projet.",
  },
]

export const workTimelineItems: WorkTimelineItem[] = [
  {
    title: "Consultante marketing digital",
    company: "Freelance",
    period: "2024 - aujourd'hui",
    description:
      "Accompagnement de marques sur leur presence digitale, leurs contenus et leurs pages web.",
  },
  {
    title: "Cheffe de projet digital",
    company: "Studio Nova",
    period: "2023 - 2024",
    description:
      "Pilotage de refontes de sites vitrines, coordination des contenus et suivi des livrables entre design, web et client.",
  },
  {
    title: "Chargee de communication",
    company: "Agence creative",
    period: "2022 - 2024",
    description:
      "Production de campagnes, coordination de contenus et suivi des performances.",
  },
  {
    title: "Assistante social media",
    company: "Maison Locale",
    period: "2021 - 2022",
    description:
      "Preparation de calendriers editoriaux, creation de visuels simples et animation des reseaux sociaux au quotidien.",
  },
]

export const homeHighlights = [
  {
    label: "Stratégie",
    value: "Positionner",
    icon: TargetIcon,
  },
  {
    label: "Création",
    value: "Designer",
    icon: BrushIcon,
  },
  {
    label: "Performance",
    value: "Mesurer",
    icon: BarChart3Icon,
  },
]

export const profileStats = [
  { label: "Expertises", value: "3" },
  { label: "Projets modeles", value: "9" },
  { label: "Vision", value: "360" },
]

export const educationIcon = GraduationCapIcon
export const sparkleIcon = SparklesIcon
export const penToolIcon = PenToolIcon

export function getCategoryBySlug(slug: string) {
  return experienceCategories.find((category) => category.slug === slug)
}
