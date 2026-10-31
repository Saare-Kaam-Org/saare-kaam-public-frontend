import { Handshake, ArrowUpRight } from 'lucide-react'
import { Logo } from '../ui/Logo'
import type { PartnerRole } from '../../modules/application/types'

type Props = {
  onOpenPartnerApply: (role?: PartnerRole) => void
  onSelectServiceTab?: (serviceId: string) => void
}

export function Footer({
  onOpenPartnerApply,
  onSelectServiceTab,
}: Props) {
  const handleServiceClick = (serviceId: string) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(serviceId)
    }
    const el = document.getElementById('services')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-ocean px-4 sm:px-6 md:px-10 pb-12 pt-16 sm:pt-20 text-white border-t border-slate-800 max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.8fr_1fr] border-b border-slate-800 pb-16">
          {/* Brand Info & Main Theme */}
          <div>
            <Logo light size="lg" subtitleText="Aapke Saare Kaam Aasaan" />
            <h2 className="mt-6 max-w-md font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Aapke Saare Kaam, <br />
              <span className="serif-italic text-cyan-400 font-normal">humare saath aasaan.</span>
            </h2>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              India's trusted local doorstep services companion: 100% individual sanitised drum laundry & dry cleaning with transparent per-kg rates, and background-verified domestic house helpers for all cleaning & cooking at transparent hourly rates.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onOpenPartnerApply()}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-bold text-ocean transition hover:bg-white active:scale-95 shadow-glow"
              >
                <Handshake size={15} />
                <span>Apply for Partnership</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Local Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Local Services</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => handleServiceClick('laundry')}
                className="block text-left transition hover:text-white"
              >
                1. Laundry & Garment Care
              </button>
              <button
                type="button"
                onClick={() => handleServiceClick('house_help')}
                className="block text-left transition hover:text-white"
              >
                2. House Help Service
              </button>
            </div>
          </div>

          {/* Local Partner Roles */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Partner Network</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => onOpenPartnerApply('laundry_vendor')}
                className="block text-left transition hover:text-white"
              >
                Laundry Vendors
              </button>
              <button
                type="button"
                onClick={() => onOpenPartnerApply('house_help')}
                className="block text-left transition hover:text-white"
              >
                House Helpers & Cooks
              </button>
              <a href="#how-it-works" className="block transition hover:text-white pt-1">
                How It Works
              </a>
              <a href="#pricing" className="block transition hover:text-white">
                Price Details
              </a>
            </div>
          </div>

          {/* Official Contacts & Office Address */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Contact & Office</p>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-xs text-slate-300 space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">Support & Help</p>
                <a href="mailto:support@saarekaam.com" className="font-semibold text-white hover:text-cyan-300 transition">
                  support@saarekaam.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">Business & Partners</p>
                <a href="mailto:business@saarekaam.com" className="font-semibold text-white hover:text-cyan-300 transition">
                  business@saarekaam.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">Social & Media</p>
                <a href="mailto:social@saarekaam.com" className="font-semibold text-white hover:text-cyan-300 transition">
                  social@saarekaam.com
                </a>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Office Address</p>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                  Chandrasekharpur, Bhubaneswar, Odisha, India, 751017
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-4 pt-8 text-[11px] text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Saare Kaam Technologies Private Limited. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Aapke Saare Kaam, humare saath aasaan</span>
            <span>•</span>
            <span className="text-cyan-400">Bhubaneswar, Odisha • India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
