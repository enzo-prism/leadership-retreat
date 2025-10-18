import { Calendar, MapPin, Users, Mic2, Sparkles } from "lucide-react"

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
      subtitle: "Eastern Wharf • Indoor/Outdoor Sunroom",
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
    <section id="details" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-6 text-balance">
          A Mind-Expanding Savannah Retreat
        </h2>
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Designed for returning members and rising young leaders in dentistry, LR26 fuses personalized facilitation,
          luxe surroundings, and meaningful dialogue to unlock fresh perspective.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div
                key={index}
                className="text-center p-8 rounded-md border border-border bg-card/90 hover:border-accent transition-colors shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                  <Icon className="w-8 h-8 text-primary" />
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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-sm p-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              The Promise
            </h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/90">
              Expect a mind-expanding experience crafted around your goals. Brian Parsley is interviewing attendees in
              advance to weave your voices directly into two half-day sessions, a collaborative alliance partner panel,
              and a closing integration conversation led by ML.
            </p>
          </div>
          <div className="bg-secondary text-secondary-foreground rounded-sm p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest mb-2">Secure Your Spot</h3>
              <p className="text-base text-secondary-foreground/80">
                With limited capacity for richer dialogue, early registration is encouraged.
              </p>
            </div>
            <a
              href="#register"
              className="mt-6 inline-flex items-center justify-center rounded-sm border border-secondary-foreground/30 px-6 py-3 text-sm font-mono uppercase tracking-widest hover:bg-secondary-foreground hover:text-secondary transition-colors"
            >
              View Registration Options
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
