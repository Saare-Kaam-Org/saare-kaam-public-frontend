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
    <section id="top" className="relative min-h-[90vh] w-full max-w-full overflow-hidden bg-[#071120] text-white flex items-center">
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
          className="h-full w-full object-cover object-[65%_center] opacity-55 brightness-90 contrast-110"
          src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=2000&q=90"
          alt="Saare Kaam Local Services"
          loading="eager"
        />
        {/* Navy gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120]/90 via-[#071120]/65 to-[#071120]/55 lg:from-[#071120] lg:via-[#071120]/75 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071120]/90 via-transparent to-[#071120]/35" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 md:px-10 pb-16 pt-32 sm:pt-36 md:pt-40 min-w-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Left Column - Centered on Mobile just like B2B for a clean organized look */}
          <div className="max-w-2xl w-full min-w-0 text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
            {/* Eyebrow badge showing live local counts from database */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="break-words">Saare Kaam • Doorstep Local Services</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30 whitespace-nowrap">
                <Sparkles size={11} /> {activeServices.length} ESSENTIAL LOCAL SERVICES
              </span>
            </div>

            {/* Catchy Main Slogan */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight text-white break-words text-center lg:text-left">
              Aapke Saare Kaam, <br />
              <span className="serif-italic text-cyan-400 font-normal">humare saath</span> aasaan.
            </h1>

            <p className="mt-3.5 sm:mt-5 text-xs sm:text-base md:text-lg leading-relaxed text-slate-200 max-w-xl mx-auto lg:mx-0 text-center lg:text-left break-words">
              From doorstep <strong className="text-cyan-300 font-semibold">Laundry Care</strong> (per-kg rates with weekly or multi-day pickup) to verified <strong className="text-cyan-300 font-semibold">House Help Service</strong> (transparent hourly rates for all cleaning & cooking).
            </p>

            {/* Dynamic Clickable Service Chips from Database */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
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
            <div className="mt-6 sm:mt-8 rounded-2xl bg-white/10 p-2 sm:p-2.5 backdrop-blur-md border border-white/20 shadow-2xl max-w-xl w-full min-w-0 mx-auto lg:mx-0">
              <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="relative flex-1 min-w-0 w-full">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={e => {
                      setPincode(e.target.value.replace(/\D/g, ''))
                      setPincodeStatus(null)
                    }}
                    placeholder="Enter 6-digit pincode (e.g. 751017)"
                    className="w-full rounded-xl bg-[#050c18] px-3.5 py-3 sm:py-3.5 pl-9 text-xs sm:text-sm font-semibold text-white placeholder-slate-400 outline-none border border-slate-700 focus:border-cyan-400 transition"
                  />
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-cyan-400 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold text-[#0b172c] transition hover:bg-white active:scale-95 whitespace-nowrap shadow-sm text-center"
                >
                  Check Availability
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
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <button
                type="button"
                onClick={() => onOpenPartnerApply()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 sm:py-4 text-xs font-extrabold text-[#0b172c] transition hover:bg-white active:scale-95 shadow-glow"
              >
                <Handshake size={15} />
                <span>Apply as Local Partner</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 sm:py-4 text-xs font-bold text-white transition hover:bg-white/20 backdrop-blur-sm text-center"
              >
                <span>Browse Local Cards</span>
                <ArrowRight size={14} className="text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Local Service Interactive Showcase Cards */}
          <div className="mt-8 lg:mt-0 grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 min-w-0 w-full max-w-xl mx-auto lg:mx-0">
            <div className="text-center lg:text-left sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest pl-1">
                Explore Local Doorstep Services:
              </span>
            </div>

            {services.map((item, idx) => {
              const serviceKey = `${item.slug} ${item.name} ${item.path}`.toLowerCase()
              const isHouseHelp = serviceKey.includes('house') || serviceKey.includes('help') || serviceKey.includes('maid')
              const serviceTheme = isHouseHelp
                ? {
                    gradient: 'from-[#071c1b] via-[#0f3d36] to-[#059669]',
                    border: 'border-teal-500/40 hover:border-teal-400',
                    titleHover: 'group-hover:text-teal-200',
                    explore: 'text-teal-300',
                  }
                : {
                    gradient: 'from-[#1b1030] via-[#38205c] to-[#7e22ce]',
                    border: 'border-purple-500/40 hover:border-purple-400',
                    titleHover: 'group-hover:text-purple-200',
                    explore: 'text-purple-300',
                  }
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
                  className={`group flex items-center justify-between rounded-2xl bg-gradient-to-r ${serviceTheme.gradient} p-3.5 sm:p-4 border ${serviceTheme.border} backdrop-blur-md transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md min-w-0`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl object-cover shrink-0 border border-white/20 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`font-display font-bold text-xs sm:text-sm text-white ${serviceTheme.titleHover} transition truncate`}>
                          {idx + 1}. {item.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 shrink-0">
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-slate-300 block line-clamp-1 mt-0.5">
                        {item.slug === 'laundry'
                          ? '100% individual drum wash • 24-48H return'
                          : 'Cleaning, cooking & domestic help • Hourly rates'}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 shrink-0 text-xs font-bold ${serviceTheme.explore} group-hover:text-white transition pl-1.5 sm:pl-2`}>
                    <span className="hidden sm:inline">Explore</span>
                    <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Trust Highlights */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 border-t border-slate-800/80 pt-6 text-[10px] sm:text-xs">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-200 min-w-0 text-center sm:text-left">
            <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
            <span className="leading-tight">100% Individual Drum Wash</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-200 min-w-0 text-center sm:text-left">
            <Sparkles size={14} className="text-cyan-400 shrink-0" />
            <span className="leading-tight">Police-Verified Helpers</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-200 min-w-0 text-center sm:text-left">
            <Clock size={14} className="text-cyan-400 shrink-0" />
            <span className="leading-tight">Hourly & Per-Kg Rates</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-200 min-w-0 text-center sm:text-left">
            <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
            <span className="leading-tight">Aapke Saare Kaam Aasaan</span>
          </div>
        </div>
      </div>
    </section>
  )
}
