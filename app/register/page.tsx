"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import { BedDouble, ClipboardList, CreditCard, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"

type ContactInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type PackageId = "full-individual" | "full-couple" | "light"

type SecondaryAttendee = {
  id: number
  firstName: string
  lastName: string
  relationship: string
}

type AttendeePackageSelection = PackageId | ""

const EVENT = {
  name: "Leadership Retreat 2026",
  venue: {
    name: "The Thompson Savannah",
    address: "201 Port St, Savannah, GA 31401",
    groupCode: "LDRS",
    groupLink: "https://www.hyatt.com/en-US/group-booking/SAVTH/G-LDRS",
    rate: 249,
    feesNote: "$6/day GA lodging & historic fee",
    honorsPrePost: true,
  },
}

const STEPS = [
  { id: "packages", title: "Select Packages", description: "Choose how many of each experience you need." },
  { id: "attendees", title: "Attendee Details", description: "Tell us about the people joining you." },
  { id: "notes", title: "Anything Else", description: "Share final notes or requests for our team." },
]

const PRICING = {
  fullIndividual: 1675,
  fullCouple: 2475,
  light: 400,
}

const PACKAGE_OPTIONS: {
  id: PackageId
  label: string
  description: string
  price: number
  attendeesPerPackage: number
}[] = [
  {
    id: "full-individual",
    label: "Full experience – individual",
    description: "All sessions, curated experiences, and hosted meals for one person.",
    price: PRICING.fullIndividual,
    attendeesPerPackage: 1,
  },
  {
    id: "full-couple",
    label: "Full experience – couple",
    description: "Shared experience for two attendees, including all sessions and hosted moments.",
    price: PRICING.fullCouple,
    attendeesPerPackage: 2,
  },
  {
    id: "light",
    label: "Light experience – individual",
    description: "Hosted meals and social gatherings (sessions not included).",
    price: PRICING.light,
    attendeesPerPackage: 1,
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)
}

const defaultPackageQuantities: Record<PackageId, number> = PACKAGE_OPTIONS.reduce(
  (acc, option) => ({ ...acc, [option.id]: 0 }),
  {} as Record<PackageId, number>,
)

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [contact, setContact] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [packageQuantities, setPackageQuantities] = useState<Record<PackageId, number>>(defaultPackageQuantities)
  const [secondaryAttendees, setSecondaryAttendees] = useState<SecondaryAttendee[]>([])
  const [attendeePackageSelections, setAttendeePackageSelections] = useState<AttendeePackageSelection[]>([])
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const packageLineItems = useMemo(
    () =>
      PACKAGE_OPTIONS.map((option) => {
        const quantity = packageQuantities[option.id] ?? 0
        return {
          ...option,
          quantity,
          total: option.price * quantity,
        }
      }).filter((item) => item.quantity > 0),
    [packageQuantities],
  )

  const attendeeCapacityByPackage = useMemo(
    () =>
      PACKAGE_OPTIONS.reduce((acc, option) => {
        const capacity = option.attendeesPerPackage * (packageQuantities[option.id] ?? 0)
        if (capacity > 0) {
          acc[option.id] = capacity
        }
        return acc
      }, {} as Record<PackageId, number>),
    [packageQuantities],
  )

  const totalAttendeesRequired = useMemo(
    () => Object.values(attendeeCapacityByPackage).reduce((sum, count) => sum + count, 0),
    [attendeeCapacityByPackage],
  )

  const requiredSecondaryCount = Math.max(totalAttendeesRequired - 1, 0)

  const lastStepIndex = STEPS.length - 1
  const safeCurrentStep = Math.min(currentStep, lastStepIndex)

  useEffect(() => {
    if (currentStep > lastStepIndex) {
      setCurrentStep(lastStepIndex)
    }
  }, [currentStep, lastStepIndex])

  useEffect(() => {
    setSecondaryAttendees((prev) => {
      if (requiredSecondaryCount > prev.length) {
        const difference = requiredSecondaryCount - prev.length
        const additions = Array.from({ length: difference }, () => ({
          id: Date.now() + Math.random(),
          firstName: "",
          lastName: "",
          relationship: "",
        }))
        return [...prev, ...additions]
      }
      if (requiredSecondaryCount < prev.length) {
        return prev.slice(0, requiredSecondaryCount)
      }
      return prev
    })
  }, [requiredSecondaryCount])

  useEffect(() => {
    setAttendeePackageSelections((prev) => {
      const trimmed = prev.slice(0, totalAttendeesRequired)
      while (trimmed.length < totalAttendeesRequired) {
        trimmed.push("")
      }
      const usage: Record<PackageId, number> = {}
      return trimmed.map((selection) => {
        if (!selection) {
          return ""
        }
        const allowed = attendeeCapacityByPackage[selection] ?? 0
        if (allowed === 0) {
          return ""
        }
        const used = usage[selection] ?? 0
        if (used >= allowed) {
          return ""
        }
        usage[selection] = used + 1
        return selection
      })
    })
  }, [totalAttendeesRequired, attendeeCapacityByPackage])

  const progressPercent = STEPS.length > 1 ? (safeCurrentStep / lastStepIndex) * 100 : 100
  const totalDue = packageLineItems.reduce((sum, item) => sum + item.total, 0)

  const assignedPackageCounts = useMemo(
    () =>
      attendeePackageSelections.reduce((acc, selection) => {
        if (!selection) {
          return acc
        }
        acc[selection] = (acc[selection] ?? 0) + 1
        return acc
      }, {} as Record<PackageId, number>),
    [attendeePackageSelections],
  )

  const isPrimaryComplete =
    contact.firstName.trim() !== "" &&
    contact.lastName.trim() !== "" &&
    contact.email.trim() !== "" &&
    contact.phone.trim() !== ""

  const areSecondaryAttendeesComplete = secondaryAttendees.every(
    (attendee) =>
      attendee.firstName.trim() !== "" &&
      attendee.lastName.trim() !== "" &&
      attendee.relationship.trim() !== "",
  )

  const arePackageAssignmentsComplete = useMemo(() => {
    if (attendeePackageSelections.length !== totalAttendeesRequired) {
      return false
    }
    if (attendeePackageSelections.some((selection) => selection === "")) {
      return false
    }
    return PACKAGE_OPTIONS.every((option) => {
      const required = attendeeCapacityByPackage[option.id] ?? 0
      const assigned = assignedPackageCounts[option.id] ?? 0
      return required === assigned
    })
  }, [attendeePackageSelections, totalAttendeesRequired, attendeeCapacityByPackage, assignedPackageCounts])

  const isStepValid = () => {
    const currentStepId = STEPS[safeCurrentStep]?.id
    if (currentStepId === "packages") {
      return totalAttendeesRequired > 0
    }
    if (currentStepId === "attendees") {
      return isPrimaryComplete && areSecondaryAttendeesComplete && arePackageAssignmentsComplete
    }
    return true
  }

  const handleContinue = () => {
    if (currentStep < lastStepIndex) {
      setCurrentStep((prev) => Math.min(prev + 1, lastStepIndex))
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  const setPackageQuantity = (id: PackageId, quantity: number) => {
    const safeQuantity = Number.isNaN(quantity) ? 0 : Math.max(0, Math.floor(quantity))
    setPackageQuantities((prev) => ({ ...prev, [id]: safeQuantity }))
  }

  const handleQuantityInputChange = (id: PackageId, value: string) => {
    const parsed = Number(value)
    setPackageQuantity(id, Number.isNaN(parsed) ? 0 : parsed)
  }

  const handleSecondaryAttendeeChange = (
    id: number,
    field: keyof Omit<SecondaryAttendee, "id">,
    value: string,
  ) => {
    setSecondaryAttendees((prev) => prev.map((attendee) => (attendee.id === id ? { ...attendee, [field]: value } : attendee)))
  }

  const handlePackageAssignmentChange = (index: number, packageId: AttendeePackageSelection) => {
    setAttendeePackageSelections((prev) => {
      const next = [...prev]
      next[index] = packageId
      return next
    })
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isStepValid()) {
      return
    }
    if (currentStep < lastStepIndex) {
      handleContinue()
      return
    }
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("https://formspree.io/f/mqanwerw", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: buildFormData(),
      })

      if (!response.ok) {
        throw new Error("Formspree submission failed")
      }

      setHasSubmitted(true)
    } catch (error) {
      console.error("Registration submission error", error)
      setSubmitError("We couldn't submit your registration. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPackageSelect = (attendeeIndex: number, label: string) => {
    const selection = attendeePackageSelections[attendeeIndex] ?? ""
    const selectId = `attendee-${attendeeIndex}-package`
    const selectablePackages = PACKAGE_OPTIONS.filter(
      (option) => (attendeeCapacityByPackage[option.id] ?? 0) > 0 || selection === option.id,
    )
    return (
      <div className="space-y-2">
        <Label htmlFor={selectId}>{label}</Label>
        <select
          id={selectId}
          value={selection}
          onChange={(event) => handlePackageAssignmentChange(attendeeIndex, event.target.value as AttendeePackageSelection)}
          aria-invalid={selection === "" ? true : undefined}
          className={`w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 ${selection === "" ? "text-muted-foreground" : "text-foreground"}`}
        >
          <option value="">Select a package</option>
          {selectablePackages.map((option) => {
            const capacity = attendeeCapacityByPackage[option.id] ?? 0
            if (capacity === 0 && selection !== option.id) {
              return null
            }
            const assigned = assignedPackageCounts[option.id] ?? 0
            const isCurrentSelection = selection === option.id
            const remaining = capacity - assigned + (isCurrentSelection ? 1 : 0)
            const disabled = remaining <= 0 && !isCurrentSelection
            return (
              <option key={option.id} value={option.id} disabled={disabled}>
                {option.label}
              </option>
            )
          })}
        </select>
        <p className="text-xs text-muted-foreground">Match attendees to packages based on your Step 1 selections.</p>
      </div>
    )
  }

  const getPackageLabel = (selection: AttendeePackageSelection | undefined) => {
    if (!selection) {
      return "Pending"
    }
    return PACKAGE_OPTIONS.find((option) => option.id === selection)?.label ?? "Pending"
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append("event", EVENT.name)
    formData.append("contact_first_name", contact.firstName)
    formData.append("contact_last_name", contact.lastName)
    formData.append("contact_email", contact.email)
    formData.append("contact_phone", contact.phone)

    PACKAGE_OPTIONS.forEach((option) => {
      const quantity = packageQuantities[option.id] ?? 0
      formData.append(`package_${option.id}_quantity`, String(quantity))
    })

    packageLineItems.forEach((item) => {
      formData.append("packages_selected[]", `${item.label} x ${item.quantity} (${formatCurrency(item.total)})`)
    })

    const attendeeEntries = [
      {
        label: "Primary attendee",
        firstName: contact.firstName,
        lastName: contact.lastName,
        relationship: "Primary contact",
        packageLabel: getPackageLabel(attendeePackageSelections[0]),
      },
      ...secondaryAttendees.map((attendee, index) => ({
        label: `Secondary attendee ${index + 1}`,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        relationship: attendee.relationship,
        packageLabel: getPackageLabel(attendeePackageSelections[index + 1]),
      })),
    ]

    attendeeEntries.forEach((attendee, index) => {
      formData.append(`attendees[${index}][label]`, attendee.label)
      formData.append(`attendees[${index}][first_name]`, attendee.firstName)
      formData.append(`attendees[${index}][last_name]`, attendee.lastName)
      formData.append(`attendees[${index}][relationship]`, attendee.relationship)
      formData.append(`attendees[${index}][package]`, attendee.packageLabel)
    })

    formData.append("total_due", formatCurrency(totalDue))
    formData.append("total_attendees", String(totalAttendeesRequired))

    if (notes.trim()) {
      formData.append("notes", notes.trim())
    }

    return formData
  }

  const renderAttendeeStep = () => {
    const attendeeLabel = totalAttendeesRequired === 1 ? "attendee" : "attendees"
    const secondaryCopy =
      requiredSecondaryCount > 0
        ? `We'll also capture ${requiredSecondaryCount} additional attendee${requiredSecondaryCount > 1 ? "s" : ""}.`
        : "No additional attendees required beyond the primary contact."
    return (
      <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Attendee details</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;ve reserved spots for {totalAttendeesRequired} {attendeeLabel}. {secondaryCopy} Assign each person to a
              package below so we know which experience they&apos;re attending.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold">Primary attendee</h4>
              <p className="text-xs text-muted-foreground">We&apos;ll send confirmations and invoices to this person.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-first-name">First name</Label>
                <Input
                  id="contact-first-name"
                  name="primaryFirstName"
                  autoComplete="given-name"
                  required
                  value={contact.firstName}
                  onChange={(event) => handleContactChange("firstName", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-last-name">Last name</Label>
                <Input
                  id="contact-last-name"
                  name="primaryLastName"
                  autoComplete="family-name"
                  required
                  value={contact.lastName}
                  onChange={(event) => handleContactChange("lastName", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="primaryEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.email}
                  onChange={(event) => handleContactChange("email", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone number</Label>
                <Input
                  id="contact-phone"
                  name="primaryPhone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={contact.phone}
                  onChange={(event) => handleContactChange("phone", event.target.value)}
                />
              </div>
              <div className="md:col-span-2">{renderPackageSelect(0, "Package selection for primary attendee")}</div>
            </div>
          </div>

        {requiredSecondaryCount > 0 && (
          <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold">Secondary attendees ({requiredSecondaryCount})</h4>
                <p className="text-xs text-muted-foreground">
                  We pre-fill the exact number of additional people based on your package quantities.
                </p>
              </div>
              <div className="space-y-4">
                {secondaryAttendees.map((attendee, index) => (
                  <div key={attendee.id} className="rounded-xl border border-border/70 bg-background/80 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                      Secondary attendee {index + 1}
                    </p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`secondary-${attendee.id}-first`}>First name</Label>
                        <Input
                          id={`secondary-${attendee.id}-first`}
                          name={`secondaryAttendees[${index}].firstName`}
                          autoComplete="off"
                          required
                          value={attendee.firstName}
                          onChange={(event) =>
                            handleSecondaryAttendeeChange(attendee.id, "firstName", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`secondary-${attendee.id}-last`}>Last name</Label>
                        <Input
                          id={`secondary-${attendee.id}-last`}
                          name={`secondaryAttendees[${index}].lastName`}
                          autoComplete="off"
                          required
                          value={attendee.lastName}
                          onChange={(event) =>
                            handleSecondaryAttendeeChange(attendee.id, "lastName", event.target.value)
                          }
                        />
                      </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`secondary-${attendee.id}-relationship`}>
                        Relationship to primary attendee
                      </Label>
                      <Input
                          id={`secondary-${attendee.id}-relationship`}
                          name={`secondaryAttendees[${index}].relationship`}
                          autoComplete="off"
                          required
                          value={attendee.relationship}
                          onChange={(event) =>
                            handleSecondaryAttendeeChange(attendee.id, "relationship", event.target.value)
                          }
                      />
                    </div>
                    <div className="md:col-span-2">
                      {renderPackageSelect(index + 1, `Package selection for secondary attendee ${index + 1}`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!arePackageAssignmentsComplete && totalAttendeesRequired > 0 && (
          <p className="text-xs text-destructive">
            Assign a package to each attendee to continue. Make sure your selections match the quantities from Step 1.
          </p>
        )}
      </div>
    </div>
  )
  }

  const renderPackageStep = () => (
    <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Select your packages</h3>
          <p className="text-sm text-muted-foreground">
            Set how many of each experience you need. Quantities start at zero so you can mix and match freely.
          </p>
        </div>
        <div className="space-y-4">
          {PACKAGE_OPTIONS.map((option) => {
            const quantity = packageQuantities[option.id] ?? 0
            const includesText = option.attendeesPerPackage === 1 ? "Includes 1 attendee" : "Includes 2 attendees"
            return (
              <div
                key={option.id}
                className="rounded-xl border border-border/70 bg-background/80 p-5 shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-2xl font-light">{formatCurrency(option.price)}</p>
                    <p className="text-xs text-muted-foreground">{includesText}</p>
                    {quantity > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {quantity} × {formatCurrency(option.price)} = {formatCurrency(option.price * quantity)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Decrease ${option.label}`}
                      onClick={() => setPackageQuantity(option.id, quantity - 1)}
                      disabled={quantity === 0}
                    >
                      -
                    </Button>
                    <Input
                      id={`package-${option.id}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={quantity}
                      onChange={(event) => handleQuantityInputChange(option.id, event.target.value)}
                      className="w-20 text-center"
                      aria-label={`${option.label} quantity`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Increase ${option.label}`}
                      onClick={() => setPackageQuantity(option.id, quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )


  const renderNotesStep = () => (
    <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Anything else to share?</h3>
          <p className="text-sm text-muted-foreground">
            Include accessibility needs, celebrations, or scheduling notes.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-[160px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="Let us know how we can make the experience memorable."
          />
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    const currentStepId = STEPS[safeCurrentStep]?.id
    if (currentStepId === "packages") {
      return renderPackageStep()
    }
    if (currentStepId === "attendees") {
      return renderAttendeeStep()
    }
    return renderNotesStep()
  }

  const renderSummaryCard = () => (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="space-y-6 rounded-xl border border-border bg-card/95 p-6 shadow-lg shadow-primary/10">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Registration contact</p>
          <p className="mt-3 text-sm font-medium text-foreground">
            {contact.firstName || contact.lastName ? `${contact.firstName} ${contact.lastName}`.trim() : "Contact pending"}
          </p>
          {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
          {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Packages selected</p>
          {packageLineItems.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Set a quantity above to preview totals.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {packageLineItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-card/80 px-3 py-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {item.label} <span className="text-xs text-muted-foreground">× {item.quantity}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.attendeesPerPackage === 1 ? "Includes 1 attendee" : "Includes 2 attendees"}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{formatCurrency(item.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Attendees</p>
          <div className="mt-3 space-y-2 text-sm">
            <div>
              <p className="font-medium text-foreground">
                Primary: {contact.firstName || contact.lastName ? `${contact.firstName} ${contact.lastName}`.trim() || "Name pending" : "Name pending"}
              </p>
              <p className="text-xs text-muted-foreground">Package: {getPackageLabel(attendeePackageSelections[0])}</p>
            </div>
            {requiredSecondaryCount > 0 ? (
              <ul className="space-y-2 text-muted-foreground">
                {secondaryAttendees.map((attendee, index) => (
                  <li key={attendee.id} className="rounded-md border border-border/60 bg-card/60 p-3 text-sm">
                    <p className="font-medium text-foreground">
                      Secondary {index + 1}: {attendee.firstName || attendee.lastName ? `${attendee.firstName} ${attendee.lastName}`.trim() || "Name pending" : "Name pending"}
                      {attendee.relationship && (
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80"> - {attendee.relationship}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Package: {getPackageLabel(attendeePackageSelections[index + 1])}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No additional attendees required.</p>
            )}
          </div>
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
            We'll follow up with payment instructions once we receive your submission.
          </p>
        </div>
      </div>
    </aside>
  )
  if (hasSubmitted) {
    return (
      <main className="min-h-screen bg-background py-24 px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-accent">Registration complete</p>
          <h1 className="text-4xl font-light text-balance">Thank you!</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve received your submission. Liz or ML will email {contact.email ? contact.email : "you"} shortly with next steps.
          </p>
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
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
                  Step {safeCurrentStep + 1} of {STEPS.length}
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
                  {STEPS[safeCurrentStep]?.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{STEPS[safeCurrentStep]?.description}</p>
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

            <form
              id="registration-form"
              onSubmit={handleFormSubmit}
              className="rounded-2xl border border-border/70 bg-background/95 p-6 shadow-lg shadow-primary/5 md:p-10"
            >
              <div className="space-y-6">{renderStepContent()}</div>
              <div className="mt-10 hidden justify-between border-t border-border pt-6 md:flex">
                <Button type="button" variant="ghost" onClick={handleBack} disabled={currentStep === 0 || isSubmitting}>
                  Back
                </Button>
                <Button type="submit" disabled={!isStepValid() || isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting
                    ? "Submitting..."
                    : currentStep < lastStepIndex
                    ? `Continue to ${STEPS[safeCurrentStep + 1]?.title ?? "Next"}`
                    : "Submit registration"}
                </Button>
              </div>
              {submitError && (
                <p className="mt-4 text-sm text-destructive">{submitError}</p>
              )}
            </form>
          </div>

          <div className="lg:w-[320px] lg:flex lg:justify-end">{renderSummaryCard()}</div>
        </div>

        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-card/95 px-4 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </Button>
            <Button
              className="flex-1"
              size="lg"
              type="submit"
              form="registration-form"
              disabled={!isStepValid() || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep < lastStepIndex
                ? "Continue"
                : "Submit registration"}
            </Button>
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

      <Footer />
    </main>
  )
}
