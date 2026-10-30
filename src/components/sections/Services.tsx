import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../../data/content'

export function Services() {
  return (
    <section id="services" className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Thoughtful Garment Care</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Specialised Services for <br />
              <span className="serif-italic text-blue-600 font-normal">Every Piece in Your Wardrobe.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            From daily office wear and casuals to heirloom sarees and designer blazers, our certified fabric technicians apply fabric-specific chemistry.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <article
              key={s.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[2.2rem] bg-white border border-slate-200/80 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div>
                {/* Image banner */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-800 backdrop-blur-md shadow-sm">
                      {s.tag}
                    </span>
                    {s.badge && (
                      <span className="rounded-full bg-cyan-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ocean shadow-sm">
                        {s.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-white drop-shadow">
                    {s.tagline}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                      {s.name}
                    </h3>
                    <a
                      href="#pricing"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 transition duration-200 group-hover:bg-blue-600 group-hover:text-white shadow-sm"
                      title="View Price Details"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 min-h-[48px]">
                    {s.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs">
                    {s.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-slate-700">
                        <Check size={14} className="text-blue-600 shrink-0 font-bold" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price Bar */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/80">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-medium text-slate-500">Starting</span>
                  <span className="font-display text-xl font-extrabold text-blue-600">{s.price}</span>
                  <span className="text-xs font-medium text-slate-500">{s.unit}</span>
                </div>

                <a
                  href="#pricing"
                  className="text-xs font-bold text-blue-600 transition hover:text-blue-800 underline underline-offset-2"
                >
                  View Rate Card →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}