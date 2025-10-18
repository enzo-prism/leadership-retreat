import { Calendar, MapPin, Users, Clock } from "lucide-react"

export function EventDetails() {
  const details = [
    {
      icon: Calendar,
      title: "Dates",
      description: "June 4–6, 2026",
      subtitle: "Three days of inspiration",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "The Thompson Savannah",
      subtitle: "Waterfront luxury in historic Savannah",
    },
    {
      icon: Users,
      title: "Experience",
      description: "Connect & Grow",
      subtitle: "Network with fellow leaders",
    },
    {
      icon: Clock,
      title: "Schedule",
      description: "Full Agenda",
      subtitle: "Speakers, workshops & experiences",
    },
  ]

  return (
    <section id="details" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-20 text-balance">Event Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div
                key={index}
                className="text-center p-8 rounded-sm border border-border bg-card hover:border-secondary transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
                  <Icon className="w-8 h-8 text-secondary" />
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
      </div>
    </section>
  )
}
