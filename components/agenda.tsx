import { CalendarDays } from "lucide-react"

const schedule = [
  {
    day: "Thursday",
    date: "June 4",
    focus: "Arrival & Immersion",
    items: [
      { time: "12:30 PM", title: "Registration", detail: "Foyer, Barnwell Room" },
      { time: "1:00 PM", title: "Welcome with ML & Liz", detail: "Setting intentions for LR26" },
      { time: "1:30 PM", title: "Session with Brian Parsley", detail: "Custom learning lab" },
      { time: "5:00 PM", title: "Sunroom Reception", detail: "Indoor/Outdoor sunset gathering" },
      { time: "6:30 PM", title: "Evening Open", detail: "Savor Savannah’s dining scene" },
    ],
  },
  {
    day: "Friday",
    date: "June 5",
    focus: "Growth Conversations",
    items: [
      { time: "8:00 AM", title: "Breakfast", detail: "Foyer, Barnwell Room" },
      { time: "8:30 AM", title: "Learning Lab with Brian", detail: "Building momentum together" },
      { time: "12:30 PM", title: "Group Event & Free Afternoon", detail: "Explore with fellow attendees" },
    ],
  },
  {
    day: "Saturday",
    date: "June 6",
    focus: "Integration",
    items: [
      { time: "8:00 AM", title: "Breakfast", detail: "Foyer, Barnwell Room" },
      { time: "8:30 AM", title: "Partner Alliances Panel", detail: "Insights from CareCredit, CBG, PTS" },
      { time: "10:30 AM", title: "Putting It All Together", detail: "Closing remarks with ML" },
      { time: "12:00 PM", title: "Adjourn", detail: "See you next time!" },
    ],
  },
]

export function Agenda() {
  return (
    <section className="py-24 px-4 bg-card" id="agenda">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground">Agenda Snapshot</p>
            <h2 className="text-5xl md:text-6xl font-light text-balance">Three days designed for momentum and meaning</h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              A thoughtful cadence of discovery, connection, and celebration keeps our time together expansive yet
              digestible. Each experience is intentionally paced so you can explore Savannah while integrating key
              takeaways.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-border bg-background px-6 py-4">
            <CalendarDays className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Total contact time</p>
              <p className="text-lg font-medium">2 half-day labs + 1 integration morning</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {schedule.map((day) => (
            <article key={day.day} className="flex flex-col border border-border bg-background rounded-sm overflow-hidden">
              <header className="bg-secondary text-secondary-foreground px-6 py-5">
                <p className="text-xs font-mono uppercase tracking-[0.4em]">{day.day}</p>
                <h3 className="text-3xl font-medium mt-2">{day.date}</h3>
                <p className="text-sm text-secondary-foreground/80 mt-2">{day.focus}</p>
              </header>
              <ul className="divide-y divide-border">
                {day.items.map((item) => (
                  <li key={`${day.day}-${item.time}`} className="px-6 py-5 flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:w-24">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
