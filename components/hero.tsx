"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type HeroSlide = {
  src: string
  alt: string
  label: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668020/The_event_gang_v3w7ka.webp",
    alt: "Group of Leadership Retreat attendees smiling together inside the conference room",
    label: "Reunion energy that sets the tone for LR26",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668019/Boat_top_jllkqg.webp",
    alt: "Leadership Retreat attendees on a yacht during a blue-sky afternoon",
    label: "Savannah’s riverfront vistas, experienced together",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668019/Beanie_gal_ghrfxk.webp",
    alt: "Close-up of an attendee laughing outdoors while wearing a beanie",
    label: "Laughter that comes naturally when the community reconnects",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668018/Peeps_vvif3t.webp",
    alt: "Attendees clinking glasses outdoors during golden hour",
    label: "Evening celebrations that turn conversations into commitments",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668018/Hugh_sqy0xy.webp",
    alt: "Retreat attendee enjoying a drink and relaxed conversation",
    label: "Simple moments where courageous leadership takes root",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761668020/Susan_and_Chris_qaremz.webp",
    alt: "Two attendees smiling with margaritas during the retreat",
    label: "Trusted friendships that make LR26 feel like family",
  },
  {
    src: "/retreat-happy-attendees.png",
    alt: "Retreat attendees smiling around a table during an indoor session",
    label: "Candid conversations that turn insight into action",
  },
  {
    src: "/retreat-group-talk.png",
    alt: "Facilitator guiding a group discussion with engaged participants",
    label: "Guided discussions designed to unlock courageous leadership",
  },
  {
    src: "/retreat-eating-together.png",
    alt: "Attendees sharing a meal together during the retreat",
    label: "Shared meals that nurture momentum and partnership",
  },
  {
    src: "/retreat-meeting.png",
    alt: "Retreat participants collaborating during a workshop session",
    label: "Collaborative workshops translating ideas into momentum",
  },
  {
    src: "/naples-retreat-group-shot.png",
    alt: "Leadership Retreat attendees gathered together in Naples, Florida",
    label: "Naples 2023 — the spark that grew our community",
  },
  {
    src: "/leadership-retreat-group-photo.png",
    alt: "Leadership Retreat community group photo from the Deer Valley gathering",
    label: "Deer Valley 2024 — fresh mountain perspective for what’s next",
  },
]

export function Hero() {
  const slides = HERO_SLIDES

  const slideCount = slides.length
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(((index % slideCount) + slideCount) % slideCount)
    },
    [slideCount],
  )

  const handlePrev = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const handleNext = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const timer = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? undefined
      : window.setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slideCount)
        }, 7000)

    return () => {
      if (timer) {
        window.clearInterval(timer)
      }
    }
  }, [slideCount])

  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(66,93,82,0.35)_0%,_transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[55%] bg-gradient-to-b from-primary/20 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse gap-8 px-4 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-8 lg:max-w-xl">
          <div className="space-y-6">
            <LogoMark size="lg" className="max-w-[18rem] drop-shadow-[0_35px_90px_-30px_rgba(0,0,0,0.4)]" />
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

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
            <span>Savannah, Georgia</span>
            <span className="hidden sm:inline">•</span>
            <span>June 4–6, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>The Thompson Savannah</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-background/90 via-white/55 to-background shadow-[0_32px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur md:max-w-md">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative h-full w-full flex-shrink-0">
                <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/30 transition hover:border-white/70 hover:bg-black/50"
                aria-label="Show previous photo"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/30 transition hover:border-white/70 hover:bg-black/50"
                aria-label="Show next photo"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
