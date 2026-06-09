import { NextResponse } from 'next/server'
import {
  sendContactEmails,
  validateContactSubmission,
} from '@/lib/email/contactSubmission'
import { syncContactSubmissionToHubSpot } from '@/lib/hubspot/contactSync'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = validateContactSubmission(body)

    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 400 })
    }

    await sendContactEmails(validation.payload)

    try {
      const hubspotResult = await syncContactSubmissionToHubSpot(validation.payload)
      if (hubspotResult) {
        console.info('HubSpot sync succeeded:', hubspotResult)
      }
    } catch (hubspotError) {
      console.error('HubSpot sync failed:', hubspotError)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again or email prem@tunedup.one directly.' },
      { status: 500 },
    )
  }
}
