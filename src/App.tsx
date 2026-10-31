import { useState, useEffect } from 'react'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { PricingSection } from './components/sections/PricingSection'
import { Subscriptions } from './components/sections/Subscriptions'
import { HowItWorks } from './components/sections/HowItWorks'
import { PartnerBanner } from './components/sections/PartnerBanner'
import { FAQ } from './components/sections/FAQ'
import { B2BPromoBanner } from './components/sections/B2BPromoBanner'
import { Footer } from './components/sections/Footer'

// Modular Application Component
import { PartnerApplyModal } from './modules/application/components/PartnerApplyModal'

// Modular Local Service Pages
import { LaundryPage } from './modules/services/pages/LaundryPage'
import { HouseHelpPage } from './modules/services/pages/HouseHelpPage'

import type { PartnerRole } from './modules/application/types'

function resolvePath(pathname: string, hash: string): string {
  const p = pathname.toLowerCase()
  const h = hash.toLowerCase()

  if (p.includes('house') || p.includes('help') || p.includes('maid') || h.includes('house') || h.includes('help') || h.includes('maid')) return '/house-help'
  if (p.includes('laundry') || h.includes('laundry')) return '/laundry'

  return '/'
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return resolvePath(window.location.pathname, window.location.hash)
  })

  // Partner application modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [modalInitialRole, setModalInitialRole] = useState<PartnerRole | null>(null)

  // Active Service Tab for homepage
  const [activeServiceTab, setActiveServiceTab] = useState<string>('laundry')

  // Listen to browser navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const resolved = resolvePath(window.location.pathname, window.location.hash)
      setCurrentPath(resolved)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (path: string) => {
    const resolved = resolvePath(path, '')
    setCurrentPath(resolved)
    window.history.pushState({}, '', resolved)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenPartnerModal = (role?: PartnerRole) => {
    setModalInitialRole(role || null)
    setApplyModalOpen(true)
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-paper text-ink selection:bg-cyan-400 selection:text-ocean">
      {/* Top Floating Glass Navigation */}
      <Navbar onOpenPartnerApply={handleOpenPartnerModal} onNavigate={navigateTo} />

      <main className="w-full max-w-full overflow-x-hidden">
        {currentPath === '/laundry' && (
          <LaundryPage
            onNavigate={navigateTo}
            onOpenPartnerApply={handleOpenPartnerModal}
          />
        )}

        {(currentPath === '/house-help' || currentPath === '/maid-service') && (
          <HouseHelpPage
            onNavigate={navigateTo}
            onOpenPartnerApply={handleOpenPartnerModal}
          />
        )}

        {currentPath === '/' && (
          <>
            {/* Top Interactive Hero with Dynamic Local Services */}
            <Hero
              onOpenPartnerApply={handleOpenPartnerModal}
              onNavigate={navigateTo}
            />

            {/* 2 Color-Themed Local Service Cards */}
            <Services
              activeTab={activeServiceTab}
              onTabChange={setActiveServiceTab}
              onNavigate={navigateTo}
              onOpenPartnerApply={handleOpenPartnerModal}
            />

            {/* Transparent Rate Cards */}
            <PricingSection />

            {/* Weekly / Monthly Passes */}
            <Subscriptions />

            {/* How Doorstep Logistics Work */}
            <HowItWorks />

            {/* Partner Network Banner */}
            <PartnerBanner onOpenPartnerApply={handleOpenPartnerModal} />

            {/* Frequently Asked Questions */}
            <FAQ />

            {/* Cross-Promotion: B2B Software Engineering Portal Banner */}
            <B2BPromoBanner />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPartnerApply={handleOpenPartnerModal}
        onSelectServiceTab={serviceId => {
          setActiveServiceTab(serviceId)
          navigateTo('/')
        }}
      />

      {/* Database-Driven Partner Application Modal */}
      <PartnerApplyModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        initialRole={modalInitialRole}
      />
    </div>
  )
}
