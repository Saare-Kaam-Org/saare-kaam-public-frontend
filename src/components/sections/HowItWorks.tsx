import { ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Schedule Your Doorstep Service',
    desc: 'Select Laundry per-kg pickup (weekly or multiple days a week) or book House Help at transparent hourly rates (1 hr, 3 hrs, or full day).',
    highlight: 'Doorstep pickup • Instant online booking',
  },
  {
    number: '02',
    title: 'Expert, Verified & Sanitised Care',
    desc: 'Clothes are washed in 100% individual sanitised drums with European bio-enzymes. Domestic helpers are 100% police-verified and Aadhaar-authenticated.',
    highlight: 'Zero mixing • Verified domestic staff',
  },
  {
    number: '03',
    title: 'Punctual Delivery & Transparent Billing',
    desc: 'Garments delivered crisp & neatly folded within 24-48 hours. Domestic help billed strictly by time with zero agency commissions or hidden fees.',
    highlight: '100% Satisfaction guarantee',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ocean px-6 py-20 text-white md:px-10 md:py-28 relative overflow-hidden scroll-mt-20">
      {/* Background ambient water glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow eyebrow-light"><span /> Simple & Seamless Process</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              How Saare Kaam Works. <br />
              <span className="serif-italic text-cyan-400 font-normal">humare saath aasaan.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Enjoy reliable doorstep services with professional care, transparent pricing, and zero hassle.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map(step => (
            <div
              key={step.number}
              className="relative rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition duration-300 hover:bg-white/10"
            >
              <span className="font-mono text-3xl font-extrabold text-cyan-400">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {step.desc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-300 border-t border-white/10 pt-4">
                <ShieldCheck size={14} />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
