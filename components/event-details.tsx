import type { CSSProperties } from "react"
import { Calendar, MapPin, Users, Mic2, Sparkles } from "lucide-react"
import Link from "next/link"

export function EventDetails() {
  const details = [
    {
      icon: Calendar,
      title: "Dates",
      description: "June 4–6, 2026",
      subtitle: "Three immersive days together",
    },
    {
      icon: MapPin,
      title: "Riverfront Venue",
      description: "Thompson Savannah Hotel",
      subtitle: "Eastern Wharf • Savannah's reborn riverfront",
    },
    {
      icon: Sparkles,
      title: "Theme",
      description: "Southern Charm x Modern Luxury",
      subtitle: "Curated experiences for elevated leadership",
    },
    {
      icon: Users,
      title: "Community",
      description: "Intimate by design",
      subtitle: "Attendance capped for deep connection",
    },
    {
      icon: Mic2,
      title: "Facilitator",
      description: "Brian Parsley",
      subtitle: "Behavioral scientist & master storyteller",
    },
  ]

  return (
    <section
      id="details"
      className="py-24 px-4 scroll-mt-28 bg-gradient-to-b from-background via-white/60 to-background"
      data-reveal
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-6 text-balance">
          A Mind-Expanding Savannah Retreat
        </h2>
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Designed for returning attendees, new participants and rising young leaders in dentistry, LR26 fuses
          personalized facilitation, luxe surroundings, and meaningful dialogue to unlock fresh perspective.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-8 text-center shadow-[0_20px_45px_-35px_rgba(42,36,33,0.65)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_35px_65px_-30px_rgba(66,93,82,0.35)]"
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary shadow-[0_18px_35px_-28px_rgba(66,93,82,0.65)] transition-colors group-hover:bg-primary/15">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {detail.title}
                </h3>
                <p className="text-2xl font-medium mb-2">{detail.description}</p>
                <p className="text-sm text-muted-foreground">{detail.subtitle}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="rounded-3xl border border-white/40 bg-white/75 p-10 shadow-[0_24px_50px_-30px_rgba(42,36,33,0.55)] backdrop-blur"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              The Promise
            </h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/90">
              Expect a mind-expanding experience crafted around your goals. Brian Parsley is interviewing attendees in
              advance to weave your voices directly into two half-day sessions. Saturday brings a collaborative alliance
              partner panel, and a closing integration conversation led by ML.
            </p>
          </div>
          <div
            className="relative overflow-hidden rounded-3xl border border-secondary/30 bg-secondary text-secondary-foreground p-8 shadow-[0_24px_50px_-28px_rgba(175,111,106,0.6)]"
            data-reveal
            style={{ "--reveal-delay": "220ms" } as CSSProperties}
          >
            <div className="pointer-events-none absolute inset-y-0 right-[-40%] hidden w-2/3 translate-x-0 rounded-full bg-secondary-foreground/10 blur-3xl md:block" />
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest mb-2">Secure Your Spot</h3>
              <p className="text-base text-secondary-foreground/80">
                With limited capacity for richer dialogue, early registration is encouraged.
              </p>
            </div>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-secondary-foreground/60 px-6 py-3 text-sm font-mono uppercase tracking-[0.35em] text-secondary-foreground transition-colors hover:bg-secondary-foreground hover:text-secondary"
            >
              View Registration Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
