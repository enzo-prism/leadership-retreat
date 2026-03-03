import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { LogoMark } from "@/components/logo-mark"

export const metadata: Metadata = {
  title: "Contact | Leadership Retreat 2026",
  description: "Reach out to the Leadership Retreat team with any questions.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background" />
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto w-fit rounded-full border border-border/60 bg-card/80 px-5 py-3 shadow-sm shadow-primary/10">
            <LogoMark size="sm" variant="inline" className="h-10 w-auto" />
          </div>
          <p className="mt-6 text-xs font-mono uppercase tracking-[0.35em] text-accent">Contact</p>
          <h1 className="mt-3 text-4xl font-light text-balance sm:text-5xl">We&apos;re here to help</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Reach out with retreat questions, travel needs, or anything else we can clarify for you and your team.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/95 p-6 text-left shadow-md shadow-primary/10">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Email</p>
              <a
                href="mailto:info@dentistretreat.com"
                className="mt-3 block text-xl font-light text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                info@dentistretreat.com
              </a>
              <p className="mt-2 text-sm text-muted-foreground">We respond quickly during business hours.</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/95 p-6 text-left shadow-md shadow-primary/10">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Call</p>
              <div className="mt-3 space-y-2 text-lg font-light">
                <a
                  href="tel:+14152986710"
                  className="block underline-offset-4 hover:text-accent hover:underline"
                  aria-label="Call ML at (415) 298-6710"
                >
                  ML: (415) 298-6710
                </a>
                <a
                  href="tel:+14153090345"
                  className="block underline-offset-4 hover:text-accent hover:underline"
                  aria-label="Call Liz at (415) 309-0345"
                >
                  Liz: (415) 309-0345
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
