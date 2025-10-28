import { Handshake } from "lucide-react"

const partners = [
  {
    name: "CareCredit",
    description: "We help put your health and wellness goals within reach",
    logo: "/carecredit-logo.png",
    logoAlt: 'CareCredit logo with the promise "We help put your health and wellness goals within reach"',
    url: "https://www.carecredit.com/",
  },
  {
    name: "CBG & Company Inc.",
    description: "A dental specific financial consulting firm",
    logo: "/cbg-logo.png",
    logoAlt: "CBG & Company Inc. logo",
    url: "https://cbgfinancialplanning.com/",
  },
  {
    name: "Practice Transitions Institute",
    description: "Acquisition to legacy, navigating dental transitions with certainty",
    logo: "/practice-transitions-institute-logo.png",
    logoAlt: 'Practice Transitions Institute logo with the words "Acquisition to legacy, navigating dental transitions with certainty"',
    url: "https://practicetransitionsinstitute.com/",
  },
]

export function Partners() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-white/65 to-background" id="partners">
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
          {partners.map((partner) => {
            const { name, description, logo, logoAlt, url } = partner
            return (
              <div
                key={name}
                className="border border-border/40 bg-white rounded-2xl p-8 flex flex-col items-stretch text-center gap-6 shadow-[0_28px_65px_-35px_rgba(42,36,33,0.45)] transition-transform hover:-translate-y-1 hover:shadow-[0_32px_70px_-30px_rgba(66,93,82,0.35)]"
              >
                <div className="aspect-[16/9] w-full rounded-xl border border-border/50 bg-white flex items-center justify-center overflow-hidden shadow-[0_18px_40px_-35px_rgba(42,36,33,0.45)]">
                  <img
                    src={logo || "/placeholder-logo.png"}
                    alt={logoAlt || `${name} logo`}
                    className="max-h-full max-w-full object-contain p-5"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-foreground leading-tight text-balance">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-primary/25 bg-primary/5 px-5 py-2 text-xs font-mono uppercase tracking-[0.35em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      Visit Site
                    </a>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
