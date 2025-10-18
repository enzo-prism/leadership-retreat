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
            Don't miss this opportunity to connect, grow, and be inspired in historic Savannah. Spaces are limited.
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

          <Button
            type="submit"
            size="lg"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-base font-mono uppercase tracking-wider"
          >
            Submit Registration
          </Button>

          <p className="text-sm text-center text-muted-foreground pt-4">
            Questions? Contact us at{" "}
            <a href="mailto:retreat@example.com" className="text-secondary hover:underline">
              retreat@example.com
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}
