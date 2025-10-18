"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Registration submitted:", formData)
  }

  return (
    <section id="register" className="py-24 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-balance">Register Today</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Attendance is intentionally capped to preserve the intimacy and energy of our conversations. Returning
            members and new young leaders in dentistry are encouraged to reserve their spot early.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card text-card-foreground p-8 md:p-12 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-mono uppercase tracking-wider">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-mono uppercase tracking-wider">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-mono uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-mono uppercase tracking-wider">
              Company / Organization
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-mono uppercase tracking-wider">
              What would make LR26 remarkable for you?
            </Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full min-h-[120px] resize-y rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
              placeholder="Share priorities, questions, or introductions you'd love to make."
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-base font-mono uppercase tracking-wider"
          >
            Submit Registration
          </Button>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p className="uppercase font-mono tracking-widest text-xs text-primary-foreground/70">Connect with ML</p>
              <a href="mailto:marylynnwheaton@gmail.com" className="block text-secondary hover:underline">
                marylynnwheaton@gmail.com
              </a>
              <a href="tel:14152986710" className="block mt-1 hover:text-secondary">
                (415) 298-6710
              </a>
            </div>
            <div className="text-center md:text-left">
              <p className="uppercase font-mono tracking-widest text-xs text-primary-foreground/70">Connect with Liz</p>
              <a href="mailto:elizabetharmato@gmail.com" className="block text-secondary hover:underline">
                elizabetharmato@gmail.com
              </a>
              <a href="tel:14153090345" className="block mt-1 hover:text-secondary">
                (415) 309-0345
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
