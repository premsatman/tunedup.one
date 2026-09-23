import type { Metadata } from 'next'
import { LegalDocument, LegalLink, LegalList, LegalSection } from '@/components/legal/LegalDocument'
import { legalBusiness } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy — TunedUp Digital',
  description:
    'How TunedUp Digital Solutions collects, uses, and protects personal information from project inquiries, career notes, and this website.',
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="/ Privacy"
      title="Privacy"
      highlight="policy."
      intro={
        <>
          <p>
            {legalBusiness.name} (“TunedUp”, “we”, “us”) is a small digital studio in Hyderabad. We
            design and build websites, brand systems, mobile apps, advertising, SEO, and workflow
            automation for founders, churches, nonprofits, and other mission-driven organisations.
          </p>
          <p>
            This policy explains what personal information we collect through {legalBusiness.brand}{' '}
            at tunedup.one, why we collect it, and the choices you have. It is written for the
            Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
          </p>
        </>
      }
    >
      <LegalSection id="who" index={1} title="Who is responsible">
        <p>
          TunedUp is the data fiduciary for personal information collected through this website and
          our project conversations.
        </p>
        <LegalList
          items={[
            `Business: ${legalBusiness.name}`,
            `Registered office: ${legalBusiness.address}`,
            `Email: ${legalBusiness.email}`,
            `Phone: ${legalBusiness.phoneDisplay}`,
          ]}
        />
        <p>
          Questions and grievance requests go to{' '}
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink>. We
          aim to acknowledge them within one business day.
        </p>
      </LegalSection>

      <LegalSection id="collect" index={2} title="Information we collect">
        <p>We collect only what we need to answer you, scope work, or keep a career introduction.</p>
        <p>
          <strong className="font-medium text-[var(--ink)]">Start a project.</strong> The contact
          form asks for your name, email, organisation, phone number, the services you are
          considering, who the work is for, a budget range in USD or INR, and a short description of
          the project.
        </p>
        <p>
          <strong className="font-medium text-[var(--ink)]">Join the crew.</strong> If you introduce
          yourself for future freelance or part-time work, we collect your name, email, role,
          location, portfolio link, and the note you write about your work.
        </p>
        <p>
          <strong className="font-medium text-[var(--ink)]">A call.</strong> Booking a conversation
          opens Calendly. Your name and email may be passed through so the invite is already filled
          in. Calendly then collects the time you choose and any details you add there.
        </p>
        <p>
          <strong className="font-medium text-[var(--ink)]">Direct messages.</strong> If you email{' '}
          {legalBusiness.email}, call {legalBusiness.phoneDisplay}, or message us on a channel we
          publish, we keep that correspondence so we can reply and continue the work.
        </p>
        <p>
          <strong className="font-medium text-[var(--ink)]">This website.</strong> We store one
          preference in your browser: whether site sounds are on or off. We do not run advertising
          trackers or a third-party analytics product on these pages. Our host may keep standard
          server logs, such as IP address, browser type, and the page requested, to keep the site
          available and secure.
        </p>
      </LegalSection>

      <LegalSection id="use" index={3} title="How we use it">
        <p>We use personal information to:</p>
        <LegalList
          items={[
            'Reply to a project inquiry, usually within one business day',
            'Understand the organisation, services, and budget so a proposal is honest',
            'Schedule and hold a call',
            'Send a confirmation that we received your form',
            'Keep a career introduction on file for a future role that fits',
            'Deliver the work you hire us for, including client communication during a project',
            'Keep records we need for tax, accounting, and a dispute',
            'Protect the website from abuse',
          ]}
        />
        <p>
          Submitting a form, booking a call, or emailing us is your consent for those purposes. We
          do not sell personal information, and we do not use it to build advertising profiles.
        </p>
      </LegalSection>

      <LegalSection id="share" index={4} title="Who else handles it">
        <p>
          A small set of processors helps us reply and keep records. They receive only what that job
          requires.
        </p>
        <LegalList
          items={[
            'Resend sends the inquiry to our studio inbox and a confirmation to you',
            'HubSpot stores the contact and the project or career note in our CRM',
            'Calendly schedules the call when you use the booking widget',
            'Our hosting provider serves this website and may process technical logs',
          ]}
        />
        <p>
          Some of these companies process data outside India, including in the United States. We
          share information with them only to provide the service you asked for. If a project needs
          another tool — for example a client’s own Google Ads, hosting, or CMS account — we use it
          under that engagement, with access you approve.
        </p>
        <p>
          We may also disclose information if the law requires it, or to protect TunedUp, a client,
          or someone else from harm.
        </p>
      </LegalSection>

      <LegalSection id="retention" index={5} title="How long we keep it">
        <p>
          Project inquiries and call notes stay while a conversation is active, and then for as long
          as we need them to follow up, finish the work, or meet a legal record. Career
          introductions stay on file until you ask us to delete them or until they are no longer
          useful. Email correspondence is kept with the related project or inquiry. The sound
          preference stays in your browser until you clear site data.
        </p>
      </LegalSection>

      <LegalSection id="rights" index={6} title="Your choices">
        <p>You can ask us to:</p>
        <LegalList
          items={[
            'Confirm whether we hold personal information about you',
            'Share a summary of what we hold and how we use it',
            'Correct information that is inaccurate or incomplete',
            'Erase information we no longer need for a project, a legal duty, or an active dispute',
            'Raise a grievance about how we handled your information',
            'Nominate another person to exercise these rights if you are unable to',
          ]}
        />
        <p>
          Email{' '}
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink> with
          the address you used on the form so we can find the right record. We may ask for enough
          detail to confirm it is you. If you are not satisfied with our response, you may approach
          the Data Protection Board of India once the relevant rules are in force.
        </p>
      </LegalSection>

      <LegalSection id="children" index={7} title="Children">
        <p>
          This website and our services are for organisations and adults. We do not knowingly
          collect personal information from anyone under 18. If you believe a child has sent us
          information, email us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="security" index={8} title="Security">
        <p>
          Access to inquiries is limited to the people doing the work. Forms are sent over HTTPS.
          No method of transmission or storage is perfectly secure, so please avoid sending
          passwords, payment card numbers, or highly sensitive personal data through the contact
          form.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={9} title="Changes">
        <p>
          If we change how we collect or use personal information, we will update this page and the
          date at the top. The current version is the one published at{' '}
          <LegalLink href="/privacy">/privacy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={10} title="Contact">
        <p>
          {legalBusiness.name}
          <br />
          {legalBusiness.address}
          <br />
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink>
          <br />
          <LegalLink href={legalBusiness.phoneHref}>{legalBusiness.phoneDisplay}</LegalLink>
        </p>
        <p>
          How we work together is covered in our{' '}
          <LegalLink href="/terms">terms and conditions</LegalLink>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
