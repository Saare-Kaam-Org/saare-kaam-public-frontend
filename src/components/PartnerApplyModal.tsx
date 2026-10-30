import { useState } from 'react'
import { X, CheckCircle2, Building2, Phone, Mail, MapPin, Award, ArrowRight } from 'lucide-react'
import type { PartnerApplication } from '../types'
import { initialPartnerApplications } from '../data/content'
import { Logo } from './ui/Logo'

type Props = {
  open: boolean
  onClose: () => void
  onApplicationSubmitted?: (newApp: PartnerApplication) => void
}

const equipmentOptions = [
  'Commercial Washers',
  'Vacuum Steam Tables',
  'Hydrocarbon Dry Cleaning',
  'Industrial Steam Boilers',
  'Hydro Extractors',
  'Shoe Care & Spa Unit',
]

export function PartnerApplyModal({ open, onClose, onApplicationSubmitted }: Props) {
  const [form, setForm] = useState({
    ownerName: '',
    phone: '',
    email: '',
    businessName: '',
    city: '',
    area: '',
    pincode: '',
    dailyCapacity: '100 - 250 kg/day',
    experienceYears: '5+ years',
    equipment: ['Commercial Washers', 'Vacuum Steam Tables'],
    notes: '',
  })

  const [submittedApp, setSubmittedApp] = useState<PartnerApplication | null>(null)

  if (!open) return null

  const toggleEquipment = (item: string) => {
    setForm(prev => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter(e => e !== item)
        : [...prev.equipment, item],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newApp: PartnerApplication = {
      id: 'SK-APP-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      ownerName: form.ownerName,
      phone: form.phone,
      email: form.email || undefined,
      businessName: form.businessName,
      city: form.city,
      area: form.area,
      pincode: form.pincode,
      dailyCapacity: form.dailyCapacity,
      equipment: form.equipment,
      experienceYears: form.experienceYears,
      notes: form.notes || undefined,
      status: 'Pending',
    }

    // Save to localStorage
    try {
      const existing = localStorage.getItem('saarekaam_partner_applications')
      const list: PartnerApplication[] = existing ? JSON.parse(existing) : [...initialPartnerApplications]
      const updated = [newApp, ...list]
      localStorage.setItem('saarekaam_partner_applications', JSON.stringify(updated))
    } catch {
      // fallback
    }

    setSubmittedApp(newApp)
    if (onApplicationSubmitted) {
      onApplicationSubmitted(newApp)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ocean/80 p-4 backdrop-blur-sm"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-ocean hover:text-white"
        >
          <X size={18} />
        </button>

        {submittedApp ? (
          <div className="p-8 md:p-14 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyan-400 text-ocean shadow-glow">
              <CheckCircle2 size={44} />
            </div>

            <span className="mt-5 inline-block font-mono text-xs font-bold text-blue-700 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
              APPLICATION #{submittedApp.id}
            </span>

            <h3 className="mt-3 font-display text-3xl font-extrabold text-ink md:text-4xl">
              Partnership Application Submitted!
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 leading-relaxed">
              Thank you, <strong>{submittedApp.ownerName}</strong>! Your workshop details for{' '}
              <strong className="text-blue-600">{submittedApp.businessName}</strong> have been registered successfully in our network.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Workshop Location:</span>
                <span className="font-semibold text-slate-800">{submittedApp.area}, {submittedApp.city} ({submittedApp.pincode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Phone:</span>
                <span className="font-semibold text-slate-800">{submittedApp.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Processing Capacity:</span>
                <span className="font-semibold text-blue-600">{submittedApp.dailyCapacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Saved To System:</span>
                <span className="font-semibold text-blue-600">Stored in LocalStorage (Viewable at /all-applications)</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full bg-ocean py-4 text-xs font-bold text-white transition hover:bg-ocean-light"
              >
                Done & Return to Homepage
              </button>
              <a
                href="/all-applications"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 py-4 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
              >
                <span>View In /all-applications</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div className="p-7 md:p-10 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Logo size="sm" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Partner Network
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                Apply for Partnership
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Fill your idle washing machines and steam tables with predictable daily laundry orders. We handle 100% of doorstep pickups and customer payments.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Your Full Name *
                  <input
                    required
                    type="text"
                    value={form.ownerName}
                    onChange={e => setForm(p => ({ ...p, ownerName: e.target.value }))}
                    placeholder="e.g. Ramesh Patel"
                  />
                </label>

                <label className="field-label">
                  Phone Number (WhatsApp Active) *
                  <div className="relative">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                    <Phone size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label sm:col-span-2">
                  Laundry Workshop / Business Name *
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={form.businessName}
                      onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))}
                      placeholder="e.g. Star Steam Press & Laundry Works"
                    />
                    <Building2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>

                <label className="field-label">
                  City *
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                    placeholder="e.g. Delhi / Mumbai / Bengaluru"
                  />
                </label>

                <label className="field-label">
                  Area / Locality / Street *
                  <input
                    required
                    type="text"
                    value={form.area}
                    onChange={e => setForm(p => ({ ...p, area: e.target.value }))}
                    placeholder="e.g. Malviya Nagar / Andheri West"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Pincode *
                  <div className="relative">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      value={form.pincode}
                      onChange={e => setForm(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') }))}
                      placeholder="110017"
                    />
                    <MapPin size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>

                <label className="field-label">
                  Email Address (Optional)
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="workshop@gmail.com"
                    />
                    <Mail size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Daily Processing Capacity
                  <select
                    value={form.dailyCapacity}
                    onChange={e => setForm(p => ({ ...p, dailyCapacity: e.target.value }))}
                  >
                    <option value="50 - 100 kg/day">50 - 100 kg/day (Small Shop)</option>
                    <option value="100 - 250 kg/day">100 - 250 kg/day (Medium Facility)</option>
                    <option value="250 - 500 kg/day">250 - 500 kg/day (Large Commercial)</option>
                    <option value="500+ kg/day">500+ kg/day (Industrial Plant)</option>
                  </select>
                </label>

                <label className="field-label">
                  Years of Business Experience
                  <select
                    value={form.experienceYears}
                    onChange={e => setForm(p => ({ ...p, experienceYears: e.target.value }))}
                  >
                    <option value="1-3 years">1 - 3 years</option>
                    <option value="3-5 years">3 - 5 years</option>
                    <option value="5+ years">5+ years</option>
                    <option value="10+ years">10+ years established</option>
                  </select>
                </label>
              </div>

              {/* Equipment Checkboxes */}
              <div>
                <span className="field-label mb-2">Available Workshop Equipment</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {equipmentOptions.map(item => {
                    const active = form.equipment.includes(item)
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleEquipment(item)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                          active
                            ? 'border-blue-600 bg-blue-50 font-bold text-blue-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className={`grid h-4 w-4 place-items-center rounded text-[10px] ${
                          active ? 'bg-blue-600 text-white' : 'border border-slate-300'
                        }`}>
                          {active && '✓'}
                        </span>
                        <span className="text-[11px] truncate">{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <label className="field-label">
                Additional Details / Note
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="e.g. We have 3 steam tables, 2 commercial front-load washers, and 3 staff members."
                />
              </label>

              {/* Partner perk callout */}
              <div className="rounded-2xl bg-blue-50/70 p-4 text-xs text-slate-700 flex items-start gap-3 border border-blue-200/80">
                <Award size={20} className="shrink-0 text-blue-600 mt-0.5" />
                <div>
                  <strong className="text-blue-700">Saare Kaam Partner Guarantee:</strong> We collect and deliver 100% of customer orders. You receive weekly automated NEFT/UPI payouts with transparent digital statements.
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-4 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.99] shadow-md"
              >
                <span>Submit Partnership Application</span>
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
