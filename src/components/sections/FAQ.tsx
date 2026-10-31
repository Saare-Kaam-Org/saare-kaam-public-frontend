import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../../data/content'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faqs" className="bg-slate-50 px-6 py-20 md:px-10 md:py-28 scroll-mt-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow"><span /> Got Questions?</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Frequently Asked <br />
            <span className="serif-italic text-blue-600 font-normal">Questions.</span>
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-sm">
            Everything you need to know about Saare Kaam local doorstep services: Laundry & Garment Care per-kg plans, House Help hourly rates, and local partner onboarding.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-5 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block mb-1">Our Core Commitment:</span>
            <p className="serif-italic text-blue-600 text-sm font-semibold">
              "Aapke Saare Kaam, humare saath aasaan."
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Reliable execution, certified hygiene, and direct transparent payouts.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="divide-y divide-slate-200">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <div key={f.q} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-base font-bold text-ink sm:text-lg transition hover:text-blue-600"
                >
                  <span>{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition duration-200 ${
                      isOpen
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-5 pr-8 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
