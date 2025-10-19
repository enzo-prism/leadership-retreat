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
      aspect: "portrait" as const,
    },
    {
      src: "/retreat-meeting.png",
      alt: "Retreat participants collaborating during a workshop session",
      caption: "Collaborative sessions that translate insight into action",
    },
  ]

  return (
    <section className="py-24 px-4 scroll-mt-28 bg-gradient-to-b from-background via-white/55 to-background" id="journey">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-6 text-balance">Our Journey</h2>
        <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Building on the success of our previous retreats
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {retreats.map((retreat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/75 shadow-[0_28px_55px_-30px_rgba(42,36,33,0.45)] backdrop-blur transition-all hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-28px_rgba(66,93,82,0.35)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={retreat.image || "/placeholder.svg"}
                  alt={retreat.imageAlt || `${retreat.location} ${retreat.year}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="text-4xl font-light">{retreat.year}</span>
                  <span className="rounded-full border border-accent/30 px-3 py-1 text-xs font-mono uppercase tracking-[0.35em] text-accent">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {retreatMoments.map((moment) => {
              const aspectClass = moment.aspect === "portrait" ? "aspect-[9/16]" : "aspect-[4/3]"
              const imageClass =
                moment.aspect === "portrait"
                  ? "h-full w-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                  : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"

              return (
                <figure
                  key={moment.src}
                  className="group overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-[0_18px_40px_-28px_rgba(42,36,33,0.45)] backdrop-blur"
                >
                  <div className={`${aspectClass} overflow-hidden`}>
                    <img src={moment.src} alt={moment.alt} className={imageClass} />
                  </div>
                  <figcaption className="p-4 text-sm text-muted-foreground text-center leading-relaxed">
                    {moment.caption}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
