function normalizeUrl(url: string) {
  return url.trim().replace(/\/+$/, "")
}

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicitUrl) return normalizeUrl(explicitUrl)

  if (process.env.VERCEL_ENV === "production") {
    return "https://www.dentistretreat.com"
  }

  if (process.env.VERCEL_URL) {
    return normalizeUrl(`https://${process.env.VERCEL_URL}`)
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000"
  }

  return "https://www.dentistretreat.com"
}

