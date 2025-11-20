"use client"

import { useEffect } from "react"

const selector = "[data-reveal]"

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))

    if (prefersReducedMotion.matches) {
      elements.forEach((el) => el.classList.add("reveal-active"))
      return
    }

    const activate = (el: HTMLElement) => el.classList.add("reveal-active")
    const inactive = () => elements.filter((el) => !el.classList.contains("reveal-active"))

    // Immediate pass for elements already in view (helps on mobile Safari)
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    inactive().forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < viewportHeight * 0.95 && rect.bottom > viewportHeight * 0.05) {
        activate(el)
      }
    })

    if (typeof IntersectionObserver === "undefined") {
      inactive().forEach(activate)
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(entry.target as HTMLElement)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    )

    inactive().forEach((el) => observer.observe(el))

    // Fallback: ensure nothing stays hidden if intersection never fires (e.g., aggressive mobile throttling)
    const safetyReveal = window.setTimeout(() => {
      inactive().forEach(activate)
    }, 2400)

    return () => {
      window.clearTimeout(safetyReveal)
      observer.disconnect()
    }
  }, [])

  return null
}
