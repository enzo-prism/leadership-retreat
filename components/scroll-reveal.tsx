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

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
