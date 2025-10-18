export function Venue() {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">The Thompson Savannah</h2>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                Set on the riverfront at Eastern Wharf, the Thompson Savannah pairs Savannah’s storied charm with
                floor-to-ceiling windows, curated art, and a vibrant culinary scene.
              </p>
              <p>
                Our welcome reception unfolds in the Sunroom — an airy indoor/outdoor lounge with panoramic views — while
                spacious meeting studios and cozy gathering nooks keep conversation flowing all weekend.
              </p>
              <p>
                When sessions conclude, step outside to explore Riverwalk, lounge by the pool, or hop on the house bikes
                to discover Savannah’s iconic squares.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border/70">
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
                Venue Highlights
              </h3>
              <ul className="space-y-3 text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Sunroom reception with indoor/outdoor river views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Rooftop bar, pool deck, and creative culinary offerings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>State-of-the-art meeting studios steps from the riverwalk</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Complimentary house car service and bikes for exploring</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-md overflow-hidden shadow-lg shadow-primary/10">
              <img
                src="/modern-luxury-hotel-waterfront-savannah-georgia-th.jpg"
                alt="The Thompson Savannah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/30 rounded-md blur-md -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
