import { Handshake, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Logo } from '../ui/Logo'

type Props = {
  onOpenPartnerApply: () => void
  onNavigateToApplications: () => void
}

export function Footer({ onOpenPartnerApply, onNavigateToApplications }: Props) {
  return (
    <footer className="bg-ocean px-6 pb-12 pt-20 text-white md:px-10 border-t border-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-slate-800 pb-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          {/* Brand Info */}
          <div>
            <Logo light size="lg" />
            <h2 className="mt-6 max-w-md font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Aapke Saare Kaam, <br />
              <span className="serif-italic text-cyan-400 font-normal">humare saath aasaan.</span>
            </h2>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              India's smart doorstep garment care solution. Individual sanitized drum cycles, skin-friendly detergents, and 24-48H delivery.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenPartnerApply}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-bold text-ocean transition hover:bg-white active:scale-95 shadow-glow"
              >
                <Handshake size={15} />
                <span>Apply for Partnership</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Services</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a href="#services" className="block transition hover:text-white">Wash & Fold</a>
              <a href="#services" className="block transition hover:text-white">Artisanal Dry Cleaning</a>
              <a href="#services" className="block transition hover:text-white">Executive Steam Press</a>
              <a href="#services" className="block transition hover:text-white">24H Express Rush</a>
              <a href="#services" className="block transition hover:text-white">Blankets & Heavy Linens</a>
              <a href="#services" className="block transition hover:text-white">Sneaker & Shoe Spa</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Navigation</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a href="#top" className="block transition hover:text-white">Home</a>
              <a href="#services" className="block transition hover:text-white">All Services</a>
              <a href="#pricing" className="block transition hover:text-white">Price Details</a>
              <a href="#subscriptions" className="block transition hover:text-white">Household Passes</a>
              <a href="#how-it-works" className="block transition hover:text-white">How It Works</a>
              <a href="#faqs" className="block transition hover:text-white">Help & FAQs</a>
            </div>
          </div>

          {/* Care Guarantee */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Hygiene Guarantee</p>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <ShieldCheck size={16} /> 100% Zero-Mixing Promise
              </div>
              <p className="leading-relaxed">
                Your clothes run in their own dedicated sanitized drum cycle. Never co-mingled with any other household.
              </p>
            </div>

            <div className="mt-5 text-xs text-slate-400 space-y-1">
              <p>Customer & Valet Support:</p>
              <p className="font-semibold text-white">care@saarekaam.in</p>
              <p className="text-[11px] text-slate-400">Daily 7:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Hidden Route Access */}
        <div className="flex flex-col justify-between gap-4 pt-8 text-[11px] text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Saare Kaam Technologies Private Limited. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Made with precision for your wardrobe</span>
            <span>•</span>
            {/* Subtle direct link to hidden admin route */}
            <button
              type="button"
              onClick={onNavigateToApplications}
              className="font-mono text-cyan-400/80 hover:text-cyan-300 underline hover:no-underline transition"
              title="Access hidden partner applications table"
            >
              Partner Applications Table (/all-applications)
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}