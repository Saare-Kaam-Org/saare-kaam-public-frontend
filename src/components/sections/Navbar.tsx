import { useState } from 'react'
import { Menu, X, ArrowUpRight, Handshake } from 'lucide-react'
import { Logo } from '../ui/Logo'

type Props = {
  onOpenPartnerApply: () => void
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Price Details', href: '#pricing' },
  { label: 'Subscriptions', href: '#subscriptions' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

export function Navbar({ onOpenPartnerApply }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200/80 bg-white/90 px-5 py-3 shadow-card backdrop-blur-xl md:px-7">
        {/* Brand Logo */}
        <a href="#top" className="group">
          <Logo size="md" />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:text-blue-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-xs font-bold text-slate-700 px-3 py-2 transition hover:text-blue-600"
          >
            Check Rates
          </a>

          {/* Primary Partnership Button */}
          <button
            type="button"
            onClick={onOpenPartnerApply}
            className="group inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-xs font-bold text-white transition duration-200 hover:bg-ocean-light shadow-sm active:scale-95 border border-slate-700/50"
          >
            <Handshake size={14} className="text-cyan-400" />
            <span>Apply for Partnership</span>
            <ArrowUpRight size={13} className="text-cyan-300 transition group-hover:rotate-45" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(v => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-ocean text-white lg:hidden"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-2 mt-2 rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 lg:hidden">
          {navLinks.map(l => (
            <a
              key={l.href}
              onClick={() => setMobileMenuOpen(false)}
              href={l.href}
              className="block border-b border-slate-100 py-3 text-sm font-bold text-slate-800 hover:text-blue-600"
            >
              {l.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenPartnerApply()
            }}
            className="mt-5 flex w-full items-center justify-between rounded-full bg-ocean px-6 py-4 text-sm font-bold text-white shadow-md"
          >
            <span className="flex items-center gap-2">
              <Handshake size={17} className="text-cyan-400" />
              <span>Apply for Partnership</span>
            </span>
            <ArrowUpRight size={17} className="text-cyan-300" />
          </button>
        </div>
      )}
    </header>
  )
}