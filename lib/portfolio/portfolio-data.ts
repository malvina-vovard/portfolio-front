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

export type Experience = {
  slug: string
  categorySlug: ExperienceCategorySlug
  title: string
  client: string
  period: string
  summary: string
  content: string[]
  tools: string[]
  apps: string[]
  imageUrl: string
  videoUrl?: string
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
  { label: "À propos", href: "/#a-propos" },
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
      "Strategie editoriale, tunnels de conversion, reporting et coordination de campagnes.",
    icon: MegaphoneIcon,
  },
  {
    slug: "site-web",
    label: "Site web",
    title: "Sites vitrines et parcours web",
    description:
      "Architecture de pages, contenus, wireframes et coordination entre design et developpement.",
    icon: Code2Icon,
  },
  {
    slug: "design",
    label: "Design",
    title: "Univers visuels et supports de marque",
    description:
      "Direction artistique, templates, supports print et assets digitaux coherents.",
    icon: PaletteIcon,
  },
]

export const featuredExperiences: Experience[] = [
  {
    slug: "nurish",
    categorySlug: "marketing-digital",
    title: "Lancement social media",
    client: "NURISH",
    period: "2025",
    summary:
      "Creation d'une ligne editoriale, plan de lancement et assets pour une marque food bien-etre.",
    content: [
      "NURISH avait besoin d'un lancement digital lisible, doux et performant. Le travail a commence par la clarification des messages et des piliers editoriaux.",
      "Le resultat pose une base claire pour produire des contenus reguliers, reconnaissables et faciles a decliner.",
    ],
    tools: ["Calendrier editorial", "Reporting", "Copywriting"],
    apps: ["Meta Business Suite", "Canva", "Notion"],
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  },
  {
    slug: "atelier-mira",
    categorySlug: "marketing-digital",
    title: "Campagne acquisition",
    client: "Atelier Mira",
    period: "2024",
    summary:
      "Structuration de campagne, contenus annonces et suivi des conversions pour une offre creative.",
    content: [
      "La campagne a ete pensee autour d'une promesse simple, de formats courts et d'une lecture rapide des resultats.",
    ],
    tools: ["Ads", "Landing page", "A/B testing"],
    apps: ["Meta Ads", "Google Sheets", "Looker Studio"],
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
  {
    slug: "maison-lys",
    categorySlug: "marketing-digital",
    title: "Refonte de contenus",
    client: "Maison Lys",
    period: "2024",
    summary:
      "Repositionnement des contenus social media pour une marque lifestyle premium.",
    content: [
      "Le ton, les formats et les messages ont ete harmonises pour renforcer la perception de marque.",
    ],
    tools: ["Brand content", "Stories", "Planning"],
    apps: ["Instagram", "Figma", "Notion"],
    imageUrl:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  },
  {
    slug: "studio-clair",
    categorySlug: "site-web",
    title: "Site vitrine editorial",
    client: "Studio Clair",
    period: "2025",
    summary:
      "Conception d'une structure de site claire pour presenter services, preuves et contact.",
    content: [
      "Le projet a transforme une offre dense en parcours simple: comprendre, se projeter, contacter.",
    ],
    tools: ["Arborescence", "Wireframes", "SEO"],
    apps: ["Figma", "Notion", "Google Search Console"],
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    slug: "bloom-co",
    categorySlug: "site-web",
    title: "Landing page conversion",
    client: "Bloom & Co",
    period: "2024",
    summary:
      "Page courte, structuree et orientee prise de contact pour une offre de conseil.",
    content: [
      "La landing page met en avant une promesse, des preuves, puis un contact rapide.",
    ],
    tools: ["UX writing", "Sections", "CTA"],
    apps: ["Figma", "Webflow", "Analytics"],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    slug: "orion-care",
    categorySlug: "site-web",
    title: "Parcours service",
    client: "Orion Care",
    period: "2023",
    summary:
      "Organisation des contenus pour un service complexe avec besoin de rassurance.",
    content: [
      "Les sections ont ete pensees pour reduire la friction et rendre le service comprehensible.",
    ],
    tools: ["UX", "Contenus", "FAQ"],
    apps: ["Figma", "Miro", "Notion"],
    imageUrl:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  },
  {
    slug: "linea",
    categorySlug: "site-web",
    title: "Direction contenu web",
    client: "Linea",
    period: "2023",
    summary:
      "Relecture UX, hierarchie des pages et harmonisation des messages de marque.",
    content: [
      "Le travail a donne une structure plus directe aux pages clefs et une voix de marque plus constante.",
    ],
    tools: ["Audit", "UX writing", "SEO"],
    apps: ["Notion", "Figma", "Semrush"],
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
  },
  {
    slug: "sola",
    categorySlug: "design",
    title: "Identite visuelle digitale",
    client: "Sola",
    period: "2025",
    summary:
      "Creation d'un systeme visuel souple pour reseaux sociaux, site et supports de vente.",
    content: [
      "L'identite repose sur une grille simple, des compositions chaudes et une bibliotheque d'assets reutilisables.",
    ],
    tools: ["Direction artistique", "Templates", "Brand kit"],
    apps: ["Figma", "Illustrator", "Canva"],
    imageUrl:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e",
  },
  {
    slug: "nacre",
    categorySlug: "design",
    title: "Supports de presentation",
    client: "Nacre",
    period: "2024",
    summary:
      "Deck commercial, templates et systeme de pages pour presenter une offre premium.",
    content: [
      "Les supports ont ete concus pour vendre sans surcharger: peu de texte, hierarchie nette, rythme visuel.",
    ],
    tools: ["Deck", "Templates", "Iconographie"],
    apps: ["Figma", "PowerPoint", "Illustrator"],
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
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
    title: "Chargee de communication",
    company: "Agence creative",
    period: "2022 - 2024",
    description:
      "Production de campagnes, coordination de contenus et suivi des performances.",
  },
]

export const homeHighlights = [
  {
    label: "Strategie",
    value: "Positionner",
    icon: TargetIcon,
  },
  {
    label: "Creation",
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

export function getExperiencesByCategory(slug: string) {
  return featuredExperiences.filter((experience) => experience.categorySlug === slug)
}

export function getExperienceBySlug(categorySlug: string, experienceSlug: string) {
  return featuredExperiences.find(
    (experience) =>
      experience.categorySlug === categorySlug && experience.slug === experienceSlug,
  )
}
