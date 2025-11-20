import { Button } from "@/components/ui/button"
import { Building2, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"

const HERO_VIDEO = {
  src: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763650316/Realistic_Savannah_Video_Generation_uaadc4.mp4",
  alt: "Looping Savannah riverfront scene",
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(66,93,82,0.35)_0%,_transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[55%] bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO.src}
          muted
          loop
          autoPlay
          playsInline
          aria-label={HERO_VIDEO.alt}
          poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763650469/Screenshot_2025-11-20_at_6.53.51_AM_cg81mj.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-20 lg:py-28">
        <div className="flex flex-col gap-8 lg:max-w-3xl">
          <div className="space-y-5">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-foreground/60">Leadership Retreat 2026</p>
            <h1 className="text-4xl font-light text-balance text-foreground sm:text-5xl md:text-6xl">
              Savannah’s riverfront gathering for courageous leadership
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Three intentional days designed for returners and rising voices — deep connection, relevant insights, and
              moments that move us forward together.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/85 px-8 py-6 text-base font-mono uppercase tracking-[0.4em] shadow-lg shadow-accent/20"
              asChild
            >
              <Link href="/register">Register Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:text-foreground px-8 py-6 text-base font-mono uppercase tracking-[0.4em] backdrop-blur"
              asChild
            >
              <Link href="#details">Explore The Experience</Link>
            </Button>
          </div>

          <div className="space-y-2 text-base text-muted-foreground">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              <span>Savannah, Georgia</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              <span>June 4–6, 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              <Link href="#venue" className="text-foreground hover:text-accent transition-colors">
                The Thompson Savannah
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
