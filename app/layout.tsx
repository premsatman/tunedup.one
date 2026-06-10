import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { brandAssets } from '@/lib/brand'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TunedUp Mission Control — Fine Tuning Your Brand',
  description:
    "You're on the mission. We're mission control. Digital strategy, web development, automation, and growth for churches, NGOs, entrepreneurs, and startups.",
  metadataBase: new URL('https://tunedup.one'),
  icons: {
    icon: [
      { url: brandAssets.favicon, sizes: 'any' },
      { url: brandAssets.faviconSvg, type: 'image/svg+xml' },
      { url: brandAssets.favicon96, sizes: '96x96', type: 'image/png' },
    ],
    shortcut: brandAssets.favicon,
    apple: brandAssets.appleTouchIcon,
  },
  manifest: brandAssets.webManifest,
  openGraph: {
    title: 'TunedUp Mission Control',
    description: 'Fine Tuning Your Brand',
    url: 'https://tunedup.one',
    siteName: 'TunedUp Digital',
    type: 'website',
    images: [{ url: brandAssets.squareBlack, width: 500, height: 500, alt: 'TunedUp' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-[var(--canvas)] text-[var(--ink)] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
