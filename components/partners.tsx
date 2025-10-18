import { Handshake } from "lucide-react"

const partners = [
  { name: "CareCredit", description: "Financial solutions empowering patient access" },
  { name: "CBG", description: "Commercial banking guidance for growth-minded practices" },
  { name: "Professional Transition Strategies", description: "Strategic pathways for practice evolution" },
]

export function Partners() {
  return (
    <section className="py-24 px-4 bg-card" id="partners">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.4em] text-accent">
            <Handshake className="w-4 h-4 text-accent" /> Alliance Partners
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-balance">
            Grateful for the partners who make this gathering possible
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Their collaboration helps us craft a retreat that is as visionary as it is actionable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="border border-border bg-background/95 rounded-md p-8 flex flex-col items-center text-center gap-3 hover:border-accent transition-colors shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 text-primary flex items-center justify-center text-xl font-medium">
                {partner.name[0]}
              </div>
              <h3 className="text-xl font-medium">{partner.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
