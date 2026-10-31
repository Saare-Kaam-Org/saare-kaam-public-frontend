import {
  Handshake,
  ArrowUpRight,
  Shirt,
  Sparkles,
} from 'lucide-react'
import type { PartnerRole } from '../../modules/application/types'

type Props = {
  onOpenPartnerApply: (role?: PartnerRole) => void
}

const partnerRoles = [
  {
    role: 'laundry_vendor' as PartnerRole,
    title: 'Laundry Vendors',
    subtitle: 'Fill idle washing machines & steam tables with guaranteed daily doorstep volume.',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    perk: 'Weekly Direct Bank Payouts',
  },
  {
    role: 'house_help' as PartnerRole,
    title: 'House Helpers & Cooks',
    subtitle: 'Dignified household work in verified apartments with transparent hourly / monthly earnings.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    perk: 'Zero Brokerage / Safe Homes',
  },
]

export function PartnerBanner({ onOpenPartnerApply }: Props) {
  return (
    <section id="partner" className="bg-paper px-4 sm:px-6 md:px-10 py-16 md:py-28 scroll-mt-20 max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/60 p-5 sm:p-8 md:p-14 border border-blue-100 shadow-sm">
          <div className="max-w-3xl">
            <p className="eyebrow"><span /> Saare Kaam Local Partner Network</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Grow Your Local Trade. <br />
              <span className="serif-italic text-blue-600 font-normal">Apply for Partnership.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Whether you run a local laundry shop or provide trusted domestic cleaning and cooking — Saare Kaam brings daily customers directly to your doorstep. Submit an application and our team will contact you within 24 hours to onboard you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {partnerRoles.map(item => {
              const Icon = item.icon
              return (
                <div
                  key={item.role}
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenPartnerApply(item.role)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenPartnerApply(item.role)
                    }
                  }}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200 transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-card-hover cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden border-b border-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold text-blue-700 uppercase tracking-wide border border-blue-100 shadow-sm">
                        {item.perk}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
                        <Icon size={18} />
                      </div>
                      <span className="font-display text-base font-bold text-white drop-shadow">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.subtitle}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-blue-600">
                      <span>Apply as {item.title}</span>
                      <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-blue-100 pt-6">
            <span className="serif-italic text-sm text-slate-700 font-semibold">
              "Aapke Saare Kaam, humare saath aasaan."
            </span>

            <button
              type="button"
              onClick={() => onOpenPartnerApply()}
              className="inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-xs font-bold text-white transition hover:bg-ocean-light shadow-md"
            >
              <Handshake size={15} className="text-cyan-400" />
              <span>Open Local Partnership Application</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
