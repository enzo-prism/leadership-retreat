export function PastRetreats() {
  const retreats = [
    {
      year: "2023",
      location: "Naples, Florida",
      description: "Beachfront escape emphasizing connection and luxury",
      image: "/naples-retreat-group-shot.png",
      imageAlt: "Leadership Retreat attendees gathered together in Naples, Florida",
    },
    {
      year: "2024",
      location: "Deer Valley, Utah",
      description: "Mountain retreat devoted to reflection and growth",
      image: "/leadership-retreat-group-photo.png",
      imageAlt: "Leadership Retreat community group photo from the Deer Valley gathering",
    },
  ]

  const retreatMoments = [
    {
      src: "/retreat-happy-attendees.png",
      alt: "Retreat attendees smiling together during a group connection moment",
      caption: "Joy-filled connections that energize every gathering",
    },
    {
      src: "/retreat-group-talk.png",
      alt: "Facilitator guiding a discussion with engaged retreat participants",
      caption: "Intimate conversations shaped by your voice and experience",
    },
    {
      src: "/retreat-eating-together.png",
      alt: "Attendees sharing a meal together during the retreat",
      caption: "Shared meals that spark new ideas and deeper friendships",
    },
    {
      src: "/retreat-meeting.png",
      alt: "Retreat participants collaborating during a workshop session",
      caption: "Collaborative sessions that translate insight into action",
    },
  ]

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-8 text-balance">Our Journey</h2>
        <p className="text-center text-xl text-foreground/80 mb-20 max-w-3xl mx-auto">
          Building on the success of our previous retreats
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {retreats.map((retreat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-md border border-border bg-card/95 hover:border-accent transition-all shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={retreat.image || "/placeholder.svg"}
                  alt={retreat.imageAlt || `${retreat.location} ${retreat.year}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-4xl font-light">{retreat.year}</span>
                  <span className="text-sm font-mono font-semibold uppercase tracking-widest text-accent accent-text-shadow">
                    Past Retreat
                  </span>
                </div>
                <h3 className="text-2xl font-medium mb-2">{retreat.location}</h3>
                <p className="text-muted-foreground">{retreat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-accent accent-text-shadow">
              Retreat Moments
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the energy, camaraderie, and intention that define our time together.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {retreatMoments.map((moment) => (
              <figure
                key={moment.src}
                className="group overflow-hidden rounded-md border border-border bg-card/90 shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={moment.src}
                    alt={moment.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground text-center leading-relaxed">
                  {moment.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
