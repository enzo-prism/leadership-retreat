import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/historic-savannah-georgia-waterfront-at-sunset-wit.jpg"
          alt="Savannah waterfront"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">Third Annual</p>
          <h1 className="text-7xl md:text-9xl font-light text-primary mb-6 tracking-tight">
            Leadership
            <br />
            Retreat
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-primary font-mono text-sm uppercase tracking-widest mb-8">
            <span>Savannah, Georgia</span>
            <span className="hidden md:inline">•</span>
            <span>June 4–6, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>The Thompson Savannah</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-mono uppercase tracking-wider"
            asChild
          >
            <Link href="#register">Register Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base font-mono uppercase tracking-wider bg-transparent"
            asChild
          >
            <Link href="#details">View Details</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
