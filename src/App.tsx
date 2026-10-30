import { useState, useEffect } from 'react'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { PricingSection } from './components/sections/PricingSection'
import { Subscriptions } from './components/sections/Subscriptions'
import { HowItWorks } from './components/sections/HowItWorks'
import { PartnerBanner } from './components/sections/PartnerBanner'
import { FAQ } from './components/sections/FAQ'
import { Footer } from './components/sections/Footer'
import { PartnerApplyModal } from './components/PartnerApplyModal'
import { AdminApplicationsPage } from './components/AdminApplicationsPage'

export default function App() {
  // Simple, robust client-side routing for /all-applications and homepage
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase()
    const hash = window.location.hash.toLowerCase()
    if (path.includes('all-applications') || hash.includes('all-applications')) {
      return '/all-applications'
    }
    return '/'
  })

  // Partner application modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  // Listen to browser forward/back buttons and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      if (path.includes('all-applications') || hash.includes('all-applications')) {
        setCurrentPath('/all-applications')
      } else {
        setCurrentPath('/')
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (path: string) => {
    setCurrentPath(path)
    if (path === '/all-applications') {
      window.history.pushState({}, '', '/all-applications')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.history.pushState({}, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // If navigating to /all-applications, render the Admin Tabular View with 1-click CSV download
  if (currentPath === '/all-applications') {
    return <AdminApplicationsPage onBackToHome={() => navigateTo('/')} />
  }

  // Otherwise, render the clean, premium Saare Kaam landing page
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-lime selection:text-forest">
      {/* Top Floating Glass Navigation */}
      <Navbar onOpenPartnerApply={() => setApplyModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero onOpenPartnerApply={() => setApplyModalOpen(true)} />

        {/* 6 Curated Garment Care Services */}
        <Services />

        {/* Transparent Price Details Section */}
        <PricingSection />

        {/* Household Subscription Passes */}
        <Subscriptions />

        {/* 3-Step Simple Process */}
        <HowItWorks />

        {/* Dedicated Partner Recruitment Banner */}
        <PartnerBanner onOpenPartnerApply={() => setApplyModalOpen(true)} />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Comprehensive Footer with subtle link to /all-applications */}
      <Footer
        onOpenPartnerApply={() => setApplyModalOpen(true)}
        onNavigateToApplications={() => navigateTo('/all-applications')}
      />

      {/* Apply for Partnership Modal */}
      <PartnerApplyModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}