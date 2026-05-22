import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { MenuOpenProvider } from '@/components/layout/MenuOpenContext'
import { SoundEnabledProvider } from '@/components/layout/SoundEnabledContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollSmootherInit from '@/components/layout/ScrollSmootherInit'
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
  openGraph: {
    title: 'TunedUp Mission Control',
    description: 'Fine Tuning Your Brand',
    url: 'https://tunedup.one',
    siteName: 'TunedUp Digital',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-[var(--canvas)] text-[var(--ink)] antialiased`}
      >
        {/* TEMP: re-enable ViewportDebugBar + RobotDebugProvider in layout when debugging */}
        <SoundEnabledProvider>
          <MenuOpenProvider>
            <ScrollSmootherInit />
            <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <Footer />
            </div>
          </div>
          </MenuOpenProvider>
        </SoundEnabledProvider>
      </body>
    </html>
  )
}
