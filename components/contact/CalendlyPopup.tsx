'use client'

import { useCallback, useEffect, useRef } from 'react'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string
        prefill?: {
          name?: string
          email?: string
        }
      }) => void
    }
  }
}

type CalendlyPopupProps = {
  url: string
  children: React.ReactNode
  className?: string
  prefill?: {
    name?: string
    email?: string
  }
}

export default function CalendlyPopup({
  url,
  children,
  className = '',
  prefill,
}: CalendlyPopupProps) {
  const scriptLoaded = useRef(false)
  const cssLoaded = useRef(false)

  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (
        e.origin === 'https://calendly.com' &&
        e.data?.event === 'calendly.event_scheduled'
      ) {
        console.log('Calendly booking confirmed:', e.data.payload)
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  const loadCSS = useCallback(() => {
    if (cssLoaded.current) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)
    cssLoaded.current = true
  }, [])

  const openCalendly = useCallback(() => {
    if (!url) {
      console.warn('CalendlyPopup: NEXT_PUBLIC_CALENDLY_URL is not set')
      return
    }

    loadCSS()

    const openWidget = () => {
      window.Calendly?.initPopupWidget({
        url,
        prefill: prefill ?? {},
      })
    }

    if (window.Calendly) {
      openWidget()
      return
    }

    if (scriptLoaded.current) {
      const wait = window.setInterval(() => {
        if (window.Calendly) {
          window.clearInterval(wait)
          openWidget()
        }
      }, 100)
      return
    }

    scriptLoaded.current = true
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = openWidget
    document.body.appendChild(script)
  }, [url, loadCSS, prefill])

  return (
    <button
      type="button"
      onClick={openCalendly}
      className={className}
      aria-label="Book a free 20-minute call"
    >
      {children}
    </button>
  )
}
