import { Handshake, ArrowUpRight, Building2, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react'

type Props = {
  onOpenPartnerApply: () => void
}

export function PartnerBanner({ onOpenPartnerApply }: Props) {
  return (
    <section id="partner" className="bg-paper px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/60 p-8 md:p-14 border border-blue-100 shadow-sm">
          <div className="max-w-3xl">
            <p className="eyebrow"><span /> Saare Kaam Partner Network</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Empowering Local Laundry & <br />
              <span className="serif-italic text-blue-600 font-normal">Dry Cleaning Workshops.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Do you own a laundry, dry cleaner, or steam pressing workshop? Partner with Saare Kaam. We handle 100% of the customer pickup, delivery valets, and digital marketing, bringing steady daily order batches directly to your facility.
            </p>
          </div>

          {/* 4 Benefits */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold mb-3">
                <TrendingUp size={20} />
              </span>
              <h4 className="font-display font-bold text-sm text-ocean">Guaranteed Daily Volume</h4>
              <p className="mt-1 text-slate-500 leading-relaxed">Fill idle capacity 365 days a year with steady bulk batches.</p>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold mb-3">
                <Building2 size={20} />
              </span>
              <h4 className="font-display font-bold text-sm text-ocean">Zero Delivery Stress</h4>
              <p className="mt-1 text-slate-500 leading-relaxed">Our valets collect from users and drop off at your workshop.</p>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold mb-3">
                <DollarSign size={20} />
              </span>
              <h4 className="font-display font-bold text-sm text-ocean">Weekly Direct Payouts</h4>
              <p className="mt-1 text-slate-500 leading-relaxed">Automated NEFT/UPI bank settlements every Monday.</p>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold mb-3">
                <ShieldCheck size={20} />
              </span>
              <h4 className="font-display font-bold text-sm text-ocean">Free Chemical Subsidies</h4>
              <p className="mt-1 text-slate-500 leading-relaxed">Bulk discounts on eco detergents, garment bags & spotting chemicals.</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-8">
            <div className="text-xs text-slate-600">
              <strong className="text-ocean">Quick 2-minute application:</strong> Enter your workshop name, machinery, and daily capacity.
            </div>

            <button
              type="button"
              onClick={onOpenPartnerApply}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-ocean px-8 py-4 text-xs font-bold text-white transition duration-200 hover:bg-ocean-light shadow-md active:scale-95 border border-slate-700/50"
            >
              <Handshake size={16} className="text-cyan-400" />
              <span>Apply for Partnership Now</span>
              <ArrowUpRight size={15} className="text-cyan-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
