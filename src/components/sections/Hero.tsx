import { useState } from 'react'
import { Sparkles, MapPin, Handshake, ArrowDown, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react'

type Props = {
  onOpenPartnerApply: () => void
}

export function Hero({ onOpenPartnerApply }: Props) {
  const [pincode, setPincode] = useState('')
  const [pincodeStatus, setPincodeStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length >= 5) {
      setPincodeStatus({
        ok: true,
        message: '⚡ 45-Min Doorstep Valet Pickup Active in Your Area!',
      })
    } else {
      setPincodeStatus({
        ok: false,
        message: 'Please enter a valid 6-digit postal pincode.',
      })
    }
  }

  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden bg-[#0b172c] text-white flex items-center">
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

      {/* Hero photography background with solid dark gradient overlays */}
      <div className="absolute inset-y-0 right-0 w-full md:left-[35%] md:w-[65%] pointer-events-none overflow-hidden">
        <img
          className="h-full w-full object-cover opacity-45 filter brightness-90 contrast-105"
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=2000&q=90"
          alt="Immaculate stacks of fresh folded laundry in boutique care facility"
          loading="eager"
        />
        {/* Deep navy gradient protection so text is ALWAYS 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b172c] via-[#0b172c]/95 to-transparent md:from-[#0b172c] md:via-[#0b172c]/75 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b172c] via-transparent to-[#0b172c]/40" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pb-16 pt-28 sm:pt-32 md:px-10 md:pt-36">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            <span className="h-px w-7 bg-cyan-400" />
            <span>Saare Kaam Laundry & Garment Care</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30">
              <Sparkles size={11} /> 24H EXPRESS
            </span>
          </div>

          {/* Catchy Hindi/English Tagline Headline */}
          <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
            Aapke Saare Kaam, <br />
            <span className="serif-italic text-cyan-400 font-normal">humare saath</span> mushkil.
          </h1>

          <p className="mt-5 sm:mt-6 text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg max-w-xl">
            Spotless doorstep laundry & dry cleaning in 24 hours. We collect from your home, process in 100% individual sanitized drums, and deliver back fresh & folded.
          </p>

          {/* Instant Pincode Quick-Check Bar */}
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
                  placeholder="Enter your 6-digit area pincode"
                  className="w-full rounded-xl bg-[#071120] px-4 py-3 sm:py-3.5 pl-10 text-sm font-semibold text-white placeholder-slate-400 outline-none border border-slate-700 focus:border-cyan-400 transition"
                />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-cyan-400 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold text-[#0b172c] transition hover:bg-white active:scale-95 whitespace-nowrap shadow-sm"
              >
                Check Service Pincode
              </button>
            </form>

            {pincodeStatus && (
              <div
                className={`mt-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                  pincodeStatus.ok ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/25' : 'bg-red-500/20 text-red-200 border border-red-400/20'
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
              onClick={onOpenPartnerApply}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-7 py-3.5 sm:py-4 text-xs font-extrabold text-[#0b172c] transition hover:bg-white active:scale-95 shadow-glow"
            >
              <Handshake size={16} />
              <span>Apply for Partnership</span>
            </button>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 sm:py-4 text-xs font-bold text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              <span>Explore Price Details</span>
              <ArrowDown size={14} className="text-cyan-400" />
            </a>

            <a
              href="#services"
              className="text-xs font-bold text-slate-300 hover:text-cyan-300 transition underline underline-offset-4 text-center sm:text-left py-2"
            >
              Browse Services
            </a>
          </div>

          {/* 4 Trust Highlights */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4 border-t border-slate-800/80 pt-6 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <ShieldCheck size={17} className="text-cyan-400 shrink-0" />
              <span>100% Individual Wash (Zero Mixing)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Clock size={17} className="text-cyan-400 shrink-0" />
              <span>24-48H Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Sparkles size={17} className="text-cyan-400 shrink-0" />
              <span>European Eco-Enzymes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={17} className="text-cyan-400 shrink-0" />
              <span>Free Doorstep Pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Care Badge */}
      <div className="pointer-events-none absolute bottom-[18%] right-[6%] z-10 hidden rounded-3xl border border-cyan-400/40 bg-[#0b172c]/95 p-6 shadow-2xl backdrop-blur-xl lg:block text-center">
        <span className="block font-serif text-4xl italic text-cyan-400 font-bold">100%</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white block mt-1">
          Individual Sanitized Drums
        </span>
        <span className="mt-1 block text-[9px] text-cyan-200/80">
          European Eco-Enzyme Detergents
        </span>
      </div>
    </section>
  )
}