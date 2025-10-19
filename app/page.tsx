import { Hero } from "@/components/hero"
import { WelcomeLetter } from "@/components/welcome-letter"
import { EventDetails } from "@/components/event-details"
import { PastRetreats } from "@/components/past-retreats"
import { Venue } from "@/components/venue"
import { ProgramOverview } from "@/components/program-overview"
import { Agenda } from "@/components/agenda"
import { Accommodations } from "@/components/accommodations"
import { Partners } from "@/components/partners"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WelcomeLetter />
      <PastRetreats />
      <EventDetails />
      <ProgramOverview />
      <Agenda />
      <Venue />
      <Accommodations />
      <Partners />
      <Footer />
    </main>
  )
}
