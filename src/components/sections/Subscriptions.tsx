import { ArrowRight, Shirt } from 'lucide-react'
import { usePlans } from '../../modules/plan/hooks/usePlans'

export function Subscriptions() {
  const { plans: filteredPlans } = usePlans('laundry')

  return (
    <section id="subscriptions" className="bg-paper px-6 py-20 md:px-10 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Flexible Recurring Passes</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Subscriptions for <br />
              <span className="serif-italic text-blue-600 font-normal">Homes & Businesses.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            Put your weekly household laundry on autopilot or run your business on high-speed cloud ERP. Transparent tiers, zero lock-ins.
          </p>
        </div>

        {/* Household Laundry Passes */}
        <div className="mt-8 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">
            <Shirt size={13} />
            <span>Household Laundry & Garment Care Passes</span>
          </span>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map(plan => {
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[2.2rem] p-7 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-ocean text-white shadow-lift ring-2 ring-cyan-400/40'
                    : 'bg-white text-ink border border-slate-200 shadow-card hover:shadow-card-hover'
                }`}
              >
                <div>
                  {/* Top Pill */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                        plan.popular
                          ? 'bg-cyan-400 text-ocean shadow-glow'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {plan.badge || (plan.popular ? 'Most Popular' : 'Standard Plan')}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {plan.serviceCategory === 'laundry' ? 'Laundry' : 'ERP Suite'}
                    </span>
                  </div>

                  <h3
                    className={`mt-5 font-display text-2xl font-bold tracking-tight ${
                      plan.popular ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      plan.popular ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${
                        plan.popular ? 'text-cyan-400' : 'text-blue-600'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        plan.popular ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <div
                    className={`my-5 h-px ${
                      plan.popular ? 'bg-white/15' : 'bg-slate-100'
                    }`}
                  />

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full mt-0.5 text-[10px] font-black ${
                            plan.popular
                              ? 'bg-cyan-400 text-ocean'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          ✓
                        </span>
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="mt-7 pt-5 border-t border-slate-100/10">
                  <a
                    href="#top"
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold transition duration-200 shadow-sm ${
                      plan.popular
                        ? 'bg-cyan-400 text-ocean hover:bg-white'
                        : 'bg-ocean text-white hover:bg-ocean-light'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={14} />
                  </a>

                  <p className="mt-2.5 text-center text-[10px] text-slate-400">
                    Zero cancellation penalties, pause or adjust anytime.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
