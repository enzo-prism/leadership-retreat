import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | Leadership Retreat 2026",
  description: "Register for Leadership Retreat 2026 in Savannah, Georgia.",
}

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

