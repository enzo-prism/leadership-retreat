export function Venue() {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">The Thompson Savannah</h2>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                Perched on the banks of the Savannah River, The Thompson Savannah is a contemporary masterpiece that
                honors the city's storied past while embracing modern sophistication.
              </p>
              <p>
                With sweeping waterfront views, world-class dining, and thoughtfully designed spaces for connection and
                reflection, this venue provides the perfect backdrop for our leadership journey.
              </p>
              <p>
                Experience the perfect blend of Southern hospitality and modern luxury as we gather to share insights,
                forge connections, and chart new paths forward together.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Venue Highlights
              </h3>
              <ul className="space-y-3 text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Panoramic river views from every angle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Rooftop bar and lounge with city vistas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>State-of-the-art conference facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Walking distance to historic district</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="/modern-luxury-hotel-waterfront-savannah-georgia-th.jpg"
                alt="The Thompson Savannah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/20 rounded-sm -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
