import type { Metadata } from 'next'
import { LegalDocument, LegalLink, LegalList, LegalSection } from '@/components/legal/LegalDocument'
import { legalBusiness } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms & Conditions — TunedUp Digital',
  description:
    'Terms for using the TunedUp Digital website and for starting a project with TunedUp Digital Solutions.',
}

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="/ Terms"
      title="Terms &"
      highlight="conditions."
      intro={
        <>
          <p>
            These terms cover your use of the {legalBusiness.brand} website and the way{' '}
            {legalBusiness.name} (“TunedUp”, “we”, “us”) starts and carries out client work. TunedUp
            is a small studio in Hyderabad. We build brand systems, websites and web apps, mobile
            apps, Google Ads and SEO, nonprofit Ad Grants support, email and content, and workflow
            automation for founders, churches, nonprofits, and startups.
          </p>
          <p>
            A signed proposal, statement of work, or invoice controls the commercial details of a
            specific project. Where those documents are silent, these terms apply. Using the
            website, sending an inquiry, or booking a call means you have read them.
          </p>
        </>
      }
    >
      <LegalSection id="website" index={1} title="Using this website">
        <p>
          The site is a portfolio and a way to start a conversation. Case studies describe work we
          have done for named organisations. They are not a promise that your project will look,
          cost, or perform the same way.
        </p>
        <p>
          You may browse the site for information about TunedUp. You may not copy our writing,
          design, or code for your own commercial site, scrape the site in a way that degrades it,
          or attempt to break, probe, or overload it. The TunedUp name, logo, and site design belong
          to us.
        </p>
      </LegalSection>

      <LegalSection id="services" index={2} title="What we do">
        <p>Depending on the brief, a project may include:</p>
        <LegalList
          items={[
            'Brand identity, voice, and design systems',
            'Websites, web apps, and headless CMS builds, including Next.js and Sanity',
            'iOS and Android applications',
            'Google Ads, SEO, email, and related growth work',
            'Support for eligible nonprofits applying to or running Google Ad Grants',
            'Workflow automation, integrations, and internal tools',
            'Strategy and ongoing care after launch',
          ]}
        />
        <p>
          We are a small crew. You will know who is doing the work. Freelance designers, developers,
          or writers may contribute under our direction. We remain responsible to you for the
          engagement.
        </p>
      </LegalSection>

      <LegalSection id="engagement" index={3} title="Starting a project">
        <p>
          An inquiry, a call, or an estimate is a conversation. Work begins when both sides accept a
          written proposal or statement of work that names the scope, timeline, and fee. Until then,
          neither side is obliged to proceed.
        </p>
        <p>
          If the scope changes, we will say so before the extra work starts and agree the effect on
          time and fee. We do not add surprise rounds of work, and we do not treat a vague “make it
          better” as a new deliverable without agreeing it first.
        </p>
        <p>
          Dates in a proposal assume timely feedback, content, and access from you. A delay on
          approvals, copy, logins, or third-party accounts moves the schedule by at least the length
          of that delay.
        </p>
      </LegalSection>

      <LegalSection id="fees" index={4} title="Fees and payment">
        <p>
          Fees, currency (INR or USD), and the payment schedule are set in the proposal or invoice.
          Unless that document says otherwise, we invoice a deposit before work starts and the
          balance at the milestones we agreed. Bank charges and currency conversion costs are yours.
        </p>
        <p>
          Advertising spend, domain names, hosting, app store fees, stock assets, fonts, and other
          third-party subscriptions are separate from our fee. You pay those vendors directly, or we
          invoice them at cost if we agree to place the order for you.
        </p>
        <p>
          If an invoice is overdue, we may pause work until it is paid. Ownership of final
          deliverables passes only after the fees for those deliverables are paid in full. Amounts
          already paid for work completed are not refundable. If you cancel before the work is
          finished, you pay for the work done up to the cancellation date, including any
          non-cancellable third-party cost we incurred for you.
        </p>
      </LegalSection>

      <LegalSection id="client" index={5} title="What we need from you">
        <p>You agree to:</p>
        <LegalList
          items={[
            'Give us accurate information about your organisation, audience, and goals',
            'Supply content, brand materials, and approvals within the time we agree',
            'Provide access to accounts the work depends on, such as a domain, ads account, CMS, or analytics property',
            'Make sure you have the right to use any copy, marks, photos, and data you send us',
            'Name one person who can approve work so feedback does not arrive from several directions at once',
          ]}
        />
        <p>
          You are responsible for the legality of your own offers, claims, fundraising statements,
          and regulated content, including healthcare or ministry claims. We will flag obvious
          problems we notice. We are not your lawyer, auditor, or compliance officer.
        </p>
      </LegalSection>

      <LegalSection id="ip" index={6} title="Intellectual property">
        <p>
          When the project fees are paid in full, you own the final custom deliverables named in the
          proposal — for example the finished website design and the custom code written for it, the
          brand assets created for you, or the app build delivered to you.
        </p>
        <p>
          We keep ownership of anything we had before the project or built as a reusable part of how
          we work: internal tools, starter code, design systems, processes, and know-how. You receive
          a licence to use those parts only as they are embedded in your deliverable. Open-source
          software, stock libraries, typefaces, and third-party platforms stay under their own
          licences.
        </p>
        <p>
          We may show the finished work, and the story of making it, in our portfolio, on this
          website, and in pitches, unless you ask us in writing — before launch — to keep it
          confidential. We will not publish unpublished drafts or private business numbers without
          your agreement.
        </p>
      </LegalSection>

      <LegalSection id="confidential" index={7} title="Confidentiality">
        <p>
          Each side will keep the other’s non-public information confidential and use it only for
          the project. That includes unpublished strategy, donor or customer information, login
          credentials, and pricing. This duty does not cover information that is already public,
          that a side already knew, or that the law requires either side to disclose.
        </p>
        <p>
          How we handle personal information you send through the website is described in our{' '}
          <LegalLink href="/privacy">privacy policy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="platforms" index={8} title="Third-party platforms">
        <p>
          Campaigns, websites, apps, and automations often depend on services we do not control,
          including Google, Apple, hosting providers, email tools, and payment processors. Their
          outages, policy changes, account suspensions, and fee changes are outside our contract
          with you.
        </p>
        <p>
          Google Ad Grants, in particular, are issued by Google to eligible nonprofits under
          Google’s rules. We can prepare and manage an application or account. We cannot promise
          that Google will approve a grant, keep it active, or make a set amount of the monthly
          credit available.
        </p>
      </LegalSection>

      <LegalSection id="results" index={9} title="Results">
        <p>
          We tie creative and media decisions to the goals you give us, and we report on what we can
          measure. Rankings, ad performance, donations, leads, app downloads, and revenue depend on
          your offer, budget, market, and the platforms themselves. We do not guarantee a specific
          ranking, return on ad spend, grant amount, or revenue figure unless a proposal states a
          measurable commitment in writing.
        </p>
      </LegalSection>

      <LegalSection id="careers" index={10} title="Careers and introductions">
        <p>
          We are not always hiring. Sending a portfolio or a note through the contact form does not
          create an employment relationship, an offer, or a promise of future work. If we engage you
          later, that work is governed by a separate agreement.
        </p>
      </LegalSection>

      <LegalSection id="liability" index={11} title="Liability">
        <p>
          The website is provided as it is. We work with care, and we will correct defects in
          deliverables that we agreed to fix during the warranty or support period named in the
          proposal. To the extent the law allows, we are not liable for indirect or consequential
          loss, including lost profits, lost donations, or lost data, or for loss caused by a
          third-party platform, by content you supplied, or by a delay in your approvals.
        </p>
        <p>
          Our total liability arising out of a project is limited to the fees you paid us for that
          project in the three months before the claim. Nothing in these terms limits liability that
          cannot be limited under Indian law, including liability for fraud.
        </p>
      </LegalSection>

      <LegalSection id="ending" index={12} title="Ending an engagement">
        <p>
          Either side may end a project by written notice if the other side materially breaks these
          terms or the proposal and does not fix the breach within 14 days of being asked. Either
          side may also end a project for convenience on the notice period stated in the proposal,
          or on 14 days’ notice if the proposal is silent. Sections on fees for work already done,
          intellectual property, confidentiality, and liability continue after the project ends.
        </p>
      </LegalSection>

      <LegalSection id="law" index={13} title="Law and disputes">
        <p>
          These terms are governed by the laws of India. The courts of Hyderabad, Telangana have
          exclusive jurisdiction, subject to any right you have as a consumer that the law does not
          allow us to limit. Before either side files a claim, we will try to resolve the dispute by
          a direct conversation for at least 15 days.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={14} title="Changes">
        <p>
          We may update these terms as the studio’s services change. The version on this page, dated
          at the top, applies to new use of the website and to new proposals. A project already
          underway keeps the terms that were in place when that proposal was accepted, unless we
          both agree to a change in writing.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={15} title="Contact">
        <p>
          {legalBusiness.name}
          <br />
          {legalBusiness.address}
          <br />
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink>
          <br />
          <LegalLink href={legalBusiness.phoneHref}>{legalBusiness.phoneDisplay}</LegalLink>
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
