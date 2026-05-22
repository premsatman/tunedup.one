import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // TODO: integrate Resend for email notifications
    // TODO: integrate n8n webhook for automation
    console.log('=== Contact Form Submission ===')
    console.log('Branch:', body.branch)
    console.log('Data:', JSON.stringify(body.data, null, 2))
    console.log('Submitted at:', body.submittedAt)
    console.log('==============================')

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
