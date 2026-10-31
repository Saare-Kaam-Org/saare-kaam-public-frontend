import { useState, useEffect } from 'react'
import {
  Menu,
  X,
  ArrowUpRight,
  Handshake,
  Shirt,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Mail,
  MapPin,
} from 'lucide-react'
import { Logo } from '../ui/Logo'

type Props = {
  onOpenPartnerApply: (role?: any) => void
  onNavigate?: (path: string) => void
}

const navLinks = [
  { label: 'Local Services', href: '#services' },
  { label: 'Price Details', href: '#pricing' },
  { label: 'Subscriptions', href: '#subscriptions' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

export function Navbar({ onOpenPartnerApply, onNavigate }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const b2bUrl = import.meta.env.VITE_B2B_URL || 'http://localhost:5555'

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/' && onNavigate) {
        onNavigate('/')
        setTimeout(() => {
          const el = document.querySelector(href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 120)
        return
      }
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavigateDirect = (path: string) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(path)
    } else {
      window.location.href = path
    }
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate('/')
    } else {
      window.location.href = '/'
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full max-w-full px-3 pt-3 sm:px-6 sm:pt-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200/80 bg-white/95 px-3.5 py-2 sm:px-6 sm:py-3 shadow-card backdrop-blur-xl md:px-7">
          {/* Brand Logo - Responsive with compact mode on small mobile */}
          <a href="/" onClick={handleHomeClick} className="group shrink-0">
            <Logo
              size="md"
              subtitleText="Aapke Saare Kaam Aasaan"
              hideSubtitleOnMobile
            />
          </a>

          {/* Desktop Nav Links (Large Screens >= 1024px) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => {
                  e.preventDefault()
                  handleLinkClick(l.href)
                }}
                className="text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:text-blue-600"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Action Buttons: Responsive for Mobile, Tablet & Desktop */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Only: Check Rates link */}
            <a
              href="#pricing"
              onClick={e => {
                e.preventDefault()
                handleLinkClick('#pricing')
              }}
              className="hidden xl:inline-block text-xs font-bold text-slate-700 px-3 py-2 transition hover:text-blue-600"
            >
              Check Rates
            </a>

            {/* Tablet & Desktop: Full Apply for Partnership Button */}
            <button
              type="button"
              onClick={() => onOpenPartnerApply()}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-white transition duration-200 hover:bg-ocean-light shadow-sm active:scale-95 border border-slate-700/50"
            >
              <Handshake size={14} className="text-cyan-400" />
              <span>Apply for Partnership</span>
              <ArrowUpRight size={13} className="text-cyan-300 transition group-hover:rotate-45" />
            </button>

            {/* Mobile & Tablet Hamburger Menu Toggle */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(v => !v)}
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-ocean text-white lg:hidden transition hover:bg-ocean-light active:scale-95 shrink-0"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Full Screen / Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="mx-auto mt-2 max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Quick Jump: Direct Dedicated Local Service Pages */}
              <div className="mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
                  Doorstep Local Services:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavigateDirect('/laundry')}
                    className="flex flex-col text-left rounded-2xl bg-cyan-50/70 border border-cyan-200/80 p-3 transition hover:bg-cyan-100/70"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-500 text-white shadow-sm">
                        <Shirt size={14} />
                      </div>
                      <span className="text-[9px] font-bold uppercase text-cyan-700 bg-white px-2 py-0.5 rounded-full border border-cyan-200">
                        Per-Kg
                      </span>
                    </div>
                    <span className="font-display text-xs font-bold text-slate-900 mt-1">
                      Laundry Care
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">
                      Doorstep 24-48H
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigateDirect('/house-help')}
                    className="flex flex-col text-left rounded-2xl bg-teal-50/70 border border-teal-200/80 p-3 transition hover:bg-teal-100/70"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-teal-600 text-white shadow-sm">
                        <Sparkles size={14} />
                      </div>
                      <span className="text-[9px] font-bold uppercase text-teal-800 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                        Hourly
                      </span>
                    </div>
                    <span className="font-display text-xs font-bold text-slate-900 mt-1">
                      House Help
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">
                      Clean & Cook
                    </span>
                  </button>
                </div>
              </div>

              {/* Navigation Anchors */}
              <div className="border-t border-slate-100 pt-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Explore Platform:
                </span>
                {navLinks.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={e => {
                      e.preventDefault()
                      handleLinkClick(l.href)
                    }}
                    className="flex items-center justify-between border-b border-slate-100 py-2.5 text-xs font-bold text-slate-800 hover:text-blue-600 transition"
                  >
                    <span>{l.label}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </a>
                ))}
              </div>

              {/* Primary Mobile Action: Partnership */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenPartnerApply()
                }}
                className="mt-4 flex w-full items-center justify-between rounded-full bg-ocean px-5 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-ocean-light active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Handshake size={16} className="text-cyan-400" />
                  <span>Apply for Partnership (Vendors / Helpers)</span>
                </span>
                <ArrowUpRight size={15} className="text-cyan-300" />
              </button>

              {/* B2B Services Portal Callout in Drawer */}
              <div className="mt-3 rounded-2xl bg-purple-50 p-3 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    B2B & Enterprise
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    Software Development & ERPs
                  </p>
                </div>
                <a
                  href={b2bUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-purple-700 transition"
                >
                  <span>Portal</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* Official Office & Support Info in Drawer */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 space-y-1">
                <p className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Mail size={12} className="text-blue-600" />
                  <a href="mailto:support@saarekaam.com" className="hover:underline">support@saarekaam.com</a>
                  <span>•</span>
                  <a href="mailto:business@saarekaam.com" className="hover:underline">business@saarekaam.com</a>
                </p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <MapPin size={12} className="text-blue-600 shrink-0" />
                  <span>Chandrasekharpur, Bhubaneswar, Odisha, 751017</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when mobile menu is open (closes menu on tap outside) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}
    </>
  )
}
