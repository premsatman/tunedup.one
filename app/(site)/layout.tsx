import { MenuOpenProvider } from '@/components/layout/MenuOpenContext'
import { SoundEnabledProvider } from '@/components/layout/SoundEnabledContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollSmootherInit from '@/components/layout/ScrollSmootherInit'
import ScrollRestoration from '@/components/layout/ScrollRestoration'
import { ScrollSmootherDebugProvider } from '@/components/layout/ScrollSmootherDebugContext'
import ScrollSmootherDebugBar from '@/components/layout/ScrollSmootherDebugBar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SoundEnabledProvider>
      <MenuOpenProvider>
        <ScrollSmootherDebugProvider>
          <ScrollSmootherInit />
          <ScrollSmootherDebugBar />
          <ScrollRestoration />
          <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <Footer />
            </div>
          </div>
        </ScrollSmootherDebugProvider>
      </MenuOpenProvider>
    </SoundEnabledProvider>
  )
}
