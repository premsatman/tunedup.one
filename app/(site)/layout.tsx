import { MenuOpenProvider } from '@/components/layout/MenuOpenContext'
import { SoundEnabledProvider } from '@/components/layout/SoundEnabledContext'
import Navbar from '@/components/layout/Navbar'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import ScrollSmootherInit from '@/components/layout/ScrollSmootherInit'
import ScrollRestoration from '@/components/layout/ScrollRestoration'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SoundEnabledProvider>
      <MenuOpenProvider>
        <ScrollSmootherInit />
        <ScrollRestoration />
        <Navbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <ConditionalFooter />
          </div>
        </div>
      </MenuOpenProvider>
    </SoundEnabledProvider>
  )
}
