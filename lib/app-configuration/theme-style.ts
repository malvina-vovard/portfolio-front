import type { CSSProperties } from "react"
import type { AppConfiguration } from "@/lib/app-configuration/app-configuration-types"

type PortfolioThemeStyle = CSSProperties & {
  "--portfolio-primary"?: string
  "--portfolio-hero-accent"?: string
  "--portfolio-hero-accent-rgb"?: string
}

function getRgbColor(value: string | null) {
  if (!value) {
    return undefined
  }

  const normalized = value.replace("#", "")
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized
  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)

  if ([red, green, blue].some((part) => Number.isNaN(part))) {
    return undefined
  }

  return `${red}, ${green}, ${blue}`
}

export function getPortfolioThemeStyle(
  configuration: AppConfiguration,
): PortfolioThemeStyle {
  return {
    "--portfolio-primary": configuration.primaryColor ?? undefined,
    "--portfolio-hero-accent": configuration.primaryColor ?? undefined,
    "--portfolio-hero-accent-rgb": getRgbColor(configuration.primaryColor),
  }
}
