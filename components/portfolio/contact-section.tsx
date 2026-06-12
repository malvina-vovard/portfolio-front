import { ExternalLinkIcon, MailIcon } from "lucide-react"

import type { ContactContent } from "@/types/home-content"

const DEFAULT_EMAIL = "contact@malvina.fr"
const DEFAULT_LINKEDIN = "https://www.linkedin.com/in/malvina"

type ContactSectionProps = {
  contact: ContactContent
}

export function ContactSection({ contact }: ContactSectionProps) {
  const email = contact.email ?? DEFAULT_EMAIL
  const linkedin = contact.linkedin ?? DEFAULT_LINKEDIN
  const contactLinks = [
    {
      href: `mailto:${email}`,
      icon: MailIcon,
      label: "Email",
      value: email,
    },
    {
      href: linkedin,
      icon: ExternalLinkIcon,
      label: "LinkedIn",
      value: getLinkedInLabel(linkedin),
    },
  ]

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-4 pb-12 pt-20 text-white sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-28 h-48 w-40 opacity-80 [background-image:radial-gradient(circle,_var(--portfolio-hero-accent)_1px,_transparent_1.6px)] [background-size:9px_9px] [mask-image:linear-gradient(90deg,_black,_transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 h-32 w-44 opacity-80 [background-image:radial-gradient(circle,_var(--portfolio-hero-accent)_1px,_transparent_1.6px)] [background-size:9px_9px] [mask-image:linear-gradient(270deg,_black,_transparent)]"
      />

      <div className="mx-auto flex max-w-7xl flex-col justify-between">
        <div className="max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.28em] text-white md:text-white/45">Contact</p>
          <h2 className="bebas-neue-regular relative text-[clamp(5.5rem,18vw,18rem)] leading-[0.78] tracking-normal text-white/80 md:text-white/10">
            {/* <span
              aria-hidden="true"
              className="absolute left-[0.035em] top-[0.035em] text-transparent [-webkit-text-stroke:1px_var(--portfolio-hero-accent)]"
            >
              Malvina Vovard
            </span> */}
            <span className="relative">Malvina Vovard</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:max-w-3xl sm:grid-cols-2">
          {contactLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.href}
                href={link.href}
                className="group flex min-h-24 min-w-0 items-center justify-between gap-5 border-t border-white/18 py-5 transition-colors hover:border-[var(--portfolio-hero-accent)]"
              >
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.22em] text-white/45">
                    {link.label}
                  </span>
                  <span className="mt-2 block break-words text-lg font-medium text-white">
                    {link.value}
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/18 text-white transition-colors group-hover:border-[var(--portfolio-hero-accent)] group-hover:text-[var(--portfolio-hero-accent)]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function getLinkedInLabel(linkedin: string) {
  try {
    const url = new URL(linkedin)

    return url.pathname.replace(/\/$/, "") || linkedin
  } catch {
    return linkedin
  }
}
