import { Handshake } from "lucide-react"

const partners = [
  {
    name: "CareCredit",
    description: "Making care possible... today.",
    logo: "/carecredit-logo.png",
    logoAlt: 'CareCredit logo with the promise "Making care possible... today."',
  },
  {
    name: "CBG & Company Inc.",
    description: "Commercial banking guidance for growth-minded practices",
    logo: "/cbg-logo.png",
    logoAlt: "CBG & Company Inc. logo",
  },
  {
    name: "Practice Transitions Institute",
    description: "Excellence, Integrity, Purpose.",
    logo: "/practice-transitions-institute-logo.png",
    logoAlt: 'Practice Transitions Institute logo with the words "Excellence, Integrity, Purpose."',
  },
]

export function Partners() {
  return (
    <section className="py-24 px-4 bg-card" id="partners">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-[0.4em] text-accent accent-text-shadow">
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
              className="border border-border/70 bg-card/95 rounded-lg p-8 flex flex-col items-stretch text-center gap-6 hover:border-accent transition-colors shadow-sm"
            >
              <div className="aspect-[16/9] w-full rounded-md border border-border/80 bg-gradient-to-br from-secondary/15 via-background to-accent/10 flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src={partner.logo || "/placeholder-logo.png"}
                  alt={partner.logoAlt || `${partner.name} logo`}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground leading-tight text-balance">{partner.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
