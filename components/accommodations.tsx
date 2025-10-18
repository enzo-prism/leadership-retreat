import {
  type LucideIcon,
  Bath,
  BedDouble,
  Bike,
  Car,
  MapPin,
  TicketPercent,
} from "lucide-react"

const perks: { icon: LucideIcon; description: string }[] = [
  {
    icon: BedDouble,
    description: "Riverfront rooms with sweeping Savannah views",
  },
  {
    icon: TicketPercent,
    description: "$249/night group rate with resort & portage fees waived",
  },
  {
    icon: Car,
    description: "Access to house car service (first come, first served)",
  },
  {
    icon: Bike,
    description: "Complimentary house bikes and Port City Passport",
  },
  {
    icon: Bath,
    description: "Preferred pricing on poolside cabanas and day beds",
  },
  {
    icon: MapPin,
    description: "Steps from Eastern Wharf dining, shopping, and The Park",
  },
]

export function Accommodations() {
  return (
    <section className="py-24 px-4 bg-background" id="stay">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div className="space-y-6">
            <p className="text-sm font-mono uppercase tracking-[0.35em] sm:tracking-[0.4em] text-accent">Stay in Style</p>
            <h2 className="text-5xl md:text-6xl font-light text-balance">Where Southern charm meets modern luxury</h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Our home base is the Thompson Savannah — a Hyatt property perched on the Savannah River in Eastern Wharf.
              Floor-to-ceiling windows, locally inspired design, and effortless access to Riverwalk adventures make it the
              perfect canvas for gathering and unwinding.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk) => {
                const Icon = perk.icon
                return (
                  <li
                    key={perk.description}
                    className="flex items-start gap-3 rounded-md border border-border/80 bg-card/95 p-4 text-sm leading-relaxed shadow-sm"
                  >
                    <Icon className="w-5 h-5 text-primary mt-1" />
                    <span>{perk.description}</span>
                  </li>
                )
              })}
            </ul>

            <div className="border border-dashed border-accent/60 rounded-md p-6 bg-accent/5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BedDouble className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-mono uppercase tracking-widest text-accent">Group Booking Code</p>
                    <p className="text-xl font-medium">Hyatt SAVTH / Code: LDRS</p>
                  </div>
                </div>
                <a
                  href="https://www.hyatt.com/en-US/group-booking/SAVTH/G-LDRS"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 text-sm font-mono uppercase tracking-widest text-primary hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Reserve Your Room
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-primary" />
                  <span>Sunroom reception with indoor/outdoor flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  <span>Valet service with waived portage fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Moments from Savannah’s Riverwalk &amp; The Park</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Prefer to call? Dial <a className="text-primary hover:underline" href="tel:18002331234">800-233-1234</a>
                and reference code <strong>LDRS</strong>. Rooms are limited within the block.
              </p>
            </div>
          </div>

          <div className="grid grid-rows-[1fr_auto] gap-6">
            <div className="relative overflow-hidden rounded-md border border-border">
              <img
                src="/modern-luxury-hotel-waterfront-savannah-georgia-th.jpg"
                alt="Riverfront view of the Thompson Savannah hotel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card/95 border border-border rounded-md p-6 text-sm text-muted-foreground leading-relaxed shadow-sm">
              <p>
                "The Thompson offers effortless sophistication — from the airy Sunroom to the rooftop lounge — giving us
                space to connect, reflect, and celebrate Savannah’s creative spirit."
              </p>
              <p className="mt-4 font-medium text-foreground">— ML &amp; Liz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
