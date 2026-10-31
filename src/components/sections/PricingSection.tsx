import { useState } from 'react'
import { Check, ShieldCheck, Shirt, Sparkles } from 'lucide-react'
import { pricingTiers } from '../../data/content'

const tabShortNames = [
  '🧺 Laundry (Per-Kg)',
  '🧹 House Help (Hourly)',
  '👔 Steam Press & Dry Clean',
]

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  const current = pricingTiers[activeCategory] || pricingTiers[0]

  return (
    <section id="pricing" className="bg-slate-50 px-3 sm:px-6 md:px-10 py-16 md:py-28 scroll-mt-20 max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Upfront & Transparent Rates</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Honest Price Details. <br />
              <span className="serif-italic text-blue-600 font-normal">Zero Hidden Fees.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            From per-kg laundry wash & fold to transparent hourly house help — pay strictly for what you need with zero surprise surcharges.
          </p>
        </div>

        {/* Category Tabs - Cleanly wraps and never forces horizontal overflow */}
        <div className="mt-8 sm:mt-12 flex flex-wrap gap-2 pb-2">
          {pricingTiers.map((tier, idx) => (
            <button
              key={tier.category}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold transition duration-200 ${
                activeCategory === idx
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tabShortNames[idx] || tier.category}
            </button>
          ))}
        </div>

        {/* Pricing Table Card */}
        <div className="mt-6 overflow-hidden rounded-3xl sm:rounded-[2.2rem] bg-white border border-slate-200 shadow-card">
          <div className="border-b border-slate-200 bg-blue-50/50 p-4 sm:p-6 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                Category Rate Card
              </span>
              <h3 className="font-display text-base sm:text-xl font-bold text-ink mt-0.5 break-words">
                {current.category}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-blue-700 bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm shrink-0 w-fit max-w-full">
              <ShieldCheck size={14} className="shrink-0" />
              <span>
                {current.category.includes('Laundry')
                  ? 'Free pickup on orders over ₹299'
                  : '100% Police Verified & Transparent'}
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 p-2 sm:p-4">
            {current.items.map(item => (
              <div
                key={item.name}
                className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <h4 className="font-display font-bold text-sm text-ink break-words">{item.name}</h4>
                  {item.note && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.note}</p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="font-display text-sm sm:text-lg font-extrabold text-blue-600 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Inclusions */}
          <div className="border-t border-slate-800 bg-ocean p-4 sm:p-6 text-white text-[11px] sm:text-xs grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Shirt size={15} className="text-cyan-400 shrink-0" />
              <span>100% Individual Sanitised Drum Wash</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-cyan-400 shrink-0" />
              <span>Police-Verified Cleaners & Cooks</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={15} className="text-cyan-400 shrink-0" />
              <span>Transparent Per-Kg & Hourly Rates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
