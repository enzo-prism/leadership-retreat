import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { getSiteUrl } from "@/lib/site-url"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--app-font-sans",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--app-font-serif",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Leadership Retreat 2026 | Savannah, Georgia",
  description:
    "Join us for the third annual Leadership Retreat in historic Savannah, Georgia at The Thompson Savannah. June 4-6, 2026.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-9EEGYC258X"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date())
              gtag('config', 'G-9EEGYC258X')`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorantGaramond.variable} font-sans antialiased`}>
        {/* Hotjar Tracking Code for Dentist Retreat */}
        <Script
          id="hotjar-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}
              h._hjSettings={hjid:6598761,hjsv:6}
              a=o.getElementsByTagName('head')[0]
              r=o.createElement('script');r.async=1
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv
              a.appendChild(r)
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`,
          }}
        />
        <SiteHeader />
        <div className="pt-20">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
