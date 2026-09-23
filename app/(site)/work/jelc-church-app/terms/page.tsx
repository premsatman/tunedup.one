import type { Metadata } from 'next'
import { LegalDocument, LegalLink, LegalList, LegalSection } from '@/components/legal/LegalDocument'
import { legalBusiness } from '@/lib/legal'

const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.arleneandashertechnologies.jelcchurch&hl=en_IN'

export const metadata: Metadata = {
  title: 'JELC Church App Terms — TunedUp Digital',
  description:
    'Terms for the JELC Church app, a free worship companion developed by TunedUp Digital Solutions for the Jeypore Evangelical Lutheran Church.',
}

export default function JelcChurchTermsPage() {
  return (
    <LegalDocument
      eyebrow="/ JELC Church"
      title="JELC Church"
      highlight="terms."
      intro={
        <>
          <p>
            These terms cover the JELC Church app on Android, published by {legalBusiness.name} for
            the Jeypore Evangelical Lutheran Church. Installing or using the app means you have read
            them. The app is listed on{' '}
            <LegalLink href={playStoreUrl} external>
              Google Play
            </LegalLink>
            .
          </p>
          <p>
            The app is a worship companion: daily Bible readings, catechism, songs and hymns with
            lyrics and audio, prayers, and liturgies. It is free of cost and does not show
            advertisements.
          </p>
        </>
      }
    >
      <LegalSection id="who" index={1} title="Who provides the app">
        <p>
          {legalBusiness.name} develops and maintains the app for the Jeypore Evangelical Lutheran
          Church. The church’s songs, readings, prayers, and liturgies are provided for worship. Our
          contact details are at the end of these terms.
        </p>
      </LegalSection>

      <LegalSection id="features" index={2} title="What the app includes">
        <p>Depending on the version installed from Google Play, the app includes:</p>
        <LegalList
          items={[
            'Daily readings and devotionals, including more than one translation where available',
            'Catechism material, including the Ten Commandments, for teaching and study',
            'A song book of 450 or more songs and hymns, with lyrics and audio for sing-along',
            'Prayers and liturgical resources for worship',
            'Night mode, swipe navigation, and a layout intended for phones and tablets',
            'Offline access to many sections',
            'A report control on a verse so you can flag a spelling mistake or correction',
          ]}
        />
        <p>
          Features can change as the app is updated. The “What’s new” notes on Google Play describe
          the current release.
        </p>
      </LegalSection>

      <LegalSection id="use" index={3} title="How you may use it">
        <p>
          You may install and use the app for personal worship, congregational worship, Sunday
          school, and Bible study. You may not:
        </p>
        <LegalList
          items={[
            'Sell the app, its audio, or its text, or present it as your own product',
            'Copy the song book, liturgies, or recordings into another commercial app or site',
            'Scrape, disrupt, or attempt to break the app',
            'Use the report control for abuse, spam, or content that is not a correction or a genuine note',
          ]}
        />
        <p>
          Content is arranged for worship. It is not a substitute for your pastor, congregation, or
          a professional adviser.
        </p>
      </LegalSection>

      <LegalSection id="account" index={4} title="Google Sign-In">
        <p>
          The app may offer Google Sign-In. If you use it, Google may share your name, email
          address, and profile information with the app, solely for authentication and
          account-related functionality. We do not sell that information or use it for advertising.
        </p>
        <p>
          You can stop using sign-in, remove the app’s access in your Google Account, or ask us to
          delete account information we hold. How that information is handled is described in the{' '}
          <LegalLink href="/work/jelc-church-app/privacy">JELC Church privacy policy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="content" index={5} title="Church content">
        <p>
          Readings, catechism, songs, audio, prayers, and liturgies are provided for use inside the
          app. Scripture translations remain under the terms of their publishers. Song lyrics, audio,
          and liturgical text remain the property of their owners, including the Jeypore Evangelical
          Lutheran Church where that applies. TunedUp retains its rights in the app software,
          interface, and code.
        </p>
        <p>
          We work to keep lyrics and text accurate. If you see a mistake, use the report control on
          that verse. A report is a help to the editors. It does not create a duty to change the
          text on a particular date.
        </p>
      </LegalSection>

      <LegalSection id="store" index={6} title="Google Play and your device">
        <p>
          The app is distributed through Google Play. Google’s terms and the permissions you accept
          on your device also apply. Offline sections need to be downloaded or opened once, as the
          app describes, before they are available without a connection. We are not responsible for
          Google Play outages, device limits, or storage you have not made available.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={7} title="Updates and availability">
        <p>
          We may update, add, or remove content and features, and we may publish a new version on
          Google Play. The app is provided free of charge and as it is available. We do not promise
          that every section, recording, or translation will always be present, or that the app will
          be uninterrupted.
        </p>
      </LegalSection>

      <LegalSection id="liability" index={8} title="Liability">
        <p>
          To the extent Indian law allows, TunedUp and the church are not liable for indirect or
          consequential loss arising from use of the app, or for a loss caused by a text error you
          have not reported, by an offline copy that is out of date, or by Google or your device.
          Nothing in these terms limits liability that cannot be limited under Indian law.
        </p>
      </LegalSection>

      <LegalSection id="law" index={9} title="Law">
        <p>
          These terms are governed by the laws of India. The courts of Hyderabad, Telangana have
          jurisdiction, subject to any right the law does not allow us to limit.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={10} title="Contact">
        <p>
          {legalBusiness.name}
          <br />
          For the Jeypore Evangelical Lutheran Church
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
          The current version of these terms is dated at the top of this page. Privacy details are
          in the <LegalLink href="/work/jelc-church-app/privacy">JELC Church privacy policy</LegalLink>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
