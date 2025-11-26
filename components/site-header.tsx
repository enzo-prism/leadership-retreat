"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/#details" },
  { label: "Program", href: "/#program" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Venue", href: "/#venue" },
  { label: "Retreats", href: "/#journey" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/contact" },
]

function isLinkActive(pathname: string, hash: string, href: string) {
  if (href === "/") {
    return pathname === "/" && (hash === "" || hash === "#")
  }
  if (href.startsWith("/#")) {
    if (pathname !== "/") return false
    const targetHash = href.replace("/#", "#")
    return hash === targetHash
  }
  return pathname === href
}

export function SiteHeader() {
  const pathname = usePathname()
  const [hash, setHash] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash || "")
    updateHash()
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [])

  useEffect(() => {
    setHash(window.location.hash || "")
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex items-center" aria-label="Leadership Retreat Savannah emblem">
          <span className="sr-only">Leadership Retreat Savannah emblem</span>
          <LogoMark
            size="sm"
            variant="inline"
            className="h-9 w-auto transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 group-active:scale-95 md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition-[color,letter-spacing] duration-200 after:absolute after:left-1/2 after:bottom-[-6px] after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-accent after:opacity-0 after:transition-all after:duration-200 ${
                isLinkActive(pathname, hash, item.href)
                  ? "text-accent after:w-full after:opacity-100"
                  : "text-muted-foreground hover:text-foreground hover:tracking-[0.08em] hover:after:w-full hover:after:opacity-100 focus-visible:text-foreground focus-visible:after:w-full focus-visible:after:opacity-100"
              }`}
                  data-underline="true"
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
        <div className="border-t border-border/60 bg-primary px-4 pb-6 pt-3 text-primary-foreground md:hidden">
          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 transition-colors ${
                  isLinkActive(pathname, hash, item.href)
                    ? "bg-primary-foreground/10 text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-2 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
