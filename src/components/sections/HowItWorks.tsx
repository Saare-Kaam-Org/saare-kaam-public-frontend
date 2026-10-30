import { Truck, Sparkles, PackageCheck, ShieldCheck, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Truck,
    title: 'Schedule & Valet Pickup',
    desc: 'Choose a 1-hour time slot online or over WhatsApp. Our valet arrives at your door with sanitised garment bags and barcodes each item digitally.',
    highlight: 'Doorstep collection • Live GPS updates',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Dedicated Sanitised Care',
    desc: 'Your clothes get their own individual stainless drum cycle. We sort by fabric sensitivity, use dermatologically safe bio-enzymes, and finish on vacuum steam press tables.',
    highlight: '100% Zero mixing • German eco-enzymes',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Fresh Return in 24-48 Hours',
    desc: 'Sealed inside breathable, antimicrobial protective covers. Choose between boutique origami-folded or hanger-hung delivery, returned right to your doorstep.',
    highlight: 'Wrinkle-free • Ready to wear',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ocean px-6 py-24 text-white md:px-10 md:py-32 relative overflow-hidden">
      {/* Background ambient water glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow eyebrow-light"><span /> Simple & Effortless</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              How Saare Kaam Works. <br />
              <span className="serif-italic text-cyan-400 font-normal">Zero Laundry Stress.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            Three simple steps between your dirty laundry basket and your crisp, fresh wardrobe.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map(s => {
            const Icon = s.icon
            return (
              <div
                key={s.number}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-700/80 bg-ocean-card/90 p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/50 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400 text-ocean font-bold shadow-glow">
                      <Icon size={26} />
                    </div>
                    <span className="font-mono text-3xl font-black text-cyan-400/30">
                      {s.number}
                    </span>
                  </div>

                  <p className="mt-6 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    STEP {s.number}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                    {s.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-4 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>{s.highlight}</span>
                  <ArrowRight size={14} className="text-cyan-400/70" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Banner */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-4 text-xs font-semibold text-white">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <ShieldCheck size={18} />
            <span>Saare Kaam Hygiene Promise:</span>
          </div>
          <p className="text-slate-200">
            Never mixed with any other household's laundry. Every cycle runs individually with medical-grade drum sanitization.
          </p>
        </div>
      </div>
    </section>
  )
}
