import type { Metadata } from 'next'
import { LegalDocument, LegalLink, LegalList, LegalSection } from '@/components/legal/LegalDocument'
import { legalBusiness } from '@/lib/legal'

const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.arleneandashertechnologies.jelcchurch&hl=en_IN'

export const metadata: Metadata = {
  title: 'JELC Church App Privacy Policy — TunedUp Digital',
  description:
    'Privacy policy for the JELC Church app, developed by TunedUp Digital Solutions for the Jeypore Evangelical Lutheran Church.',
}

export default function JelcChurchPrivacyPage() {
  return (
    <LegalDocument
      eyebrow="/ JELC Church"
      title="JELC Church"
      highlight="privacy."
      intro={
        <>
          <p>
            The JELC Church App is developed and maintained by {legalBusiness.name} for the Jeypore
            Evangelical Lutheran Church.
          </p>
          <p>
            The app may use Google Sign-In to authenticate users. When users sign in with Google,
            the app may receive basic account information such as the user’s name, email address and
            profile information, solely for authentication and account-related functionality.
          </p>
          <p>We do not sell Google user data or use it for advertising.</p>
          <p>
            This policy covers the Android app published as JELC Church (
            <LegalLink href={playStoreUrl} external>
              Google Play
            </LegalLink>
            ). It is a free, ad-free worship companion: daily readings, catechism, songs and hymns,
            prayers, and liturgies, including sections that work offline.
          </p>
        </>
      }
    >
      <LegalSection id="who" index={1} title="Who is responsible">
        <p>
          {legalBusiness.name} (“TunedUp”, “we”) builds and maintains the app for the Jeypore
          Evangelical Lutheran Church. TunedUp is the point of contact for privacy requests about
          the app.
        </p>
        <LegalList
          items={[
            `Developer: ${legalBusiness.name}`,
            `For: Jeypore Evangelical Lutheran Church`,
            `Office: ${legalBusiness.address}`,
            `Email: ${legalBusiness.email}`,
            'Support email: premasis.satman@gmail.com',
            `Phone: ${legalBusiness.phoneDisplay}`,
          ]}
        />
      </LegalSection>

      <LegalSection id="google" index={2} title="Google Sign-In">
        <p>
          Sign-in is used only when you choose to authenticate. If you sign in with Google, Google
          shares basic account information with the app — your name, email address, and profile
          information — so the app can recognise your account.
        </p>
        <p>That information is used solely for authentication and account-related functionality. We do not:</p>
        <LegalList
          items={[
            'Sell Google user data',
            'Use Google user data for advertising',
            'Use it to build advertising profiles',
            'Share it with third parties for their own marketing',
          ]}
        />
        <p>
          Google processes the sign-in under its own rules. Their policy is at{' '}
          <LegalLink href="https://policies.google.com/privacy" external>
            policies.google.com/privacy
          </LegalLink>
          . You can remove the app’s access from your Google Account settings.
        </p>
      </LegalSection>

      <LegalSection id="content" index={3} title="Using the app without an account">
        <p>
          Readings, catechism, song lyrics and audio, prayers, and liturgies are there for worship.
          You can browse much of that content, including offline sections, without sending us
          personal information. The app does not show advertisements.
        </p>
        <p>
          The store listing describes a report control on a verse for spelling mistakes or
          corrections. If you send a report, suggestion, or similar message, we receive what you
          chose to submit so the church and the app team can review it. Sharing a prayer or passage
          through your phone’s share sheet goes to the app you pick, not to TunedUp.
        </p>
      </LegalSection>

      <LegalSection id="keep" index={4} title="How long we keep it">
        <p>
          Google account details received for sign-in are kept only while the account is needed for
          the app. A correction or message you send is kept long enough to review it and improve the
          content. You can ask us to delete information we hold about you.
        </p>
      </LegalSection>

      <LegalSection id="security" index={5} title="Security">
        <p>
          Data is encrypted in transit. Access to any account or message information is limited to
          the people maintaining the app for the church. No method of transmission is perfectly
          secure.
        </p>
      </LegalSection>

      <LegalSection id="children" index={6} title="Children">
        <p>
          The app is rated Everyone on Google Play and is a worship resource for the church
          community. It is not a service for collecting personal information from children. Google
          Sign-In follows Google’s own account and age rules. If you believe a child has sent us
          personal information, email us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="rights" index={7} title="Your choices">
        <p>You can ask us to confirm, correct, or delete personal information we hold from the app. Email{' '}
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink> or{' '}
          <LegalLink href="mailto:premasis.satman@gmail.com">premasis.satman@gmail.com</LegalLink>,
          or call{' '}
          <LegalLink href={legalBusiness.phoneHref}>{legalBusiness.phoneDisplay}</LegalLink>. We may
          ask for enough detail to find the right record.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={8} title="Changes">
        <p>
          If the app’s data practices change, we will update this page and the date at the top. The
          current version is{' '}
          <LegalLink href="/work/jelc-church-app/privacy">/work/jelc-church-app/privacy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={9} title="Contact">
        <p>
          {legalBusiness.name}
          <br />
          {legalBusiness.address}
          <br />
          <LegalLink href={`mailto:${legalBusiness.email}`}>{legalBusiness.email}</LegalLink>
          <br />
          <LegalLink href="mailto:premasis.satman@gmail.com">premasis.satman@gmail.com</LegalLink>
          <br />
          <LegalLink href={legalBusiness.phoneHref}>{legalBusiness.phoneDisplay}</LegalLink>
        </p>
        <p>
          Use of the app is covered in the{' '}
          <LegalLink href="/work/jelc-church-app/terms">JELC Church terms</LegalLink>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
