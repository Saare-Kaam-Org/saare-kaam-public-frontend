import { useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'
import { pricingTiers } from '../../data/content'

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  const current = pricingTiers[activeCategory]

  return (
    <section id="pricing" className="bg-slate-50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Upfront & Transparent</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Honest Price Details. <br />
              <span className="serif-italic text-blue-600 font-normal">No Hidden Fees.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Clear per-kg and per-piece rates. Clothes are weighed and inspected digitally with instant SMS receipts.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {pricingTiers.map((tier, idx) => (
            <button
              key={tier.category}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition duration-200 whitespace-nowrap ${
                activeCategory === idx
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tier.category}
            </button>
          ))}
        </div>

        {/* Pricing Table Card */}
        <div className="mt-6 overflow-hidden rounded-[2.2rem] bg-white border border-slate-200 shadow-card">
          <div className="border-b border-slate-200 bg-blue-50/50 p-6 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                Category Rate Card
              </span>
              <h3 className="font-display text-xl font-bold text-ink mt-0.5">
                {current.category}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-white px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm">
              <ShieldCheck size={15} />
              <span>Free doorstep pickup on all orders over ₹299</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 p-2 md:p-4">
            {current.items.map(item => (
              <div
                key={item.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl transition hover:bg-slate-50"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-ink">{item.name}</h4>
                  {item.note && (
                    <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>
                  )}
                </div>

                <div className="text-right">
                  <span className="font-display text-lg font-extrabold text-blue-600">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Inclusions */}
          <div className="border-t border-slate-800 bg-ocean p-6 text-white text-xs grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-cyan-400 shrink-0" />
              <span>100% Individual Sanitised Drum Wash</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-cyan-400 shrink-0" />
              <span>Skin-Friendly Bio-Enzyme Detergents</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-cyan-400 shrink-0" />
              <span>Hanger or Origami Fold Packaging Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
