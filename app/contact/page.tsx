import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactWizard from '@/components/contact/ContactWizard'
import DirectContactPills from '@/components/contact/DirectContactPills'

export const metadata: Metadata = {
  title: 'Get in Touch — TunedUp Workshop',
  description:
    'Start a project, join the workshop, or book a free call. We reply within one business day.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactWizard />
      <DirectContactPills />
    </>
  )
}
