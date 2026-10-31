import { Code2, Boxes, Megaphone, ArrowUpRight } from 'lucide-react'

export function B2BPromoBanner() {
  const b2bUrl = import.meta.env.VITE_B2B_URL || 'http://localhost:5555'

  return (
    <section className="relative max-w-full overflow-hidden bg-gradient-to-r from-[#160b24] via-[#2d0f3a] to-[#4c0535] px-4 sm:px-6 md:px-10 py-16 text-white border-t border-purple-900/40">
      {/* Background neon glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-pink-400 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30">
              Saare Kaam Enterprise & Digital
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            We also provide Software & B2B Services.
          </h3>

          <p className="mt-2 text-sm text-pink-100/80 max-w-2xl leading-relaxed">
            Need custom web & mobile apps, turnkey ERP setups (Lifetime License or ₹999/mo Cloud), or viral creator social marketing campaigns? Explore our dedicated B2B software engineering portal.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-pink-200">
            <span className="inline-flex items-center gap-1.5"><Code2 size={14} className="text-pink-400" /> Software Development</span>
            <span className="inline-flex items-center gap-1.5"><Boxes size={14} className="text-pink-400" /> ERPs Product (Lifetime Setup)</span>
            <span className="inline-flex items-center gap-1.5"><Megaphone size={14} className="text-pink-400" /> Social Marketing</span>
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0 flex justify-start sm:justify-end">
          <a
            href={b2bUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto justify-center inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-extrabold text-white shadow-[0_0_30px_rgba(236,72,153,0.35)] transition duration-200 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] text-center"
          >
            <span>Visit Saare Kaam B2B Software Portal</span>
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
