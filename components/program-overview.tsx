import { Lightbulb, Handshake, CalendarClock, CheckCircle2 } from "lucide-react"

export function ProgramOverview() {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Hyper-Relevant Content",
      description:
        "Brian Parsley interviews participants beforehand, translating their ambitions into energizing, practical sessions.",
    },
    {
      icon: Handshake,
      title: "Alliance Perspectives",
      description:
        "A live panel with CareCredit, CBG, and Professional Transition Strategies spotlights opportunities shaping dentistry.",
    },
    {
      icon: CalendarClock,
      title: "Immersive Structure",
      description:
        "Two half-day learning labs balanced with purposeful downtime so you can absorb insights and explore Savannah.",
    },
    {
      icon: CheckCircle2,
      title: "Actionable Integration",
      description:
        "ML guides our closing conversation to synthesize takeaways, commitments, and momentum for the months ahead.",
    },
  ]

  return (
    <section className="py-24 px-4 scroll-mt-28 bg-gradient-to-b from-background via-white/60 to-background" id="program">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <p className="text-sm font-mono font-semibold uppercase tracking-[0.4em] text-accent accent-text-shadow">
              Program Journey
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-balance">
              Curated for profound growth, insight, and connection
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Leadership Retreat 2026 is intentionally crafted for our community of returning members and emerging young
              leaders in dentistry. Expect a boutique experience that feels bespoke to the conversations we are eager to
              have, grounded in the charm of Savannah and elevated by modern luxury.
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl border border-white/35 bg-white/70 p-6 shadow-[0_24px_45px_-30px_rgba(42,36,33,0.45)] backdrop-blur transition-transform hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-white/40 bg-white/75 p-8 shadow-[0_28px_55px_-32px_rgba(42,36,33,0.55)] backdrop-blur">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">Featured Facilitator</h3>
              <p className="text-2xl font-medium">Brian Parsley</p>
              <p className="text-sm text-muted-foreground">Behavioral scientist • Founding principal, The Constance Group</p>
              <a
                href="https://brianparsley.com"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center text-xs font-mono uppercase tracking-[0.35em] text-primary hover:text-primary/80 transition-colors"
              >
                brianparsley.com ↗
              </a>
            </div>
            <p className="text-base text-foreground/90 leading-relaxed">
              Renowned for turning complex human behavior insights into actionable, captivating stories, Brian brings
              warmth, humor, and research-backed wisdom to every interaction. His client roster includes Ford, RE/MAX,
              Liberty Mutual, and Blue Cross Blue Shield.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/50 bg-muted shadow-sm sm:w-1/2">
                <img
                  src="/brian-parsley.png"
                  alt="Portrait of Brian Parsley"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <blockquote className="text-lg italic text-foreground/90 leading-relaxed">
                  “Brian has a gift for distilling human behavior into simple shifts that unlock courageous leadership. His
                  sessions are built around you — not a canned presentation.”
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  — ML &amp; Liz
                </p>
              </div>
            </div>
            <div className="rounded-md border border-dashed border-accent/60 p-6 bg-accent/10">
              <h4 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">Beyond the keynote</h4>
              <p className="text-sm text-primary/80 leading-relaxed">
                The final morning culminates in a Partner Alliances Panel followed by ML’s “Putting It All Together,”
                ensuring you leave with clarity, accountability, and next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
