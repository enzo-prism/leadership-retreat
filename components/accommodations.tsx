import { BedDouble, Bath, Car, TicketPercent, Trees } from "lucide-react"

const perks = [
  "Riverfront rooms with sweeping Savannah views",
  "$249/night group rate with resort & portage fees waived",
  "Access to house car service (first come, first served)",
  "Complimentary house bikes and Port City Passport",
  "Preferred pricing on poolside cabanas and day beds",
  "Steps from Eastern Wharf dining, shopping, and The Park",
]

export function Accommodations() {
  return (
    <section className="py-24 px-4 bg-background" id="stay">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div className="space-y-6">
            <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground">Stay in Style</p>
            <h2 className="text-5xl md:text-6xl font-light text-balance">Where Southern charm meets modern luxury</h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Our home base is the Thompson Savannah — a Hyatt property perched on the Savannah River in Eastern Wharf.
              Floor-to-ceiling windows, locally inspired design, and effortless access to Riverwalk adventures make it the
              perfect canvas for gathering and unwinding.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 rounded-sm border border-border bg-card p-4 text-sm leading-relaxed">
                  <TicketPercent className="w-5 h-5 text-secondary mt-1" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="border border-dashed border-secondary/50 rounded-sm p-6 bg-secondary/5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BedDouble className="w-6 h-6 text-secondary" />
                  <div>
                    <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Group Booking Code</p>
                    <p className="text-xl font-medium">Hyatt SAVTH / Code: LDRS</p>
                  </div>
                </div>
                <a
                  href="https://www.hyatt.com/en-US/group-booking/SAVTH/G-LDRS"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-secondary px-6 py-3 text-sm font-mono uppercase tracking-widest text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Reserve Your Room
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-secondary" />
                  <span>Sunroom reception with indoor/outdoor flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-secondary" />
                  <span>Valet service with waived portage fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trees className="w-4 h-4 text-secondary" />
                  <span>Moments from Savannah’s Riverwalk & The Park</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Prefer to call? Dial <a className="text-secondary hover:underline" href="tel:18002331234">800-233-1234</a>
                and reference code <strong>LDRS</strong>. Rooms are limited within the block.
              </p>
            </div>
          </div>

          <div className="grid grid-rows-[1fr_auto] gap-6">
            <div className="relative overflow-hidden rounded-sm border border-border">
              <img
                src="/modern-luxury-hotel-waterfront-savannah-georgia-th.jpg"
                alt="Riverfront view of the Thompson Savannah hotel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card border border-border rounded-sm p-6 text-sm text-muted-foreground leading-relaxed">
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
