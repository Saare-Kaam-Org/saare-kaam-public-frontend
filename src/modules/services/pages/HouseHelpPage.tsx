import { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Handshake,
  CheckCircle2,
  Clock,
  Home,
  Utensils,
  Check,
  ChefHat,
  HeartHandshake,
  Mail,
  MapPin,
  BadgeCheck,
} from 'lucide-react'
import type { PartnerRole } from '../../application/types'

type Props = {
  onNavigate: (path: string) => void
  onOpenPartnerApply: (role?: PartnerRole) => void
}

const hourlyTiers = [
  {
    id: '1hr',
    title: '1-Hour Quick Help',
    price: '₹149',
    period: '/ hour',
    tag: 'Quick Assist',
    badge: 'Hourly',
    desc: 'Rapid domestic assistance for quick dishwashing, kitchen counter sanitization, floor sweeping & dusting.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
    features: [
      '1 Hour dedicated domestic helper',
      'Kitchen dishwashing & sink sanitisation',
      'Living & bedroom floor sweeping & dusting',
      'Trash collection & doorstep disposal',
      'Police-verified & Aadhaar authenticated helper',
    ],
  },
  {
    id: '3hr',
    title: '3-Hours Clean & Cook',
    price: '₹399',
    period: '/ 3-hour session',
    tag: 'Clean & Cook',
    badge: 'Most Popular',
    popular: true,
    desc: 'Our complete household maintenance: fresh home cooking (roti, sabzi, dal, rice) plus full-house sweeping & wet mopping.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    features: [
      '3 Hours dedicated domestic helper',
      'Fresh home meal cooking (lunch or dinner)',
      'Apartment sweeping & wet floor mopping',
      'Complete utensil washing & counter wipe',
      'Bathroom hygiene touch-up & balcony dusting',
    ],
  },
  {
    id: 'fullday',
    title: 'Full Day Dedicated Helper',
    price: '₹899',
    period: '/ day (8 hrs)',
    tag: 'All-Day Care',
    badge: 'Best Value',
    desc: 'Continuous 8-hour domestic assistance for busy households, family functions, or post-party cleanups and meals.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Full 8 hours continuous domestic support',
      'All house sweeping, mopping & dusting',
      'Lunch & dinner fresh meal preparation',
      'Continuous dishwashing & kitchen upkeep',
      'Wardrobe folding & bed making',
    ],
  },
]

const helperTasks = [
  {
    icon: Home,
    title: 'Sweeping & Wet Mopping',
    desc: 'Deep corner-to-corner floor sanitization with safe herbal cleaners for tiles, marble, and hardwood.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Utensils,
    title: 'Utensils & Sink Scrubbing',
    desc: 'Spotless cleaning of everyday pots, pans, plates, and cutlery with grease-free sink sanitization.',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: ChefHat,
    title: 'Fresh Home Cooking',
    desc: 'Hygienic home-style vegetarian & regional cuisine: soft chapatis/rotis, seasonal sabzis, dal tadka, and rice.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Sparkles,
    title: 'Dusting & Home Upkeep',
    desc: 'Balcony cleaning, furniture dusting, bed linen straightening, and organized wardrobe care.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
  },
]

export function HouseHelpPage({ onNavigate, onOpenPartnerApply }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cityArea, setCityArea] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('3-Hours Clean & Cook (₹399)')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingConfirmed(true)
  }

  return (
    <div className="bg-paper text-ink">
      {/* Top Hero */}
      <section className="relative overflow-hidden bg-[#071c1b] text-white pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 px-3.5 sm:px-8 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-teal-600/20 blur-[130px]" />

        {/* Real Domestic Helper Photography in Hero */}
        <div className="absolute inset-y-0 right-0 w-full md:left-[45%] md:w-[55%] pointer-events-none overflow-hidden">
          <img
            className="h-full w-full object-cover opacity-35 filter brightness-95"
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=90"
            alt="Real Domestic Helper Maintaining Clean Living Space"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071c1b] via-[#071c1b]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071c1b] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-400 mb-6">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-teal-400 transition"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-teal-400 font-bold">House Help Service</span>
          </div>

          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold text-teal-300 border border-teal-400/30 mb-4">
              <Sparkles size={14} />
              <span>LIVE SERVICE • TRANSPARENT HOURLY RATES</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white text-center md:text-left">
              House Help Service <br />
              <span className="serif-italic text-teal-400 font-normal">All Cleaning & Cooking.</span>
            </h1>

            <p className="serif-italic text-slate-300 text-base sm:text-lg mt-2 font-medium text-center md:text-left">
              Aapke Saare Kaam, humare saath aasaan.
            </p>

            <p className="mt-4 text-xs sm:text-base text-slate-200 leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0">
              From daily floor sweeping & mopping to kitchen dishwashing and fresh home-cooked meals. Billed purely at transparent hourly rates: 1 Hour, 3 Hours, or Full Day.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
              <a
                href="#hourly-rates"
                className="rounded-full bg-teal-400 px-7 py-3.5 text-xs font-extrabold text-[#071c1b] hover:bg-white transition shadow-glow"
              >
                View Hourly Rates (1h, 3h, Full Day)
              </a>
              <button
                type="button"
                onClick={() => onOpenPartnerApply('house_help')}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition"
              >
                <Handshake size={14} className="text-teal-300" />
                <span>Partner as House Helper</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="border-y border-slate-200 bg-white py-6 px-6 md:px-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-teal-600 shrink-0" />
            <span>100% Police Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck size={20} className="text-teal-600 shrink-0" />
            <span>Aadhaar Authenticated</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-teal-600 shrink-0" />
            <span>Pure Hourly Rates</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake size={20} className="text-teal-600 shrink-0" />
            <span>Zero Brokerage Fees</span>
          </div>
        </div>
      </section>

      {/* Real Work Highlights Section */}
      <section className="py-16 px-6 md:px-10 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow"><span /> What We Cover</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
              Real Household Assistance Every Day
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              No robotic dispatch or generic promises. Our verified domestic helpers take care of all common home chores with care and diligence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {helperTasks.map(t => {
              const Icon = t.icon
              return (
                <div key={t.title} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-40 overflow-hidden">
                    <img src={t.image} alt={t.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="inline-flex items-center gap-2 text-teal-700 mb-2">
                      <Icon size={16} />
                      <span className="font-bold text-xs uppercase tracking-wider font-mono">Verified Task</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-ink">{t.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hourly Pricing Cards with Real People Photos */}
      <section id="hourly-rates" className="py-14 sm:py-20 px-3 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-10 sm:mb-12 text-center md:text-left mx-auto md:mx-0">
            <p className="eyebrow"><span /> Transparent Hourly Rates</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Choose the Duration You Need
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Only pay for the hours worked. Every helper is verified and experienced in thorough floor care, dishwashing, and home cooking.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hourlyTiers.map(tier => {
              const Icon = tier.icon
              return (
                <div
                  key={tier.id}
                  className={`rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between border transition ${
                    tier.id === 'fullday' ? 'sm:col-span-2 lg:col-span-1' : ''
                  } ${
                    tier.popular
                      ? 'bg-[#071c1b] text-white border-teal-400 shadow-lift ring-2 ring-teal-400/30'
                      : 'bg-white text-ink border-slate-200 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <div>
                    {/* Real Helper Photo */}
                    <div className="relative h-48 overflow-hidden border-b border-slate-200/50">
                      <img
                        src={tier.image}
                        alt={tier.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold text-teal-300 border border-teal-400/30 uppercase">
                          {tier.tag}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            tier.popular ? 'bg-teal-400 text-[#071c1b]' : 'bg-white text-slate-800'
                          }`}
                        >
                          {tier.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-lg ${
                            tier.popular ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <h3 className="font-display text-xl font-bold">{tier.title}</h3>
                      </div>

                      <p className={`mt-2 text-xs leading-relaxed ${tier.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                        {tier.desc}
                      </p>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className={`font-display text-3xl font-extrabold ${tier.popular ? 'text-teal-400' : 'text-teal-700'}`}>
                          {tier.price}
                        </span>
                        <span className={`text-xs ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                          {tier.period}
                        </span>
                      </div>

                      <ul className={`mt-5 space-y-2 text-xs border-t pt-4 ${tier.popular ? 'border-teal-900/60' : 'border-slate-100'}`}>
                        {tier.features.map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <Check size={14} className={tier.popular ? 'text-teal-300' : 'text-teal-600'} />
                            <span className={tier.popular ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pt-0">
                    <a
                      href="#request-helper"
                      onClick={() => setSelectedPlan(`${tier.title} (${tier.price})`)}
                      className={`block text-center rounded-full py-3 text-xs font-bold transition ${
                        tier.popular
                          ? 'bg-teal-400 text-[#071c1b] hover:bg-white'
                          : 'bg-[#071c1b] text-white hover:bg-slate-800'
                      }`}
                    >
                      Request {tier.title}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Realistic Callback Request Form (Manual reach out) */}
      <section id="request-helper" className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-slate-200">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-5 sm:p-8 md:p-12 border border-slate-200 shadow-card">
          <div className="text-center max-w-xl mx-auto">
            <p className="eyebrow"><span /> Doorstep Service Callback</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
              Request House Helper Callback
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Submit your preferred hours and location. Our city operations team will contact you on WhatsApp or call within 24 hours to confirm your booking.
            </p>
          </div>

          {bookingConfirmed ? (
            <div className="mt-8 text-center p-8 bg-teal-50 rounded-2xl border border-teal-200">
              <CheckCircle2 size={44} className="mx-auto text-teal-600 mb-2" />
              <h3 className="font-display text-xl font-bold text-ink">Service Callback Request Received!</h3>
              <p className="text-xs text-slate-600 mt-2">
                Thank you, <strong>{name}</strong>! Our local city coordinator will contact you via WhatsApp or call at <strong>{phone}</strong> to confirm timings and assign a verified domestic helper for <strong>{selectedPlan}</strong> in <strong>{cityArea}</strong>.
              </p>
              <div className="mt-4 pt-4 border-t border-teal-200/60 text-[11px] text-slate-600 space-y-1">
                <p>Need urgent support? Email us directly at <a href="mailto:support@saarekaam.com" className="font-bold text-teal-700 underline">support@saarekaam.com</a></p>
                <p className="text-slate-500">Regional Desk: Chandrasekharpur, Bhubaneswar, Odisha, 751017</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="mt-8 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Your Full Name *
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                  />
                </label>

                <label className="field-label">
                  WhatsApp Phone Number *
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Your City & Locality *
                  <input
                    required
                    type="text"
                    value={cityArea}
                    onChange={e => setCityArea(e.target.value)}
                    placeholder="e.g. Patia / Chandrasekharpur, Bhubaneswar"
                  />
                </label>

                <label className="field-label">
                  Selected Hourly Tier
                  <select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)}>
                    <option value="1-Hour Quick Help (₹149)">1-Hour Quick Help (₹149)</option>
                    <option value="3-Hours Clean & Cook (₹399)">3-Hours Clean & Cook (₹399)</option>
                    <option value="Full Day Dedicated Helper (₹899)">Full Day Dedicated Helper (₹899)</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 py-4 text-sm font-bold text-white hover:bg-teal-700 transition shadow-md"
              >
                <span>Submit Helper Request</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-center text-[11px] text-slate-500 font-sans mt-2">
                Pay directly to your helper after service completion. Zero brokerage or hidden fees.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Helper Partner Banner */}
      <section className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white py-14 px-6 md:px-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Are You a Domestic Helper, Cook, or Housekeeping Agency?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-teal-100 leading-relaxed">
            Join the Saare Kaam Home Care Network. Get dignified work in verified, safe apartments with prompt weekly or monthly settlements and zero agent brokerage cuts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenPartnerApply('house_help')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold text-teal-900 hover:bg-teal-100 transition shadow-lg"
            >
              <Handshake size={15} />
              <span>Apply as House Helper Partner</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="mailto:business@saarekaam.com?subject=House%20Help%20Partnership%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-teal-800/80 border border-white/20 px-6 py-3.5 text-xs font-bold text-white hover:bg-teal-800 transition"
            >
              <Mail size={14} />
              <span>Partner Desk: business@saarekaam.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Regional Office & Support Section */}
      <section className="bg-slate-100 py-10 px-6 md:px-10 border-t border-slate-200 text-xs text-slate-600">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-slate-200 text-teal-700 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Regional Operations Center</p>
              <p>Chandrasekharpur, Bhubaneswar, Odisha, India, 751017</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            <a href="mailto:support@saarekaam.com" className="inline-flex items-center gap-1.5 hover:text-teal-700 font-semibold">
              <Mail size={14} className="text-teal-600" />
              <span>support@saarekaam.com</span>
            </a>
            <span className="text-slate-300">•</span>
            <a href="mailto:business@saarekaam.com" className="inline-flex items-center gap-1.5 hover:text-teal-700 font-semibold">
              <Mail size={14} className="text-teal-600" />
              <span>business@saarekaam.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
