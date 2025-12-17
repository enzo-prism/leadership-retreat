import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found | Leadership Retreat 2026",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-light text-balance sm:text-5xl">This page can&apos;t be found</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The link may be outdated, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
