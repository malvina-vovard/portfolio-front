import { ExternalLinkIcon, MailIcon, SendIcon, UserIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-7xl rounded-[2rem]">
        <CardHeader>
          <CardDescription>Contact</CardDescription>
          <CardTitle className="max-w-3xl text-4xl leading-tight">
            Une idee, une marque a clarifier, une page a lancer?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nom</FieldLabel>
                <Input id="name" name="name" placeholder="Votre nom" />
              </Field>
              <Field>
                <FieldLabel htmlFor="firstname">Prenom</FieldLabel>
                <Input id="firstname" name="firstname" placeholder="Votre prenom" />
              </Field>
              <Field>
                <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
                <Input
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://www.linkedin.com/in/..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="vous@email.com" />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Parlez-moi du projet"
                  className="min-h-40"
                />
              </Field>
            </FieldGroup>
            <div className="flex flex-col justify-between rounded-[2rem] bg-muted p-6">
              <div className="flex flex-col gap-5">
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Partagez le contexte, l&apos;objectif et les supports deja existants.
                  Je reviens avec une premiere lecture claire du besoin.
                </p>
                <div className="grid gap-3">
                  <ContactLine icon={UserIcon} label="Nom / prenom" value="Malvina" />
                  <ContactLine icon={MailIcon} label="Email" value="contact@malvina.fr" />
                  <ContactLine icon={ExternalLinkIcon} label="LinkedIn" value="/in/malvina" />
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-12 w-fit">
                Envoyer
                <SendIcon data-icon="inline-end" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

function ContactLine({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl bg-background/80 p-3">
      <Icon aria-hidden="true" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
