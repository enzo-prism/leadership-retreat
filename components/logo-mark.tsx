import { cn } from "@/lib/utils"

type LogoMarkProps = {
  size?: "sm" | "md" | "lg"
  className?: string
}

const LOGO_SRC = "/leadership-retreat-logo.webp"
const LOGO_ALT = "Leadership Retreat Savannah emblem"

const sizeMap: Record<NonNullable<LogoMarkProps["size"]>, string> = {
  sm: "h-12 sm:h-14",
  md: "h-16 sm:h-20",
  lg: "h-20 sm:h-24 md:h-28",
}

const paddingMap: Record<NonNullable<LogoMarkProps["size"]>, string> = {
  sm: "px-4 py-3 sm:px-5",
  md: "px-5 py-4 sm:px-6 sm:py-5",
  lg: "px-6 py-5 sm:px-8 sm:py-6",
}

export function LogoMark({ size = "md", className }: LogoMarkProps) {
  return (
    <div
      className={cn(
        "relative isolate inline-flex items-center justify-center overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-[0_25px_60px_-20px_rgba(36,28,22,0.65)]",
        paddingMap[size],
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/75 to-transparent" />
        <div className="absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(254,204,45,0.35)_0%,_transparent_65%)] opacity-70 blur-3xl" />
        <div className="absolute inset-0 rounded-[inherit] border border-white/20 mix-blend-soft-light" />
      </div>
      <img src={LOGO_SRC} alt={LOGO_ALT} className={cn("relative z-10 object-contain", sizeMap[size])} />
    </div>
  )
}

export const logoMarkSrc = LOGO_SRC
export const logoMarkAlt = LOGO_ALT
