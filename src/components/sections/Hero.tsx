import { useState } from 'react'
import {
  Sparkles,
  MapPin,
  Handshake,
  ArrowRight,
  ShieldCheck,
  Shirt,
  Clock,
} from 'lucide-react'
import { useServices } from '../../modules/services/hooks/useServices'

type Props = {
  onOpenPartnerApply: (role?: any) => void
  onNavigate?: (path: string) => void
}

const iconRegistry: Record<string, typeof Shirt> = {
  Shirt,
  Sparkles,
}

export function Hero({ onOpenPartnerApply, onNavigate }: Props) {
  const [pincode, setPincode] = useState('')
  const [pincodeStatus, setPincodeStatus] = useState<null | { ok: boolean; message: string }>(null)

  // Dynamic local services from backend PostgreSQL (domain: LOCAL)
  const { services, activeServices } = useServices()

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length >= 5) {
      setPincodeStatus({
        ok: true,
        message: '⚡ Doorstep Valet Active in your area! Browse transparent rate cards or apply as a partner below.',
      })
    } else {
      setPincodeStatus({
        ok: false,
        message: 'Please enter a valid 6-digit postal pincode.',
      })
    }
  }

  const handleServiceClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    }
  }

  return (
    <section id="top" className="relative min-h-[90vh] overflow-hidden bg-[#071120] text-white flex items-center">
      {/* Background subtle water-cyan dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[550px] w-[550px] rounded-full bg-cyan-500/15 blur-[140px]" />

      {/* Hero Photography for Local Doorstep Valet Services */}
      <div className="absolute inset-y-0 right-0 w-full lg:left-[40%] lg:w-[60%] pointer-events-none overflow-hidden">
        <img
          className="h-full w-full object-cover opacity-25 filter brightness-95 contrast-105"
          src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=2000&q=90"
          alt="Saare Kaam Local Services"
          loading="eager"
        />
        {/* Navy gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120] via-[#071120]/95 to-transparent lg:from-[#071120] lg:via-[#071120]/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-transparent to-[#071120]/40" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pb-16 pt-28 sm:pt-32 md:px-10 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Left Column */}
          <div className="max-w-2xl">
            {/* Eyebrow badge showing live local counts from database */}
            <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
              <span className="h-px w-7 bg-cyan-400" />
              <span>Saare Kaam • Doorstep Local Services</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30">
                <Sparkles size={11} /> {activeServices.length} ESSENTIAL LOCAL SERVICES
              </span>
            </div>

            {/* Catchy Main Slogan */}
            <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
              Aapke Saare Kaam, <br />
              <span className="serif-italic text-cyan-400 font-normal">humare saath</span> aasaan.
            </h1>

            <p className="mt-5 sm:mt-6 text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg max-w-xl">
              From doorstep <strong className="text-cyan-300 font-semibold">Laundry Care</strong> (per-kg rates with weekly or multi-day pickup) to verified <strong className="text-cyan-300 font-semibold">House Help Service</strong> (transparent hourly rates for all cleaning & cooking).
            </p>

            {/* Dynamic Clickable Service Chips from Database */}
            <div className="mt-6 flex flex-wrap gap-2">
              {services.map((service, idx) => {
                const Icon = iconRegistry[service.iconName] || Shirt
                const isActive = service.status === 'ACTIVE'
                const badgeColor = isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'bg-pink-500/20 text-pink-300 border border-pink-400/30'

                return (
                  <button
                    key={service.slug || service.id}
                    type="button"
                    onClick={() => handleServiceClick(service.path)}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-200 backdrop-blur-md transition hover:border-cyan-400 hover:bg-white/20 hover:text-white"
                  >
                    <Icon size={13} className="text-cyan-400 group-hover:scale-110 transition" />
                    <span>{idx + 1}. {service.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${badgeColor}`}>
                      {service.status === 'ACTIVE' ? 'Active' : 'Upcoming'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Quick Pincode Checker */}
            <div className="mt-7 sm:mt-8 rounded-2xl bg-white/10 p-2 sm:p-2.5 backdrop-blur-md border border-white/20 shadow-2xl max-w-xl">
              <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={e => {
                      setPincode(e.target.value.replace(/\D/g, ''))
                      setPincodeStatus(null)
                    }}
                    placeholder="Check doorstep services (Enter 6-digit postal pincode)"
                    className="w-full rounded-xl bg-[#050c18] px-4 py-3 sm:py-3.5 pl-10 text-sm font-semibold text-white placeholder-slate-400 outline-none border border-slate-700 focus:border-cyan-400 transition"
                  />
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-400 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold text-[#0b172c] transition hover:bg-white active:scale-95 whitespace-nowrap shadow-sm"
                >
                  Check Pincode
                </button>
              </form>

              {pincodeStatus && (
                <div
                  className={`mt-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                    pincodeStatus.ok
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/25'
                      : 'bg-red-500/20 text-red-200 border border-red-400/20'
                  }`}
                >
                  {pincodeStatus.message}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onOpenPartnerApply()}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-7 py-3.5 sm:py-4 text-xs font-extrabold text-[#0b172c] transition hover:bg-white active:scale-95 shadow-glow"
              >
                <Handshake size={16} />
                <span>Apply as Local Partner</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 sm:py-4 text-xs font-bold text-white transition hover:bg-white/20 backdrop-blur-sm"
              >
                <span>Browse Local Cards</span>
                <ArrowRight size={14} className="text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Local Service Interactive Showcase Cards */}
          <div className="hidden lg:flex flex-col gap-3">
            <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest pl-1">
              Explore Local Doorstep Services:
            </span>

            {services.map((item, idx) => {
              return (
                <div
                  key={item.slug || item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleServiceClick(item.path)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleServiceClick(item.path)
                    }
                  }}
                  className={`group flex items-center justify-between rounded-2xl bg-gradient-to-r ${item.gradientClass || 'from-[#0b172c] via-[#0e2748] to-[#0284c7]/40'} p-4 border ${item.borderColor || 'border-cyan-500/40 hover:border-cyan-400'} backdrop-blur-md transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-14 w-14 rounded-xl object-cover shrink-0 border border-white/20 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-white group-hover:text-cyan-200 transition">
                          {idx + 1}. {item.name}
                        </span>
                        <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300">
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-300 block line-clamp-1 mt-0.5">
                        {item.badgeLabel || item.shortDesc}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pr-2">
                    <span className="font-mono text-[10px] font-bold border border-cyan-400/30 bg-cyan-500/20 text-cyan-200 px-2.5 py-1 rounded-full">
                      {item.path}
                    </span>
                    <ArrowRight size={14} className="text-white transition group-hover:translate-x-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Trust Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-800/80 pt-6 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
            <span>100% Individual Sanitised Drum Wash</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Sparkles size={16} className="text-cyan-400 shrink-0" />
            <span>Police-Verified Household Helpers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Clock size={16} className="text-cyan-400 shrink-0" />
            <span>Transparent Hourly & Per-Kg Rates</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
            <span>Aapke Saare Kaam Aasaan</span>
          </div>
        </div>
      </div>
    </section>
  )
}
