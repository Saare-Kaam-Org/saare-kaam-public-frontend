import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Shirt,
  Sparkles,
  CheckCircle2,
  X,
  Handshake,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { serviceCategories } from '../../data/content'
import type { ServiceCategory, ServiceOffering } from '../../types'
import type { PartnerRole } from '../../modules/application/types'
import { useServices } from '../../modules/services/hooks/useServices'

type Props = {
  activeTab?: string
  onTabChange?: (tabId: string) => void
  onNavigate?: (path: string) => void
  onOpenPartnerApply: (role?: PartnerRole) => void
}

const iconMap: Record<string, typeof Shirt> = {
  Shirt,
  Sparkles,
}

const cardThemeMap: Record<
  string,
  {
    path: string
    image: string
    gradientClass: string
    imageOverlayGradient: string
    borderColor: string
    glowClass: string
    iconBg: string
    iconColor: string
    badgeBg: string
    badgeText: string
    badgeBorder: string
    pathBadgeBg: string
    pathBadgeText: string
    hindiColor: string
  }
> = {
  laundry: {
    path: '/laundry',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    gradientClass: 'bg-gradient-to-br from-[#0b172c] via-[#0e2748] to-[#0284c7]',
    imageOverlayGradient: 'from-[#0b172c] via-[#0b172c]/75 to-transparent',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    glowClass: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]',
    iconBg: 'bg-cyan-500/25 border border-cyan-400/40',
    iconColor: 'text-cyan-300',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-400/40',
    pathBadgeBg: 'bg-cyan-500/20 border-cyan-400/30',
    pathBadgeText: 'text-cyan-200',
    hindiColor: 'text-cyan-300',
  },
  houseHelp: {
    path: '/house-help',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    gradientClass: 'bg-gradient-to-br from-[#071c1b] via-[#0f3d36] to-[#059669]',
    imageOverlayGradient: 'from-[#071c1b] via-[#071c1b]/75 to-transparent',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    glowClass: 'hover:shadow-[0_0_35px_rgba(45,212,191,0.3)]',
    iconBg: 'bg-teal-500/25 border border-teal-400/40',
    iconColor: 'text-teal-300',
    badgeBg: 'bg-teal-500/20',
    badgeText: 'text-teal-300',
    badgeBorder: 'border-teal-400/40',
    pathBadgeBg: 'bg-teal-500/20 border-teal-400/30',
    pathBadgeText: 'text-teal-200',
    hindiColor: 'text-teal-300',
  },
}

const getTheme = (idOrSlug: string) => {
  const s = idOrSlug.toLowerCase()
  if (s.includes('house') || s.includes('help') || s.includes('maid')) return cardThemeMap.houseHelp
  return cardThemeMap.laundry
}

export function Services({
  activeTab,
  onTabChange,
  onNavigate,
  onOpenPartnerApply,
}: Props) {
  const [internalActiveId, setInternalActiveId] = useState<string>('laundry')
  const [inspectOffering, setInspectOffering] = useState<ServiceOffering | null>(null)

  // Live dynamic services loaded from PostgreSQL via custom hook
  const { services } = useServices()

  const currentTabId = activeTab || internalActiveId

  const handleCardClick = (catId: string, pathOverride?: string) => {
    setInternalActiveId(catId)
    if (onTabChange) {
      onTabChange(catId)
    }
    const theme = getTheme(catId)
    const targetPath = pathOverride || theme.path
    if (onNavigate && targetPath) {
      onNavigate(targetPath)
    }
  }

  const currentCategory: ServiceCategory =
    serviceCategories.find(c => c.id === currentTabId) || serviceCategories[0]

  return (
    <section id="services" className="bg-paper px-3 sm:px-6 md:px-10 py-14 md:py-28 scroll-mt-20 max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Top Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> All Works Under One Roof</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Aapke Saare Kaam, <br />
              <span className="serif-italic text-blue-600 font-normal">humare saath aasaan.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            Click on any service card below to open its dedicated page with transparent pricing, full technical specs, and instant booking / partnership options.
          </p>
        </div>

        {/* 2 LOCAL COLOR-THEMED GRADIENT CARDS */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {(services.length > 0 ? services : serviceCategories).map((item: any, idx: number) => {
            const slug = item.slug || item.id
            const name = item.name
            const hindiSubtitle = item.hindiSubtitle
            const shortDesc = item.shortDesc
            const path = item.path || getTheme(slug).path
            const Icon = iconMap[item.iconName] || Shirt
            const theme = getTheme(slug)
            const statusUpper = (item.status || 'ACTIVE').toUpperCase()
            const isLive = statusUpper === 'ACTIVE'
            const isDeprecated = statusUpper === 'DEPRECATED'

            return (
              <div
                key={slug}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(slug, path)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(slug, path)
                  }
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border-2 ${theme.borderColor} ${theme.gradientClass} p-4 sm:p-6 text-left text-white transition-all duration-300 hover:-translate-y-2 ${theme.glowClass} cursor-pointer shadow-lg`}
              >
                {/* Background Image with Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img
                    src={item.imageUrl || theme.image}
                    alt={name}
                    className="h-full w-full object-cover opacity-25 filter contrast-125 transition-transform duration-700 group-hover:scale-115"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.imageOverlayGradient}`} />
                </div>

                {/* Content over gradient & image */}
                <div className="relative z-10">
                  {/* Top Bar with Icon & Database Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl ${theme.iconBg} ${theme.iconColor} transition duration-300 group-hover:scale-110 shadow-md backdrop-blur-md`}
                    >
                      <Icon size={22} />
                    </div>

                    {isLive ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} px-2.5 py-0.5 text-[10px] font-extrabold uppercase backdrop-blur-md`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    ) : isDeprecated ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-slate-600/30 text-slate-300 border border-slate-500/40 px-2.5 py-0.5 text-[10px] font-extrabold uppercase backdrop-blur-md"
                      >
                        <AlertCircle size={10} className="text-slate-400" />
                        Deprecated
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} px-2.5 py-0.5 text-[10px] font-extrabold uppercase backdrop-blur-md`}
                      >
                        <Sparkles size={10} className="text-amber-400" />
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl font-extrabold text-white group-hover:text-cyan-200 transition">
                    {idx + 1}. {name}
                  </h3>

                  <p className={`font-mono text-xs font-bold ${theme.hindiColor} mt-1 line-clamp-1`}>
                    {hindiSubtitle}
                  </p>

                  <p className="mt-2.5 text-xs text-slate-200/90 leading-relaxed line-clamp-2">
                    {shortDesc}
                  </p>
                </div>

                {/* Bottom Route Link Callout with Category Tag */}
                <div className="relative z-10 mt-6 border-t border-white/15 pt-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white transition">
                    <span
                      className={`font-mono text-[10px] font-semibold ${theme.pathBadgeBg} ${theme.pathBadgeText} border px-3 py-1 rounded-lg backdrop-blur-md uppercase tracking-wider`}
                    >
                      {slug === 'laundry' ? 'Per-Kg Doorstep Valet' : 'Verified Hourly Care'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 group-hover:text-white">
                      <span>Explore Rates & Details</span>
                      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Service Detailed Showcase on Homepage */}
        <div className="mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50/70 to-blue-50/40 border border-slate-200 shadow-card p-3 sm:p-7 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-200/80 pb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
                  {currentCategory.heroBadge}
                </span>
                <span className="serif-italic text-sm text-slate-500">
                  {currentCategory.hindiSubtitle}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                {currentCategory.name}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentCategory.longDesc}
              </p>

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {currentCategory.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3 shrink-0 lg:w-72">
              <button
                type="button"
                onClick={() => {
                  const theme = cardThemeMap[currentCategory.id]
                  if (onNavigate && theme) {
                    onNavigate(theme.path)
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-md"
              >
                <span>View {currentCategory.name} Rates & Details</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => onOpenPartnerApply(currentCategory.partnerRole)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3.5 text-xs font-bold text-white transition hover:bg-ocean-light shadow-sm"
              >
                <Handshake size={15} className="text-cyan-400" />
                <span>{currentCategory.partnerCta}</span>
              </button>
            </div>
          </div>

          {/* Offerings Grid */}
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h4 className="font-display text-lg sm:text-xl font-bold text-ink">
                Featured Capabilities in {currentCategory.name}
              </h4>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate(cardThemeMap[currentCategory.id]?.path)}
                className="font-mono text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View All {currentCategory.name} Options</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentCategory.offerings.map(offering => (
                <article
                  key={offering.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-[2.2rem] bg-white border border-slate-200/80 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                >
                  <div>
                    <div className="relative h-52 sm:h-56 overflow-hidden">
                      <img
                        src={offering.image}
                        alt={offering.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex gap-1.5 sm:gap-2">
                        <span className="rounded-full bg-white/95 px-2.5 sm:px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-800 backdrop-blur-md shadow-sm">
                          {offering.tag}
                        </span>
                        {offering.badge && (
                          <span className="rounded-full bg-cyan-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ocean shadow-sm">
                            {offering.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-xs font-semibold text-white drop-shadow">
                        {offering.tagline}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h5 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink">
                          {offering.name}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setInspectOffering(offering)}
                          className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 transition duration-200 group-hover:bg-blue-600 group-hover:text-white shadow-sm"
                          title="Inspect Details"
                        >
                          <ArrowUpRight size={15} />
                        </button>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:min-h-[44px]">
                        {offering.description}
                      </p>

                      <div className="mt-4 sm:mt-5 space-y-1.5 border-t border-slate-100 pt-3 sm:pt-4 text-xs">
                        {offering.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-slate-700">
                            <Check size={13} className="text-blue-600 shrink-0 font-bold" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4 bg-slate-50/80">
                    <div className="flex items-baseline gap-1">
                      {offering.price && (
                        <>
                          <span className="font-display text-base sm:text-lg font-extrabold text-blue-600">
                            {offering.price}
                          </span>
                          {offering.unit && (
                            <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                              {offering.unit}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectOffering(offering)}
                      className="text-xs font-bold text-blue-600 transition hover:text-blue-800 underline underline-offset-2"
                    >
                      View Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Offering Inspection */}
        {inspectOffering && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ocean/85 p-3 sm:p-4 backdrop-blur-sm"
            onClick={e => {
              if (e.target === e.currentTarget) setInspectOffering(null)
            }}
          >
            <div className="relative my-4 sm:my-8 w-full max-w-xl overflow-y-auto max-h-[90vh] rounded-3xl sm:rounded-[2.5rem] bg-white p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setInspectOffering(null)}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 shadow-sm"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold uppercase text-blue-700 border border-blue-200">
                  {inspectOffering.tag}
                </span>
                {inspectOffering.badge && (
                  <span className="rounded-full bg-cyan-400 px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase text-ocean">
                    {inspectOffering.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl font-extrabold text-ink">
                {inspectOffering.name}
              </h3>
              <p className="text-xs text-blue-600 font-medium mt-0.5">
                {inspectOffering.tagline}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {inspectOffering.description}
              </p>

              {inspectOffering.details && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block">Detailed Specifications:</span>
                  {inspectOffering.details.map(d => (
                    <div key={d} className="flex items-start gap-2 text-slate-600">
                      <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-xs text-slate-500">Pricing / Terms:</span>
                <span className="font-display text-2xl font-extrabold text-blue-600">
                  {inspectOffering.price}
                </span>
                {inspectOffering.unit && (
                  <span className="text-xs text-slate-500">{inspectOffering.unit}</span>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setInspectOffering(null)}
                  className="flex-1 rounded-full bg-slate-100 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInspectOffering(null)
                    if (onNavigate) {
                      onNavigate(cardThemeMap[currentCategory.id]?.path)
                    }
                  }}
                  className="flex-1 rounded-full bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-700 transition"
                >
                  View {currentCategory.name} Rates & Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
