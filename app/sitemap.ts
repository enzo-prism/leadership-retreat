import type { MetadataRoute } from "next"

import { getSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return [
    { url: `${siteUrl}/`, lastModified },
    { url: `${siteUrl}/register`, lastModified },
    { url: `${siteUrl}/contact`, lastModified },
  ]
}
