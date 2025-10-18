import { Hero } from "@/components/hero"
import { WelcomeLetter } from "@/components/welcome-letter"
import { EventDetails } from "@/components/event-details"
import { PastRetreats } from "@/components/past-retreats"
import { Venue } from "@/components/venue"
import { Registration } from "@/components/registration"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WelcomeLetter />
      <EventDetails />
      <Venue />
      <PastRetreats />
      <Registration />
      <Footer />
    </main>
  )
}
