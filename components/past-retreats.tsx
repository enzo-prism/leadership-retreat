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
      </div>
    </section>
  )
}
