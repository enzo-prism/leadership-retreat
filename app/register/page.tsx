"use client"

import Link from "next/link"
import { useMemo, useState, type ReactNode } from "react"
import { BedDouble, ClipboardList, CreditCard, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Attendee = {
  id: number
  firstName: string
  lastName: string
  email: string
  package: "full" | "light"
}

type ContactInfo = {
  name: string
  email: string
  phone: string
  organization: string
}

const EVENT = {
  name: "Leadership Retreat 2026",
  dates: {
    start: "2026-06-04",
    end: "2026-06-06",
  },
  venue: {
    name: "The Thompson Savannah",
    address: "201 Port St, Savannah, GA 31401",
    groupCode: "LDRS",
    groupLink: "https://www.hyatt.com/en-US/group-booking/SAVTH/G-LDRS",
    rate: 249,
    feesNote: "$6/day GA lodging & historic fee",
    honorsPrePost: true,
  },
  agenda: [
    {
      date: "2026-06-04",
      items: [
        { time: "12:30pm–5:00pm", label: "Registration & Meeting" },
        { time: "5:00pm–6:30pm", label: "Reception" },
      ],
    },
    {
      date: "2026-06-05",
      items: [
        { time: "8:00am–8:30am", label: "Breakfast" },
        { time: "8:30am–12:00pm", label: "Meeting" },
        { time: "12:30pm–4:30pm", label: "Special Event" },
      ],
    },
    {
      date: "2026-06-06",
      items: [
        { time: "8:00am–8:30am", label: "Breakfast" },
        { time: "8:30am–12:00pm", label: "Meeting" },
      ],
    },
  ],
  cancellationPolicy: [
    "Cancellations within 21 days of the event may incur a $400 per person fee.",
    "If your room cannot be resold, hotel attrition charges may apply to you.",
  ],
}

const STEPS = [
  { id: 1, title: "Contact", description: "Share who we should reach out to with confirmations and updates." },
  { id: 2, title: "Packages", description: "Add attendees and choose the experience that fits each person." },
]

const PRICING = {
  fullIndividual: 1675,
  fullBundle: 2475,
  light: 400,
}

const FAQ_ITEMS: { question: string; answer: ReactNode }[] = [
  {
    question: "When is the deadline for additional participants?",
    answer: (
      <p>
        Please share additional attendee names and contact information by March 15 so we can tailor the experience.
      </p>
    ),
  },
  {
    question: "What’s included in registration?",
    answer: (
      <p>
        All retreat programming, curated experiences, hosted meals, and materials. Hotel, travel, and optional excursions
        are booked separately.
      </p>
    ),
  },
  {
    question: "How do dietary or accessibility accommodations work?",
    answer: (
      <p>
        Use the notes field in Step 2 to share allergy, dietary, mobility, or sensory needs and our team will follow up
        directly.
      </p>
    ),
  },
  {
    question: "What is the dress code?",
    answer: <p>Smart casual. Think light layers for meeting rooms, comfortable shoes for city exploration.</p>,
  },
  {
    question: "Is parking available?",
    answer: (
      <p>
        Valet parking is available onsite. The Thompson also offers complimentary house bikes and a house car service
        (first come, first served).
      </p>
    ),
  },
  {
    question: "How do I pay?",
    answer: (
      <div className="space-y-2">
        <p>Secure your space with a deposit or payment in full by 2025.</p>
        <p>Additional guest event fees and any remaining balance are due February 15, 2026.</p>
        <p>Pay by check or Zelle. Questions? Call 415-309-0345.</p>
        <p>Make check payable to Connect the Dots. Mail to 36 Baker St, San Francisco, CA 94117.</p>
        <p>You can pay your invoice quickly and securely through Zelle.</p>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Steps to Pay:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Log in to your bank’s mobile app or online banking.</li>
            <li>Select Send Money with Zelle®.</li>
            <li>Enter my Zelle email/phone: 415-309-0345.</li>
            <li>Enter the payment amount and confirm.</li>
          </ol>
        </div>
      </div>
    ),
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)
}

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date(date))
}

type AttendeeField = "firstName" | "lastName" | "email"

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [contact, setContact] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    organization: "",
  })
  const [attendees, setAttendees] = useState<Attendee[]>(() => [
    {
      id: Date.now(),
      firstName: "",
      lastName: "",
      email: "",
      package: "full",
    },
  ])
  const [notes, setNotes] = useState("")

  const pricingSummary = useMemo(() => {
    const fullCount = attendees.filter((attendee) => attendee.package === "full").length
    const lightCount = attendees.filter((attendee) => attendee.package === "light").length
    const bundleCount = Math.floor(fullCount / 2)
    const remainingFull = fullCount % 2
    const fullTotal = bundleCount * PRICING.fullBundle + remainingFull * PRICING.fullIndividual
    const lightTotal = lightCount * PRICING.light
    return {
      fullCount,
      lightCount,
      bundleCount,
      fullTotal,
      lightTotal,
      total: fullTotal + lightTotal,
    }
  }, [attendees])

  const progressPercent = STEPS.length > 1 ? (currentStep / (STEPS.length - 1)) * 100 : 100
  const totalDue = pricingSummary.total

  const isStepValid = () => {
    if (currentStep === 0) {
      return contact.name.trim() !== "" && contact.email.trim() !== "" && contact.phone.trim() !== ""
    }
    if (currentStep === 1) {
      if (attendees.length === 0) {
        return false
      }
      return attendees.every(
        (attendee) =>
          attendee.firstName.trim() !== "" &&
          attendee.lastName.trim() !== "" &&
          attendee.email.trim() !== "" &&
          (attendee.package === "full" || attendee.package === "light"),
      )
    }
    return true
  }

  const handleContinue = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleAttendeeChange = (id: number, field: AttendeeField, value: string) => {
    setAttendees((prev) =>
      prev.map((attendee) => (attendee.id === id ? { ...attendee, [field]: value } : attendee)),
    )
  }

  const handlePackageChange = (id: number, option: Attendee["package"]) => {
    setAttendees((prev) =>
      prev.map((attendee) => (attendee.id === id ? { ...attendee, package: option } : attendee)),
    )
  }

  const handleAddAttendee = () => {
    setAttendees((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        firstName: "",
        lastName: "",
        email: "",
        package: "full",
      },
    ])
  }

  const handleRemoveAttendee = (id: number) => {
    setAttendees((prev) => prev.filter((attendee) => attendee.id !== id))
  }

  const handleSubmit = () => {
    setHasSubmitted(true)
  }

  const renderContactStep = () => (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Registration contact</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll send confirmations, invoice details, and retreat updates to this primary contact.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact-name">Full name</Label>
              <Input
                id="contact-name"
                value={contact.name}
                onChange={(event) => setContact((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Who should we keep in the loop?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={contact.email}
                onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="name@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={contact.phone}
                onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))}
                placeholder="(###) ###-####"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact-organization">Organization (optional)</Label>
              <Input
                id="contact-organization"
                value={contact.organization}
                onChange={(event) => setContact((prev) => ({ ...prev, organization: event.target.value }))}
                placeholder="Company, team, or group name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPackagesStep = () => (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium">Attendees & packages</h3>
            <p className="text-sm text-muted-foreground">
              Add each attendee and choose the experience that fits. Mix full and light experiences as needed.
            </p>
          </div>
          <Button type="button" size="sm" onClick={handleAddAttendee}>
            Add attendee
          </Button>
        </div>
        <p className="mt-4 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">
          Pairs of full experience attendees automatically receive the bundled {formatCurrency(PRICING.fullBundle)} rate.
        </p>
        <div className="mt-6 space-y-4">
          {attendees.map((attendee, index) => (
            <div key={attendee.id} className="space-y-4 rounded-xl border border-border/80 bg-background/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Attendee #{index + 1}</div>
                {attendees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAttendee(attendee.id)}
                    className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-accent"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`attendee-${attendee.id}-first`}>First name</Label>
                  <Input
                    id={`attendee-${attendee.id}-first`}
                    value={attendee.firstName}
                    onChange={(event) => handleAttendeeChange(attendee.id, "firstName", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`attendee-${attendee.id}-last`}>Last name</Label>
                  <Input
                    id={`attendee-${attendee.id}-last`}
                    value={attendee.lastName}
                    onChange={(event) => handleAttendeeChange(attendee.id, "lastName", event.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`attendee-${attendee.id}-email`}>Email</Label>
                  <Input
                    id={`attendee-${attendee.id}-email`}
                    type="email"
                    value={attendee.email}
                    onChange={(event) => handleAttendeeChange(attendee.id, "email", event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Package</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        value: "full" as const,
                        label: "Full experience",
                        description: "All sessions, curated experiences, and hosted meals",
                        price: PRICING.fullIndividual,
                      },
                      {
                        value: "light" as const,
                        label: "Light experience",
                        description: "Non-session events only (meals, special activities)",
                        price: PRICING.light,
                      },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePackageChange(attendee.id, option.value)}
                      className={`rounded-lg border p-4 text-left transition-colors ${
                        attendee.package === option.value ? "border-primary bg-primary/10" : "border-border bg-card"
                      }`}
                    >
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
                      <p className="mt-3 text-sm font-medium">{formatCurrency(option.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" size="sm" onClick={handleAddAttendee}>
            Add another attendee
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-border/80 bg-card/80 p-6">
        <Label htmlFor="notes" className="text-sm font-medium text-foreground">
          Anything else to share? (optional)
        </Label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-3 min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="Include accessibility needs, celebrations, or scheduling notes."
        />
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderContactStep()
      case 1:
      default:
        return renderPackagesStep()
    }
  }

  const renderSummaryCard = () => (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="space-y-6 rounded-xl border border-border bg-card/95 p-6 shadow-lg shadow-primary/10">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Registration Contact</p>
          <p className="mt-3 text-sm font-medium text-foreground">{contact.name || "Contact pending"}</p>
          {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
          {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
          {contact.organization && (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{contact.organization}</p>
          )}
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Packages</p>
          {pricingSummary.fullCount === 0 && pricingSummary.lightCount === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Add attendees to see pricing details.</p>
          ) : (
            <div className="mt-3 space-y-2 text-sm">
              {pricingSummary.fullCount > 0 && (
                <div className="flex items-center justify-between">
                  <span>Full experience ({pricingSummary.fullCount})</span>
                  <span>{formatCurrency(pricingSummary.fullTotal)}</span>
                </div>
              )}
              {pricingSummary.lightCount > 0 && (
                <div className="flex items-center justify-between">
                  <span>Light experience ({pricingSummary.lightCount})</span>
                  <span>{formatCurrency(pricingSummary.lightTotal)}</span>
                </div>
              )}
              {pricingSummary.bundleCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  Includes {pricingSummary.bundleCount} bundle{pricingSummary.bundleCount > 1 ? "s" : ""} at {formatCurrency(PRICING.fullBundle)}.
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Attendees</p>
          <ul className="mt-3 space-y-2 text-sm">
            {attendees.map((attendee) => (
              <li key={attendee.id} className="rounded-md border border-border/60 bg-card/80 p-3">
                <p className="font-medium text-foreground">
                  {attendee.firstName || "First name"} {attendee.lastName}
                </p>
                {attendee.email && <p className="text-xs text-muted-foreground">{attendee.email}</p>}
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {attendee.package === "full" ? "Full experience" : "Light experience"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {notes.trim() && (
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Notes</p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{notes.trim()}</p>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Estimated total</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalDue)}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            We&rsquo;ll follow up with payment instructions once we receive your submission.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            A 50% deposit is due at the time of enrollment, and the balance is due February 15, 2026.
          </p>
        </div>
      </div>
    </aside>
  )
  if (hasSubmitted) {
    return (
      <main className="min-h-screen bg-background py-24 px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-accent">Registration Received</p>
          <h1 className="text-4xl font-light text-balance">
            Thanks for sharing your roster. We&apos;ll be in touch shortly with next steps.
          </h1>
          <p className="text-sm text-muted-foreground">
            Our team will confirm attendee details and send payment options within one business day. Need to adjust anything?
            Email{" "}
            <a href="mailto:marylynnwheaton@gmail.com" className="underline-offset-4 hover:underline">
              marylynnwheaton@gmail.com
            </a>{" "}
            or{" "}
            <a href="mailto:elizabetharmato@gmail.com" className="underline-offset-4 hover:underline">
              elizabetharmato@gmail.com
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/">Return to homepage</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={EVENT.venue.groupLink} target="_blank" rel="noreferrer">
                Book hotel at Hyatt
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background" />
        <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-[-45%] left-[-10%] h-96 w-96 rounded-full bg-accent/25 blur-3xl opacity-60" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.35em] text-primary">
              Registration
            </span>
            <h1 className="text-4xl font-light text-balance text-foreground sm:text-5xl md:text-6xl">{EVENT.name}</h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Complete the quick registration form below to secure your place at the retreat.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/60 py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-border/70 bg-background/95 p-8 shadow-lg shadow-primary/5">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">How It Works</p>
            <h2 className="mt-4 text-3xl font-light">Simple registration process</h2>
            <ol className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              {[
                {
                  title: "Complete the registration form",
                  description:
                    "Share your contact details, attendee roster, and package selections. You can mix full and light experiences for your team.",
                  icon: ClipboardList,
                },
                {
                  title: "Reserve rooms at the Thompson Savannah",
                  description: "Use the Hyatt group link to secure your stay at the retreat rate once your form is submitted.",
                  icon: BedDouble,
                },
                {
                  title: "Watch for an email from Liz or ML",
                  description:
                    "We'll follow up using the contact details you provided with a confirmation tailored to the packages you selected.",
                  icon: Mail,
                },
                {
                  title: "Submit payment",
                  description:
                    "Follow the instructions from Liz and ML to finalize your balance and lock in your retreat experience.",
                  icon: CreditCard,
                },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <li
                    key={step.title}
                    className="rounded-xl border border-border/70 bg-background/95 p-5 shadow-sm transition-transform hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <Link
                href="#registration"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 font-mono uppercase tracking-[0.3em] hover:border-primary hover:text-primary"
              >
                Start registration
              </Link>
              <Link
                href={EVENT.venue.groupLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 font-mono uppercase tracking-[0.3em] hover:border-primary hover:text-primary"
              >
                Hyatt group link ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="registration" className="relative border-t border-border/50 bg-background pb-12 pt-14 md:pb-16 md:pt-16 scroll-mt-28">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-secondary/15 via-background/0 to-transparent md:h-32" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
          <div className="flex-1 space-y-8">
            <div className="md:hidden sticky top-0 z-30 -mx-4 bg-background/95 px-4 py-3 shadow-md shadow-primary/10">
              <div className="mb-2 flex items-center justify-between text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">
                <span>
                  Step {currentStep + 1} of {STEPS.length}
                </span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between rounded-xl border border-border/70 bg-background/95 p-6 shadow-sm">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Registration Progress</p>
                <p className="mt-3 text-lg font-medium">
                  {STEPS[currentStep].title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{STEPS[currentStep].description}</p>
              </div>
              <div className="flex gap-2">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`h-2 w-12 rounded-full ${index <= currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/95 p-6 shadow-lg shadow-primary/5 md:p-10">
              <div className="space-y-6">
                {renderStepContent()}
              </div>
              <div className="mt-10 hidden justify-between border-t border-border pt-6 md:flex">
                <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>
                  Back
                </Button>
                {currentStep < STEPS.length - 1 ? (
                  <Button onClick={handleContinue} disabled={!isStepValid()}>
                    Continue to {STEPS[currentStep + 1].title}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!isStepValid()}>
                    Confirm registration
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-[320px] lg:flex lg:justify-end">{renderSummaryCard()}</div>
        </div>

        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-card/95 px-4 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack} disabled={currentStep === 0}>
              Back
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button className="flex-1" size="lg" onClick={handleContinue} disabled={!isStepValid()}>
                Continue
              </Button>
            ) : (
              <Button className="flex-1" size="lg" onClick={handleSubmit} disabled={!isStepValid()}>
                Confirm registration
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 bg-card/80 pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto rounded-2xl border border-border bg-card/95 p-8 shadow-lg shadow-primary/5 max-w-4xl">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Venue & Travel</p>
          <h2 className="mt-4 text-3xl font-light">The Thompson Savannah</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Our riverfront home base blends Savannah&apos;s storied charm with modern luxury, giving us light-filled studios,
            an indoor/outdoor Sunroom, and effortless access to Eastern Wharf. Enjoy hosted experiences woven through the
            property plus time to explore the city.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-dashed border-border/70 bg-background/80 p-4 text-sm">
              <p className="font-medium">{EVENT.venue.name}</p>
              <p className="mt-1 text-muted-foreground">{EVENT.venue.address}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard?.writeText(`${EVENT.venue.name}, ${EVENT.venue.address}`)}
                >
                  Copy address
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`https://maps.google.com/?q=${encodeURIComponent(EVENT.venue.address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Maps
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-border/70 bg-background/80 p-4 text-sm">
              <p className="font-medium">Need the group rate?</p>
              <p className="mt-1 text-muted-foreground">
                Book via Hyatt.com or call{" "}
                <a href="tel:18002331234" className="text-primary underline-offset-4 hover:underline">
                  800-233-1234
                </a>
                . Group code: <strong>{EVENT.venue.groupCode}</strong>.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={EVENT.venue.groupLink} target="_blank" rel="noreferrer">
                    Book at group rate
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="tel:18002331234">Call Hyatt</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
