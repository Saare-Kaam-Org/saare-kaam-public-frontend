import { useState, useEffect } from 'react'
import {
  X,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shirt,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldCheck,
  Loader2,
} from 'lucide-react'
import { PartnerRole } from '../types'
import { useCreateApplication } from '../hooks/useCreateApplication'
import { useServices } from '../../services/hooks/useServices'
import { Logo } from '../../../components/ui/Logo'

type Props = {
  open: boolean
  onClose: () => void
  initialRole?: PartnerRole | null
  onSuccess?: () => void
}

const roleConfigs: Record<
  string,
  {
    title: string
    subtitle: string
    forLabel: string
    serviceSlug: string
    icon: typeof Shirt
    color: string
    badge: string
    guaranteeText: string
  }
> = {
  laundry_vendor: {
    title: 'Laundry Vendor',
    subtitle: 'For laundromats, dry cleaners & steam pressing workshops',
    forLabel: 'for Laundry & Garment Care',
    serviceSlug: 'laundry',
    icon: Shirt,
    color: 'from-blue-600 to-cyan-600',
    badge: 'Daily Batch Volume',
    guaranteeText:
      'Fill your idle washing drums and steam tables with predictable daily doorstep orders. We handle 100% of valet pickups/deliveries and settle payouts automatically on weekly cycles.',
  },
  house_help: {
    title: 'House Help / Helper',
    subtitle: 'For verified home cleaners, cooks, housekeepers & domestic agencies',
    forLabel: 'for House Help Service',
    serviceSlug: 'house-help',
    icon: Sparkles,
    color: 'from-emerald-600 to-teal-600',
    badge: 'Verified Households',
    guaranteeText:
      'Dignified household work in verified apartments and homes. Guaranteed on-time hourly / monthly earnings, safe working environments, and zero third-party agency cuts.',
  },
}

const laundryEquipmentOptions = [
  'Commercial Washers',
  'Vacuum Steam Tables',
  'Hydrocarbon Dry Clean',
  'Industrial Steam Boilers',
  'Hydro Extractors',
  'Shoe Spa Unit',
]

const houseHelpServiceOptions = [
  'Daily Housekeeping',
  'Floor & Dusting Care',
  'Home Cooking (Veg / Non-Veg)',
  'Utensils Cleaning',
  'Deep Bathroom Sanitization',
  'Elderly / Baby Care Assist',
]

const houseHelpLanguageOptions = ['Hindi', 'English', 'Odia', 'Bengali', 'Marathi', 'Regional']

export function PartnerApplyModal({ open, onClose, initialRole = null, onSuccess }: Props) {
  const [selectedRole, setSelectedRole] = useState<PartnerRole | null>(initialRole)

  // Live dynamic local services hook from PostgreSQL
  const { services } = useServices()

  // Custom hook usage (NO direct API calls, NO localStorage)
  const { submit, reset, isLoading, error, data } = useCreateApplication()

  // Common Form Fields
  const [ownerName, setOwnerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [pincode, setPincode] = useState('')
  const [experienceYears, setExperienceYears] = useState('3-5 years')
  const [notes, setNotes] = useState('')

  // Role specific: Laundry
  const [businessName, setBusinessName] = useState('')
  const [dailyCapacity, setDailyCapacity] = useState('100 - 250 kg/day')
  const [equipment, setEquipment] = useState<string[]>(['Commercial Washers', 'Vacuum Steam Tables'])

  // Role specific: House Help
  const [houseHelpServices, setHouseHelpServices] = useState<string[]>([
    'Daily Housekeeping',
    'Home Cooking (Veg / Non-Veg)',
  ])
  const [verificationReady, setVerificationReady] = useState(true)
  const [languages, setLanguages] = useState<string[]>(['Hindi', 'English'])

  useEffect(() => {
    if (initialRole) {
      if ((initialRole as string) === 'maid') {
        setSelectedRole('house_help')
      } else {
        setSelectedRole(initialRole)
      }
    }
  }, [initialRole])

  if (!open) return null

  const toggleArrayItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleReset = () => {
    reset()
    setSelectedRole(null)
  }

  const handleModalClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    const isHouseHelp = selectedRole === 'house_help' || (selectedRole as string) === 'maid'

    const payload = {
      role: selectedRole,
      ownerName,
      phone,
      email: email || undefined,
      city,
      area,
      pincode,
      experienceYears,
      notes: notes || undefined,
      businessName: selectedRole === 'laundry_vendor' ? businessName : undefined,
      dailyCapacity: selectedRole === 'laundry_vendor' ? dailyCapacity : undefined,
      equipment: selectedRole === 'laundry_vendor' ? equipment : undefined,
      houseHelpServices: isHouseHelp ? houseHelpServices : undefined,
      verificationReady: isHouseHelp ? verificationReady : undefined,
      languages: isHouseHelp ? languages : undefined,
    }

    const res = await submit(payload)
    if (res && onSuccess) {
      onSuccess()
    }
  }

  const activeRoleConfig = selectedRole ? roleConfigs[selectedRole] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-ocean/85 p-3 sm:p-4 backdrop-blur-md"
      onClick={e => {
        if (e.target === e.currentTarget) handleModalClose()
      }}
    >
      <div className="relative my-4 sm:my-8 w-full max-w-2xl overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={handleModalClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-ocean hover:text-white shadow-sm"
        >
          <X size={18} />
        </button>

        {/* 1. SUCCESS CONFIRMATION STATE */}
        {data ? (
          <div className="p-8 md:p-14 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyan-400 text-ocean shadow-glow">
              <CheckCircle2 size={44} />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
                APPLICATION #{data.applicationNo}
              </span>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                SAVED IN DATABASE
              </span>
            </div>

            <h3 className="mt-3 font-display text-3xl font-extrabold text-ink md:text-4xl">
              Partnership Application Submitted!
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 leading-relaxed">
              Thank you, <strong>{data.ownerName}</strong>! Your application has been received. Our city operations team will review your profile and contact you within 24 hours via WhatsApp or call.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Partner Role:</span>
                <span className="font-semibold text-slate-800">
                  {selectedRole ? roleConfigs[selectedRole].title : data.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">
                  {data.area}, {data.city} ({data.pincode})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp Phone:</span>
                <span className="font-semibold text-slate-800">{data.phone}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-500">
                <span>Application Status:</span>
                <span className="font-semibold text-emerald-600">Pending Review</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p>Partner Helpdesk: <strong className="text-slate-700">business@saarekaam.com</strong></p>
                <p>Support: <strong className="text-slate-700">support@saarekaam.com</strong></p>
                <p>Regional Office: Chandrasekharpur, Bhubaneswar, Odisha, 751017</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleModalClose}
              className="mt-8 w-full rounded-full bg-ocean py-4 text-xs font-bold text-white transition hover:bg-ocean-light"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : !selectedRole ? (
          /* 2. ROLE SELECTION SCREEN */
          <div className="p-5 sm:p-7 md:p-10 max-h-[88vh] overflow-y-auto">
            <div className="pr-10">
              <div className="flex items-center gap-3 mb-2">
                <Logo size="sm" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Saare Kaam Local Partner Network
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                Apply for Local Partnership
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect your local workshop or domestic service expertise to Saare Kaam.
                <strong> Choose your partner role below to get started:</strong>
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(Object.keys(roleConfigs) as PartnerRole[]).map(roleKey => {
                const conf = roleConfigs[roleKey]
                const Icon = conf.icon
                const matchedService = services.find(s => s.slug === conf.serviceSlug)
                const isActive = (matchedService?.status || 'ACTIVE').toUpperCase() === 'ACTIVE'

                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => setSelectedRole(roleKey)}
                    className="group relative flex flex-col justify-between rounded-2xl border-2 p-6 text-left transition-all duration-200 bg-white border-slate-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-card-hover"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${conf.color} text-white shadow-sm transition group-hover:scale-110`}
                        >
                          <Icon size={22} />
                        </div>

                        {isActive ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-blue-600 transition">
                        {conf.title}
                      </h3>
                      <p className="font-mono text-[11px] font-semibold text-blue-600 mt-0.5">
                        {conf.forLabel}
                      </p>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        {conf.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-blue-600">
                      <span>Apply as {conf.title.split('/')[0]}</span>
                      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-center text-xs text-slate-600">
              <span className="serif-italic text-slate-800 text-sm font-semibold">
                "Aapke Saare Kaam, humare saath aasaan."
              </span>
            </div>
          </div>
        ) : (
          /* 3. PARTNER ONBOARDING FORM */
          <div className="p-5 sm:p-7 md:p-10 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 pr-12">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
              >
                <ArrowLeft size={14} />
                <span>Change Role</span>
              </button>

              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Role: {activeRoleConfig?.title}
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                Partner Application: {activeRoleConfig?.title}
              </h2>
              <p className="mt-1 font-mono text-xs text-blue-600 font-semibold">
                {activeRoleConfig?.forLabel}
              </p>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {activeRoleConfig?.guaranteeText}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-900 text-xs">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Local Service Onboarding Open.</strong> All applications are verified and added to the city network.
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-200 text-xs text-red-700 font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Common Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Applicant / Owner Full Name *
                  <input
                    required
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="e.g. Ramesh Mohanty"
                  />
                </label>

                <label className="field-label">
                  WhatsApp Phone Number *
                  <div className="relative">
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                    <Phone size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Email Address (Optional)
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                    />
                    <Mail size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>

                <label className="field-label">
                  Experience in this trade
                  <select value={experienceYears} onChange={e => setExperienceYears(e.target.value)}>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </label>
              </div>

              {/* Location Fields */}
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="field-label">
                  City *
                  <input
                    required
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Bhubaneswar"
                  />
                </label>

                <label className="field-label">
                  Locality / Area *
                  <input
                    required
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder="e.g. Patia / Saheed Nagar"
                  />
                </label>

                <label className="field-label">
                  Pincode *
                  <div className="relative">
                    <input
                      required
                      maxLength={6}
                      type="text"
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="751024"
                    />
                    <MapPin size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>
              </div>

              {/* ROLE SPECIFIC 1: LAUNDRY VENDOR */}
              {selectedRole === 'laundry_vendor' && (
                <div className="space-y-4 rounded-2xl bg-blue-50/50 p-4 border border-blue-100">
                  <div className="flex items-center gap-2 font-display text-xs font-bold text-blue-800">
                    <Shirt size={16} />
                    <span>Laundromat / Workshop Details</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="field-label">
                      Laundromat / Shop Name
                      <input
                        type="text"
                        value={businessName}
                        onChange={e => setBusinessName(e.target.value)}
                        placeholder="e.g. CleanCare Dry Cleaners"
                      />
                    </label>

                    <label className="field-label">
                      Estimated Daily Washing Capacity
                      <select value={dailyCapacity} onChange={e => setDailyCapacity(e.target.value)}>
                        <option value="50 - 100 kg/day">50 - 100 kg / day</option>
                        <option value="100 - 250 kg/day">100 - 250 kg / day</option>
                        <option value="250 - 500 kg/day">250 - 500 kg / day</option>
                        <option value="500+ kg/day">500+ kg / day (Industrial Unit)</option>
                      </select>
                    </label>
                  </div>

                  <div>
                    <span className="field-label mb-2">Available Equipment</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {laundryEquipmentOptions.map(item => {
                        const active = equipment.includes(item)
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => toggleArrayItem(equipment, setEquipment, item)}
                            className={`flex items-center gap-2 rounded-xl border p-2 text-left transition text-xs ${
                              active
                                ? 'border-blue-600 bg-blue-100/70 font-bold text-blue-800'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className={`grid h-4 w-4 place-items-center rounded text-[10px] ${
                                active ? 'bg-blue-600 text-white' : 'border border-slate-300'
                              }`}
                            >
                              {active && <Check size={10} />}
                            </span>
                            <span className="truncate">{item}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ROLE SPECIFIC 2: HOUSE HELP */}
              {(selectedRole === 'house_help' || (selectedRole as string) === 'maid') && (
                <div className="space-y-4 rounded-2xl bg-teal-50/50 p-4 border border-teal-100">
                  <div className="flex items-center gap-2 font-display text-xs font-bold text-teal-800">
                    <Sparkles size={16} />
                    <span>Domestic Skills & Background Details</span>
                  </div>

                  <div>
                    <span className="field-label mb-2">Services You Can Provide</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {houseHelpServiceOptions.map(service => {
                        const active = houseHelpServices.includes(service)
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleArrayItem(houseHelpServices, setHouseHelpServices, service)}
                            className={`flex items-center gap-2 rounded-xl border p-2 text-left transition text-xs ${
                              active
                                ? 'border-teal-600 bg-teal-100/70 font-bold text-teal-900'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className={`grid h-4 w-4 place-items-center rounded text-[10px] ${
                                active ? 'bg-teal-600 text-white' : 'border border-slate-300'
                              }`}
                            >
                              {active && <Check size={10} />}
                            </span>
                            <span className="truncate">{service}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="field-label mb-2">Languages Spoken</span>
                    <div className="flex flex-wrap gap-2">
                      {houseHelpLanguageOptions.map(lang => {
                        const active = languages.includes(lang)
                        return (
                          <button
                            type="button"
                            key={lang}
                            onClick={() => toggleArrayItem(languages, setLanguages, lang)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                              active
                                ? 'bg-teal-700 text-white border-teal-700'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {lang}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verificationReady}
                      onChange={e => setVerificationReady(e.target.checked)}
                      className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Aadhaar card & police verification documents available upon request
                    </span>
                  </label>
                </div>
              )}

              {/* Notes */}
              <label className="field-label">
                Additional Notes / Workshop Details
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Tell us about your team, years of service, and service area..."
                />
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ocean py-4 text-xs font-bold text-white transition hover:bg-ocean-light disabled:opacity-50 shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Partner Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Partner Application</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Official Saare Kaam Partner Onboarding • 100% Verified Network</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
