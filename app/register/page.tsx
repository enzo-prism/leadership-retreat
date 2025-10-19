"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AdditionalParticipant = {
  id: number
  firstName: string
  lastName: string
  email: string
  relationship: string
}

type BillingContact = {
  name: string
  email: string
  phone: string
  company: string
  address: string
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
  { id: 1, title: "Attendees", description: "Tell us who’s coming and any special considerations." },
  { id: 2, title: "Hotel", description: "Reserve rooms at the Thompson Savannah when you’re ready." },
  { id: 3, title: "Payment", description: "Review pricing and billing details for your organization." },
  { id: 4, title: "Review & Confirm", description: "Confirm your details and acknowledge policies." },
]

const PRICING = {
  one: 1675,
  two: 2475,
  additional: 400,
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)
}

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date(date))
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [additionalParticipants, setAdditionalParticipants] = useState<AdditionalParticipant[]>([])
  const [form, setForm] = useState({
    package: "one",
    primary: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      organization: "",
      title: "",
    },
    coRegistrant: {
      firstName: "",
      lastName: "",
      email: "",
      relationship: "",
    },
    dietaryOrSpecial: "",
    celebration: "",
    inviteSuggestions: "",
    needRooms: false,
    rooms: 1,
    checkIn: "",
    checkOut: "",
    paymentMethod: "check",
    billingContact: {
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
    } as BillingContact,
  })

  const baseParticipants = form.package === "two" ? 2 : 1
  const basePrice = form.package === "two" ? PRICING.two : PRICING.one
  const totalDue = useMemo(() => {
    return basePrice + additionalParticipants.length * PRICING.additional
  }, [basePrice, additionalParticipants.length])

  const progressPercent = (currentStep / (STEPS.length - 1)) * 100

  const isStepValid = () => {
    if (currentStep === 0) {
      const { primary } = form
      return primary.firstName.trim() !== "" && primary.lastName.trim() !== "" && primary.email.trim() !== ""
    }
    if (currentStep === 2) {
      if (form.paymentMethod === "check") {
        const { name, email } = form.billingContact
        return name.trim() !== "" && email.trim() !== ""
      }
    }
    if (currentStep === 3) {
      return policyAccepted
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

  const upsertAdditionalParticipant = (id: number, field: keyof AdditionalParticipant, value: string) => {
    setAdditionalParticipants((prev) =>
      prev.map((participant) => (participant.id === id ? { ...participant, [field]: value } : participant)),
    )
  }

  const addAdditionalParticipant = () => {
    setAdditionalParticipants((prev) => [
      ...prev,
      { id: Date.now(), firstName: "", lastName: "", email: "", relationship: "" },
    ])
  }

  const removeAdditionalParticipant = (id: number) => {
    setAdditionalParticipants((prev) => prev.filter((participant) => participant.id !== id))
  }

  const handleSubmit = () => {
    setHasSubmitted(true)
  }

  const renderAttendeeStep = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-sm font-mono uppercase tracking-[0.35em] text-muted-foreground">Registration Type</Label>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: "one", label: "One participant", helper: `${formatCurrency(PRICING.one)}` },
            { value: "two", label: "Two participants", helper: `${formatCurrency(PRICING.two)}` },
            { value: "custom", label: "Add participants", helper: "Base + $400 each (due May 15)" },
          ].map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-md border p-4 text-left transition-colors ${
                form.package === option.value ? "border-accent bg-accent/10 text-accent-foreground" : "border-border bg-card"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={option.value}
                className="sr-only"
                checked={form.package === option.value}
                onChange={(event) => setForm((prev) => ({ ...prev, package: event.target.value }))}
              />
              <p className="text-sm font-semibold">{option.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{option.helper}</p>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Primary Registrant</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="primary-first">First name</Label>
            <Input
              id="primary-first"
              value={form.primary.firstName}
              onChange={(event) => setForm((prev) => ({ ...prev, primary: { ...prev.primary, firstName: event.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary-last">Last name</Label>
            <Input
              id="primary-last"
              value={form.primary.lastName}
              onChange={(event) => setForm((prev) => ({ ...prev, primary: { ...prev.primary, lastName: event.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary-email">Email</Label>
            <Input
              id="primary-email"
              type="email"
              value={form.primary.email}
              onChange={(event) => setForm((prev) => ({ ...prev, primary: { ...prev.primary, email: event.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary-mobile">Mobile</Label>
            <Input
              id="primary-mobile"
              value={form.primary.mobile}
              onChange={(event) => setForm((prev) => ({ ...prev, primary: { ...prev.primary, mobile: event.target.value } }))}
              placeholder="(###) ###-####"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary-organization">Organization (optional)</Label>
            <Input
              id="primary-organization"
              value={form.primary.organization}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, primary: { ...prev.primary, organization: event.target.value } }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary-title">Title (optional)</Label>
            <Input
              id="primary-title"
              value={form.primary.title}
              onChange={(event) => setForm((prev) => ({ ...prev, primary: { ...prev.primary, title: event.target.value } }))}
            />
          </div>
        </div>
      </div>

      {(form.package === "two" || form.package === "custom") && (
        <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
          <h3 className="text-lg font-medium">Additional Registrants</h3>
          {form.package === "two" && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="co-first">Second attendee first name</Label>
                <Input
                  id="co-first"
                  value={form.coRegistrant.firstName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, coRegistrant: { ...prev.coRegistrant, firstName: event.target.value } }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-last">Second attendee last name</Label>
                <Input
                  id="co-last"
                  value={form.coRegistrant.lastName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, coRegistrant: { ...prev.coRegistrant, lastName: event.target.value } }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-email">Second attendee email</Label>
                <Input
                  id="co-email"
                  type="email"
                  value={form.coRegistrant.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, coRegistrant: { ...prev.coRegistrant, email: event.target.value } }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-relationship">Relationship to primary (optional)</Label>
                <Input
                  id="co-relationship"
                  value={form.coRegistrant.relationship}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, coRegistrant: { ...prev.coRegistrant, relationship: event.target.value } }))
                  }
                />
              </div>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Add more attendees for {formatCurrency(PRICING.additional)} each (due May 15 for roster details).
              </p>
              <Button type="button" variant="outline" size="sm" onClick={addAdditionalParticipant}>
                Add attendee
              </Button>
            </div>

            {additionalParticipants.length > 0 && (
              <div className="space-y-6">
                {additionalParticipants.map((participant, index) => (
                  <div key={participant.id} className="rounded-md border border-dashed border-border/80 p-4">
                    <div className="mb-3 flex items-center justify-between text-sm font-medium">
                      <span>Additional Attendee #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeAdditionalParticipant(participant.id)}
                        className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>First name</Label>
                        <Input
                          value={participant.firstName}
                          onChange={(event) => upsertAdditionalParticipant(participant.id, "firstName", event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last name</Label>
                        <Input
                          value={participant.lastName}
                          onChange={(event) => upsertAdditionalParticipant(participant.id, "lastName", event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={participant.email}
                          onChange={(event) => upsertAdditionalParticipant(participant.id, "email", event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship to primary (optional)</Label>
                        <Input
                          value={participant.relationship}
                          onChange={(event) => upsertAdditionalParticipant(participant.id, "relationship", event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dietary">Food allergies or special requirements</Label>
          <textarea
            id="dietary"
            value={form.dietaryOrSpecial}
            onChange={(event) => setForm((prev) => ({ ...prev, dietaryOrSpecial: event.target.value }))}
            className="min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="Share dietary needs, accessibility accommodations, or anything we should prepare for."
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="celebration">Celebrating a special day? If so, what?</Label>
            <Input
              id="celebration"
              value={form.celebration}
              onChange={(event) => setForm((prev) => ({ ...prev, celebration: event.target.value }))}
              placeholder="Anniversaries, milestones, special news..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite">Who should we also invite?</Label>
            <textarea
              id="invite"
              value={form.inviteSuggestions}
              onChange={(event) => setForm((prev) => ({ ...prev, inviteSuggestions: event.target.value }))}
              className="min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="Introduce partners, colleagues, or rising leaders we should connect with."
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderHotelStep = () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-medium">Thompson Savannah Group Rate</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatCurrency(EVENT.venue.rate)}/night + {EVENT.venue.feesNote}. Group code <strong>{EVENT.venue.groupCode}</strong>.
              Limited block—book early.
            </p>
            {EVENT.venue.honorsPrePost && (
              <p className="mt-2 text-xs text-muted-foreground">
                Resort will honor the rate up to 3 days before/after if rooms are available.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:text-right">
            <Button asChild>
              <Link href={EVENT.venue.groupLink} target="_blank" rel="noreferrer">
                Book rooms at Hyatt
              </Link>
            </Button>
            <Button variant="outline" onClick={handleContinue}>
              I’ll book later
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-semibold">I need rooms</Label>
            <p className="text-xs text-muted-foreground">We’ll remind you to complete your Hyatt booking.</p>
          </div>
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, needRooms: !prev.needRooms }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.needRooms ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${
                form.needRooms ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {form.needRooms && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rooms">Rooms needed</Label>
              <Input
                id="rooms"
                type="number"
                min={1}
                value={form.rooms}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    rooms: Math.max(1, Number.parseInt(event.target.value || "1", 10)),
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-in">Check-in</Label>
              <Input
                id="check-in"
                type="date"
                value={form.checkIn}
                onChange={(event) => setForm((prev) => ({ ...prev, checkIn: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-out">Check-out</Label>
              <Input
                id="check-out"
                type="date"
                value={form.checkOut}
                onChange={(event) => setForm((prev) => ({ ...prev, checkOut: event.target.value }))}
              />
            </div>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          Room block is managed directly by the resort. Book via Hyatt.com or call{" "}
          <a href="tel:18002331234" className="text-primary underline-offset-4 hover:underline">
            800-233-1234
          </a>{" "}
          with group code <strong>{EVENT.venue.groupCode}</strong>.
        </p>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Registration Investment</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Registration covers immersive programming, curated experiences, and hosted meals during the retreat. Hotel is
          booked separately via the Hyatt group link.
        </p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>{baseParticipants} participant{baseParticipants > 1 ? "s" : ""}</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Additional participants ({additionalParticipants.length})</span>
            <span>{formatCurrency(additionalParticipants.length * PRICING.additional)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base font-medium">
            <span>Total due</span>
            <span>{formatCurrency(totalDue)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Preferred Payment Method</h3>
        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3 rounded-md border border-accent bg-accent/10 p-4">
            <input
              type="radio"
              name="payment-method"
              value="check"
              checked={form.paymentMethod === "check"}
              onChange={(event) => setForm((prev) => ({ ...prev, paymentMethod: event.target.value }))}
              className="mt-1"
            />
            <div>
              <p className="text-sm font-semibold">Pay by check</p>
              <p className="text-xs text-muted-foreground">
                Make checks payable to <strong>Connect the Dots</strong>, 36 Baker Street, San Francisco, CA 94117.
              </p>
            </div>
          </label>
          <p className="text-xs text-muted-foreground">
            Looking for card payment? Let us know in the notes and we’ll follow up if additional options become
            available.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Billing Contact</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          If different from the primary registrant, share who should receive invoices and confirmations.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billing-name">Name</Label>
            <Input
              id="billing-name"
              value={form.billingContact.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, billingContact: { ...prev.billingContact, name: event.target.value } }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-email">Email</Label>
            <Input
              id="billing-email"
              type="email"
              value={form.billingContact.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, billingContact: { ...prev.billingContact, email: event.target.value } }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-phone">Phone</Label>
            <Input
              id="billing-phone"
              value={form.billingContact.phone}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, billingContact: { ...prev.billingContact, phone: event.target.value } }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-company">Company</Label>
            <Input
              id="billing-company"
              value={form.billingContact.company}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, billingContact: { ...prev.billingContact, company: event.target.value } }))
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billing-address">Billing address</Label>
            <textarea
              id="billing-address"
              value={form.billingContact.address}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, billingContact: { ...prev.billingContact, address: event.target.value } }))
              }
              className="min-h-[96px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Attendee Summary</h3>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <p className="font-semibold">
              {form.primary.firstName} {form.primary.lastName}
            </p>
            <p className="text-muted-foreground">{form.primary.email}</p>
          </div>
          {form.package === "two" && (form.coRegistrant.firstName || form.coRegistrant.lastName) && (
            <div>
              <p className="font-semibold">
                {form.coRegistrant.firstName} {form.coRegistrant.lastName}
              </p>
              {form.coRegistrant.email && <p className="text-muted-foreground">{form.coRegistrant.email}</p>}
            </div>
          )}
          {additionalParticipants.length > 0 && (
            <div>
              <p className="font-semibold">Additional participants</p>
              <ul className="mt-2 space-y-2">
                {additionalParticipants.map((participant) => (
                  <li key={participant.id} className="rounded-md border border-dashed border-border/80 p-3">
                    <p className="font-medium">
                      {participant.firstName} {participant.lastName}
                    </p>
                    {participant.email && <p className="text-muted-foreground">{participant.email}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Hotel Plans</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {form.needRooms
            ? `You’ve requested ${form.rooms} room${form.rooms > 1 ? "s" : ""} from ${form.checkIn || "TBD"} to ${
                form.checkOut || "TBD"
              }. Booking is finalized on Hyatt.com with group code ${EVENT.venue.groupCode}.`
            : "You’ll handle hotel reservations separately via the Hyatt group link when you’re ready."}
        </p>
        <Button asChild variant="link" className="mt-3 px-0">
          <Link href={EVENT.venue.groupLink} target="_blank" rel="noreferrer">
            Open Hyatt booking link ↗
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Total Due & Payment Instructions</h3>
        <div className="mt-3 flex items-center justify-between text-base font-semibold">
          <span>Total due at registration</span>
          <span>{formatCurrency(totalDue)}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Make checks payable to <strong>Connect the Dots</strong>, 36 Baker Street, San Francisco, CA 94117. Please mail
          payment within 14 days of submission.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card/95 p-6 shadow-sm">
        <h3 className="text-lg font-medium">Cancellation Policy</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          {EVENT.cancellationPolicy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={policyAccepted}
            onChange={(event) => setPolicyAccepted(event.target.checked)}
            className="mt-[2px]"
          />
          <span>I understand and agree to the cancellation policy outlined above.</span>
        </label>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderAttendeeStep()
      case 1:
        return renderHotelStep()
      case 2:
        return renderPaymentStep()
      case 3:
      default:
        return renderReviewStep()
    }
  }

  const renderSummaryCard = () => (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="rounded-xl border border-border bg-card/95 p-6 shadow-lg shadow-primary/10">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Order Summary</p>
        <h3 className="mt-3 text-2xl font-light text-balance">{EVENT.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          June 4–6, 2026 • Savannah, GA
          <br />
          {EVENT.venue.name}
        </p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>{baseParticipants} attendee{baseParticipants > 1 ? "s" : ""}</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Additional ({additionalParticipants.length})</span>
            <span>{formatCurrency(additionalParticipants.length * PRICING.additional)}</span>
          </div>
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Total due</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalDue)}</p>
        </div>
        <div className="mt-6 space-y-3 text-xs text-muted-foreground">
          <p>Hotel booked separately via Hyatt link.</p>
          <p>Need help? Email marylynnwheaton@gmail.com or elizabetharmato@gmail.com.</p>
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
            Thank you! We’ll follow up with a confirmation email, payment instructions, and Hyatt booking details.
          </h1>
          <p className="text-sm text-muted-foreground">
            You’ll also receive a save &amp; resume link in case you need to update attendee information or add additional
            participants ahead of May 15.
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
      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background/80 to-accent/30" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 text-center md:text-left lg:flex-row lg:items-end">
          <div className="space-y-6 lg:flex-1">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-secondary-foreground/80">Registration</p>
            <h1 className="text-4xl font-light sm:text-5xl md:text-6xl text-secondary-foreground">{EVENT.name}</h1>
            <div className="space-y-1 text-sm uppercase tracking-[0.35em] text-secondary-foreground/80">
              <p>June 4–6, 2026 · Savannah, GA</p>
              <p>{EVENT.venue.name}</p>
            </div>
            <p className="text-base text-secondary-foreground/90 md:text-lg">
              Registration covers immersive learning labs, curated experiences, and hosted meals. Hotel accommodations are
              booked separately via our Thompson Savannah group rate.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
              <Button asChild size="lg">
                <a href="#registration">Register now</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/70 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition-colors"
              >
                <Link href={EVENT.venue.groupLink} target="_blank" rel="noreferrer">
                  Book hotel at group rate
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-secondary-foreground/90 hover:text-secondary-foreground"
              >
                <a href="#agenda">View agenda</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="registration" className="relative py-20 scroll-mt-28">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/15 via-background/0 to-transparent" />
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

            <div className="hidden md:flex items-center justify-between rounded-xl border border-border bg-card/80 p-6">
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

            <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-lg shadow-primary/5 md:p-10">
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

          <div className="lg:w-[320px]">{renderSummaryCard()}</div>
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

      <section id="agenda" className="bg-card py-20 scroll-mt-28">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Agenda At A Glance</p>
            <h2 className="text-4xl font-light md:text-5xl">Three days designed for momentum</h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Purposeful programming balanced with curated connection time at Savannah’s riverfront.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {EVENT.agenda.map((day) => (
              <div
                key={day.date}
                className="rounded-xl border border-border bg-background/80 p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                <p className="text-xs font-mono uppercase tracking-[0.35em] text-accent">
                  {formatDateLabel(day.date)}
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  {day.items.map((item) => (
                    <li key={item.label} className="rounded-md border border-border/60 bg-card/80 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">{item.time}</p>
                      <p className="mt-2 text-base font-medium">{item.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-border bg-card/95 p-8 shadow-lg shadow-primary/5">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Venue & Travel</p>
            <h2 className="mt-4 text-3xl font-light">The Thompson Savannah</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Our riverfront home base blends Savannah’s storied charm with modern luxury, giving us light-filled studios,
              an indoor/outdoor Sunroom, and effortless access to Eastern Wharf. Enjoy hosted experiences woven through
              the property plus curated time to explore the city.
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
          <div className="rounded-2xl border border-border bg-card/95 p-8 shadow-lg shadow-primary/5">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Cancellation Policy</p>
            <h3 className="mt-3 text-2xl font-light">Plan with confidence</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted-foreground">
              {EVENT.cancellationPolicy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button variant="link" className="mt-4 px-0 text-sm text-primary" asChild>
              <a href="#registration">Review policy at confirmation</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">FAQ</p>
            <h2 className="text-3xl font-light md:text-4xl">Common questions</h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Need something else? Reach out to ML (marylynnwheaton@gmail.com) or Liz (elizabetharmato@gmail.com).
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "When is the deadline for additional participants?",
                answer:
                  "Please share additional attendee names and contact information by May 15 so we can tailor the experience.",
              },
              {
                question: "What’s included in registration?",
                answer:
                  "All retreat programming, curated experiences, hosted meals, and materials. Hotel, travel, and optional excursions are booked separately.",
              },
              {
                question: "How do dietary or accessibility accommodations work?",
                answer:
                  "Note any allergy, dietary, mobility, or sensory needs in Step 1 and our team will confirm details with you directly.",
              },
              {
                question: "What is the dress code?",
                answer:
                  "Elevated smart casual. Think light layers for meeting rooms, comfortable shoes for city exploration, and festive attire for evening gatherings.",
              },
              {
                question: "Is parking available?",
                answer:
                  "Valet parking is available onsite. The Thompson also offers complimentary house bikes and a house car service (first come, first served).",
              },
              {
                question: "Can I pay by card?",
                answer:
                  "Checks are preferred for 2026. If you require card payment, let us know in Step 3 and we’ll follow up with available options.",
              },
            ].map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-background/80 p-6 shadow-sm">
                <p className="text-sm font-semibold text-foreground">{item.question}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
