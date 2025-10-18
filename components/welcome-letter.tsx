export function WelcomeLetter() {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-4 text-balance">Welcome Back!</h2>
        <p className="text-center text-base md:text-lg text-accent uppercase tracking-[0.4em] mb-12">
          Where Southern Charm Meets Modern Luxury
        </p>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            From the sun-drenched shores of Naples in 2023 to the breathtaking peaks of Deer Valley in 2024, our
            Leadership Retreats have been incredible journeys of connection, growth, and shared insights. We're so
            grateful to all of you who have made these past events such resounding successes, and we're thrilled to
            build on that momentum.
          </p>

          <p className="text-xl md:text-2xl font-light leading-relaxed">
            This year, we're taking our third annual Leadership Retreat to the historic charm of Savannah, Georgia!
            We've chosen The Thompson Savannah, a stunning waterfront hotel that perfectly blends modern luxury with the
            city's rich heritage. Prepare for curated sessions with Brian Parsley, immersive conversations, and plenty of
            time to soak in the riverfront energy.
          </p>

          <p className="text-xl md:text-2xl font-light leading-relaxed">
            Read on for all the details on our exciting agenda, inspiring speakers, and unique Savannah experiences. We
            can't wait to welcome you back! So don't delay, register today!
          </p>

          <div className="pt-8 text-right">
            <p className="text-2xl font-light italic">Best,</p>
            <p className="text-2xl font-medium">ML and Liz</p>
          </div>
        </div>
      </div>
    </section>
  )
}
