import type { CSSProperties } from "react"
import type { AppConfiguration } from "@/lib/app-configuration/app-configuration-types"

type PortfolioThemeStyle = CSSProperties & {
  "--portfolio-primary"?: string
  "--portfolio-secondary"?: string
}

export function getPortfolioThemeStyle(
  configuration: AppConfiguration,
): PortfolioThemeStyle {
  return {
    "--portfolio-primary": configuration.primaryColor ?? undefined,
    "--portfolio-secondary": configuration.secondaryColor ?? undefined,
  }
}
