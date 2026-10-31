import { useState } from 'react'
import {
  Shirt,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  Handshake,
  MapPin,
  Truck,
} from 'lucide-react'
import { serviceCategories, pricingTiers, subscriptionPlans } from '../../../data/content'
import type { PartnerRole } from '../../application/types'

type Props = {
  onNavigate: (path: string) => void
  onOpenPartnerApply: (role?: PartnerRole) => void
}

export function LaundryPage({ onNavigate, onOpenPartnerApply }: Props) {
  const [pincode, setPincode] = useState('')
  const [pincodeMsg, setPincodeMsg] = useState<string | null>(null)

  const laundryCat = serviceCategories.find(c => c.id === 'laundry') || serviceCategories[0]
  const laundryPricing = pricingTiers.filter(t => !t.category.includes('ERP') && !t.category.includes('Software'))
  const laundrySubs = subscriptionPlans.filter(s => s.serviceCategory === 'laundry')

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length === 6) {
      setPincodeMsg('⚡ Doorstep valet operates in your area! Request doorstep collection or apply as a partner below.')
    } else {
      setPincodeMsg('Please enter a valid 6-digit area pincode.')
    }
  }

  return (
    <div className="bg-paper text-ink">
      {/* Top Breadcrumb & Hero */}
      <section className="relative overflow-hidden bg-[#0b172c] text-white pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 px-3.5 sm:px-8 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        {/* Relevant Hero Photography for Laundry */}
        <div className="absolute inset-y-0 right-0 w-full md:left-[45%] md:w-[55%] pointer-events-none overflow-hidden">
          <img
            className="h-full w-full object-cover opacity-35 filter brightness-95"
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=2000&q=90"
            alt="Pristine Boutique Laundry & Fabric Care"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b172c] via-[#0b172c]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b172c] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-400 mb-6">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-cyan-400 transition"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-cyan-400 font-bold">Laundry & Garment Care</span>
          </div>

          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-bold text-cyan-300 border border-cyan-400/30 mb-4">
              <Shirt size={14} />
              <span>LIVE SERVICE • 24-48H DOORSTEP RETURN</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white text-center md:text-left">
              Doorstep Laundry & <br />
              <span className="serif-italic text-cyan-400 font-normal">Artisanal Garment Care.</span>
            </h1>

            <p className="serif-italic text-slate-300 text-base sm:text-lg mt-2 font-medium text-center md:text-left">
              Aapke Saare Kaam, humare saath aasaan.
            </p>

            <p className="mt-4 text-xs sm:text-base text-slate-200 leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0">
              From everyday wash & fold to silk sarees and Italian suits. Handled in 100% individual sanitized drums with European eco-enzymes and vacuum steam tables.
            </p>

            {/* Quick Pincode Checker */}
            <form onSubmit={handlePincodeSubmit} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md w-full mx-auto md:mx-0">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => {
                    setPincode(e.target.value.replace(/\D/g, ''))
                    setPincodeMsg(null)
                  }}
                  placeholder="Enter 6-digit area pincode"
                  className="w-full rounded-xl bg-[#071120] px-4 py-3 pl-10 text-xs font-semibold text-white placeholder-slate-400 outline-none border border-slate-700 focus:border-cyan-400 text-center sm:text-left"
                />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 hidden sm:block" />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-cyan-400 px-5 py-3 text-xs font-bold text-ocean hover:bg-white transition text-center"
              >
                Check Pickup Valet
              </button>
            </form>

            {pincodeMsg && (
              <p className="mt-2 text-xs font-semibold text-cyan-300">{pincodeMsg}</p>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
              <a
                href="#rate-card"
                className="rounded-full bg-cyan-400 px-6 py-3.5 text-xs font-bold text-ocean hover:bg-white transition shadow-glow"
              >
                View Laundry Rate Card
              </a>
              <button
                type="button"
                onClick={() => onOpenPartnerApply('laundry_vendor')}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition"
              >
                <Handshake size={14} className="text-cyan-400" />
                <span>Partner as Laundry Vendor</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-slate-200 bg-white py-6 px-6 md:px-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-600 shrink-0" />
            <span>100% Zero-Mixing Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-blue-600 shrink-0" />
            <span>24H Express Rush Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-blue-600 shrink-0" />
            <span>Free Doorstep Pickup (&gt; ₹299)</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-blue-600 shrink-0" />
            <span>European Bio-Enzyme Care</span>
          </div>
        </div>
      </section>

      {/* 6 Laundry Offerings */}
      <section className="py-14 sm:py-20 px-3 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-10 sm:mb-12 text-center md:text-left mx-auto md:mx-0">
            <p className="eyebrow"><span /> Certified Fabric Care</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Specialised Services for Every Garment
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Individual sanitized drums, eco-solvents, vacuum steam press tables, and protective packaging.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {laundryCat.offerings.map(s => (
              <div
                key={s.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2.2rem] bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition"
              >
                <div>
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full bg-white/95 px-2.5 sm:px-3 py-1 text-[10px] font-bold text-slate-800">
                      {s.tag}
                    </span>
                    {s.badge && (
                      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-cyan-400 px-2 sm:px-2.5 py-1 text-[10px] font-extrabold text-ocean">
                        {s.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-xs font-semibold text-white drop-shadow">
                      {s.tagline}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed sm:min-h-[44px]">
                      {s.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <Check size={13} className="text-blue-600 font-bold shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">Starting</span>
                    <span className="font-display text-lg sm:text-xl font-extrabold text-blue-600">{s.price}</span>
                    <span className="text-xs text-slate-500">{s.unit}</span>
                  </div>
                  <a
                    href="#rate-card"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                  >
                    View Rates →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laundry Rate Card */}
      <section id="rate-card" className="bg-slate-50 py-20 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl mb-10">
            <p className="eyebrow"><span /> Transparent Per-Kg & Per-Piece Rates</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
              Official Laundry Rate Card
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              No hidden delivery surcharges. Digital scales with live SMS weight receipts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {laundryPricing.map(tier => (
              <div
                key={tier.category}
                className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm"
              >
                <h3 className="font-display font-bold text-base text-ocean border-b border-slate-100 pb-3">
                  {tier.category}
                </h3>
                <div className="mt-3 divide-y divide-slate-100 text-xs">
                  {tier.items.map(item => (
                    <div key={item.name} className="flex items-center justify-between py-2.5">
                      <div>
                        <span className="font-bold text-slate-800">{item.name}</span>
                        {item.note && (
                          <span className="block text-[11px] text-slate-500">{item.note}</span>
                        )}
                      </div>
                      <span className="font-display font-extrabold text-blue-600 shrink-0 text-sm">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Laundry Passes */}
      <section className="py-14 sm:py-20 px-3 sm:px-6 md:px-10 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <p className="eyebrow"><span /> Household Laundry Passes</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-ink">
              Put Home Laundry on Autopilot
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Save up to 25% on weekly loads with priority turnaround and free pickup bags.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {laundrySubs.map(plan => (
              <div
                key={plan.id}
                className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between border ${
                  plan.popular
                    ? 'bg-ocean text-white border-cyan-400 shadow-lift ring-2 ring-cyan-400/30'
                    : 'bg-white text-ink border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      plan.popular ? 'bg-cyan-400 text-ocean' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {plan.badge || 'Pass'}
                  </span>
                  <h3 className="font-display text-xl font-bold mt-3">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className={`font-display text-3xl font-extrabold ${plan.popular ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400">{plan.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={13} className={plan.popular ? 'text-cyan-400' : 'text-blue-600'} />
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenPartnerApply('laundry_vendor')}
                  className={`mt-6 w-full rounded-full py-3 text-xs font-bold transition ${
                    plan.popular
                      ? 'bg-cyan-400 text-ocean hover:bg-white'
                      : 'bg-ocean text-white hover:bg-ocean-light'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Callout */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-14 px-6 md:px-10 text-white text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Do You Own a Laundry, Dry Cleaning, or Pressing Shop?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-cyan-100 leading-relaxed">
            Partner with Saare Kaam. We bring verified daily customer volume right to your workshop and handle all pickups and deliveries.
          </p>
          <button
            type="button"
            onClick={() => onOpenPartnerApply('laundry_vendor')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold text-ocean hover:bg-cyan-100 transition shadow-lg"
          >
            <Handshake size={15} />
            <span>Apply as Laundry Vendor Partner</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Regional Operations & Direct Support Desk */}
      <section className="bg-slate-100 py-10 px-6 md:px-10 border-t border-slate-200 text-xs text-slate-600">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-slate-200 text-blue-600 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Regional Operations Center</p>
              <p>Chandrasekharpur, Bhubaneswar, Odisha, India, 751017</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            <a href="mailto:support@saarekaam.com" className="inline-flex items-center gap-1.5 hover:text-blue-700 font-semibold">
              <span>Customer Help: support@saarekaam.com</span>
            </a>
            <span className="text-slate-300">•</span>
            <a href="mailto:business@saarekaam.com" className="inline-flex items-center gap-1.5 hover:text-blue-700 font-semibold">
              <span>Partner Desk: business@saarekaam.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
