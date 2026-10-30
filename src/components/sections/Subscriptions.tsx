import { Sparkles, ArrowRight } from 'lucide-react'
import { subscriptionPlans } from '../../data/content'

export function Subscriptions() {
  return (
    <section id="subscriptions" className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Household Laundry Passes</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Subscriptions for <br />
              <span className="serif-italic text-blue-600 font-normal">Every Household Routine.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Put your weekly laundry on autopilot. Enjoy discounted member rates, priority 24H slots, and free doorstep pickups.
          </p>
        </div>

        {/* 3 Subscription Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {subscriptionPlans.map(plan => {
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[2.2rem] p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-ocean text-white shadow-lift ring-2 ring-cyan-400/40'
                    : 'bg-white text-ink border border-slate-200 shadow-card hover:shadow-card-hover'
                }`}
              >
                <div>
                  {/* Top Popular Pill */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                        plan.popular
                          ? 'bg-cyan-400 text-ocean shadow-glow'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {plan.popular ? 'Most Popular Value' : 'Flexible Plan'}
                    </span>
                    {plan.popular && <Sparkles size={16} className="text-cyan-400" />}
                  </div>

                  <h3
                    className={`mt-6 font-display text-2xl font-bold tracking-tight ${
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

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-5xl font-extrabold tracking-tight ${
                        plan.popular ? 'text-cyan-400' : 'text-blue-600'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        plan.popular ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <div
                    className={`my-6 h-px ${
                      plan.popular ? 'bg-white/15' : 'bg-slate-100'
                    }`}
                  />

                  {/* Features List */}
                  <ul className="space-y-3 text-xs">
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
                <div className="mt-8 pt-6">
                  <a
                    href="#top"
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-bold transition duration-200 shadow-sm ${
                      plan.popular
                        ? 'bg-cyan-400 text-ocean hover:bg-white'
                        : 'bg-ocean text-white hover:bg-ocean-light'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={14} />
                  </a>

                  <p
                    className={`mt-3 text-center text-[10px] ${
                      plan.popular ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    Pause or cancel anytime with zero cancellation penalties.
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
