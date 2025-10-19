"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Experience", href: "/#details" },
  { label: "Program", href: "/#program" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Venue", href: "/#venue" },
  { label: "Retreats", href: "/#journey" },
  { label: "Partners", href: "/#partners" },
]

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }
  if (href.startsWith("/#")) {
    return pathname === "/"
  }
  return pathname === href
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3 text-left">
          <LogoMark size="sm" className="h-10 w-auto shrink-0 shadow-[0_20px_40px_-20px_rgba(31,76,59,0.55)]" />
          <div className="hidden text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground/80 sm:block">
            Leadership Retreat 2026
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                isLinkActive(pathname, item.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/register">Register</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 transition-colors ${
                  isLinkActive(pathname, item.href)
                    ? "bg-accent/10 text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
