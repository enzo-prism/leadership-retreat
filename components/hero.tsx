import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      <div className="absolute inset-0 z-0">
        <img
          src="/historic-savannah-georgia-waterfront-at-sunset-wit.jpg"
          alt="Savannah waterfront"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:py-28 lg:py-32 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="bg-card/85 backdrop-blur border border-border/60 rounded-md shadow-lg p-6">
              <img
                src="/lr26-logo.svg"
                alt="Leadership Retreat 2026 Savannah Georgia logo"
                className="h-24 w-auto sm:h-28 md:h-32"
              />
            </div>
            <div className="text-center md:text-left space-y-4 max-w-2xl">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] sm:tracking-[0.45em] text-accent">
                Third Annual Gathering
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-primary drop-shadow-[0_10px_25px_rgba(35,29,26,0.12)]">
                Leadership Retreat 2026
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-light">
                Where Southern charm meets modern luxury on Savannah’s riverfront.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 text-foreground font-mono text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.55em]">
              <span>Savannah, Georgia</span>
              <span className="hidden sm:inline">•</span>
              <span>June 4–6, 2026</span>
              <span className="hidden sm:inline">•</span>
              <span>The Thompson Savannah</span>
            </div>
            <p className="text-[0.7rem] sm:text-xs md:text-sm text-foreground/80 font-mono uppercase tracking-[0.28em] sm:tracking-[0.4em] md:tracking-[0.45em] text-center md:text-right">
              Hosted by ML &amp; Liz for the Leadership Retreat community
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-mono uppercase tracking-wider shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="#register">Register Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-base font-mono uppercase tracking-wider bg-card/70 backdrop-blur"
              asChild
            >
              <Link href="#details">Explore the Experience</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
