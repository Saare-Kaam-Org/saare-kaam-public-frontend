import { useState, useEffect } from 'react'
import { Download, ArrowLeft, Search, Trash2, Building2, Phone, MapPin, RefreshCw } from 'lucide-react'
import type { PartnerApplication } from '../types'
import { initialPartnerApplications } from '../data/content'
import { Logo } from './ui/Logo'

type Props = {
  onBackToHome: () => void
}

export function AdminApplicationsPage({ onBackToHome }: Props) {
  const [applications, setApplications] = useState<PartnerApplication[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null)

  // Load applications from localStorage
  const loadApps = () => {
    try {
      const stored = localStorage.getItem('saarekaam_partner_applications')
      if (stored) {
        setApplications(JSON.parse(stored))
      } else {
        // Seed with initial applications if empty
        localStorage.setItem('saarekaam_partner_applications', JSON.stringify(initialPartnerApplications))
        setApplications(initialPartnerApplications)
      }
    } catch {
      setApplications(initialPartnerApplications)
    }
  }

  useEffect(() => {
    loadApps()
  }, [])

  // Delete an application
  const handleDelete = (id: string) => {
    if (window.confirm(`Delete application ${id}?`)) {
      const updated = applications.filter(a => a.id !== id)
      setApplications(updated)
      localStorage.setItem('saarekaam_partner_applications', JSON.stringify(updated))
      if (selectedApp?.id === id) {
        setSelectedApp(null)
      }
    }
  }

  // Clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all partner applications?')) {
      setApplications([])
      localStorage.removeItem('saarekaam_partner_applications')
      setSelectedApp(null)
    }
  }

  // Restore demo applications
  const handleResetDemo = () => {
    localStorage.setItem('saarekaam_partner_applications', JSON.stringify(initialPartnerApplications))
    setApplications(initialPartnerApplications)
  }

  // One-click CSV download function
  const handleDownloadCSV = () => {
    if (applications.length === 0) {
      alert('No applications to export.')
      return
    }

    const headers = [
      'Application ID',
      'Date Submitted',
      'Owner Name',
      'Phone Number',
      'Email',
      'Business Name',
      'City',
      'Area',
      'Pincode',
      'Daily Processing Capacity',
      'Available Equipment',
      'Experience Years',
      'Status',
      'Notes',
    ]

    const rows = applications.map(app => [
      `"${app.id}"`,
      `"${app.date}"`,
      `"${(app.ownerName || '').replace(/"/g, '""')}"`,
      `"${app.phone}"`,
      `"${app.email || ''}"`,
      `"${(app.businessName || '').replace(/"/g, '""')}"`,
      `"${(app.city || '').replace(/"/g, '""')}"`,
      `"${(app.area || '').replace(/"/g, '""')}"`,
      `"${app.pincode}"`,
      `"${app.dailyCapacity}"`,
      `"${(app.equipment || []).join('; ')}"`,
      `"${app.experienceYears}"`,
      `"${app.status || 'Pending'}"`,
      `"${(app.notes || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n')

    // Create a Blob and trigger auto-download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `SaareKaam_Partner_Applications_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Filtered applications
  const filtered = applications.filter(app => {
    const q = searchTerm.toLowerCase()
    return (
      app.ownerName.toLowerCase().includes(q) ||
      app.businessName.toLowerCase().includes(q) ||
      app.phone.includes(q) ||
      app.city.toLowerCase().includes(q) ||
      app.area.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-paper text-ink pb-20">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-ocean hover:text-white shadow-sm"
            >
              <ArrowLeft size={15} />
              <span>Back to Landing Page</span>
            </button>
            <div className="hidden sm:block">
              <Logo size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
              <Building2 size={13} />
              <span>{applications.length} Total Applications</span>
            </span>

            {/* Direct CSV Download Button */}
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-md active:scale-95"
            >
              <Download size={15} className="text-cyan-300" />
              <span>Download in CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        {/* Title & Stats */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow"><span /> Internal Route: /all-applications</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              Laundry Partner Applications
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              All partner registrations submitted via the "Apply for Partnership" form. Stored locally in your browser and ready for 1-click CSV export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={13} /> Reload Demo Data
            </button>
            {applications.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                <Trash2 size={13} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by owner name, phone, workshop, city, area, or ID..."
              className="w-full rounded-xl bg-transparent px-4 py-2 pl-10 text-sm font-medium text-ink outline-none"
            />
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <span className="text-xs font-semibold text-slate-400 pr-3 hidden sm:inline">
            Showing {filtered.length} of {applications.length}
          </span>
        </div>

        {/* Tabular View */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ocean text-white uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-4 px-5">ID & Date</th>
                  <th className="py-4 px-5">Owner / Contact</th>
                  <th className="py-4 px-5">Workshop / Facility</th>
                  <th className="py-4 px-5">Location</th>
                  <th className="py-4 px-5">Capacity</th>
                  <th className="py-4 px-5">Equipment</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-14 text-center text-sm text-slate-500">
                      No applications found. Submit a new application via the landing page or click "Reload Demo Data".
                    </td>
                  </tr>
                ) : (
                  filtered.map(app => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="cursor-pointer transition hover:bg-blue-50/50"
                    >
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {app.id}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-1">{app.date}</div>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-bold text-ink text-sm">{app.ownerName}</div>
                        <a
                          href={`tel:${app.phone}`}
                          onClick={e => e.stopPropagation()}
                          className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Phone size={11} /> {app.phone}
                        </a>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-semibold text-ink">{app.businessName}</div>
                        <div className="text-[11px] text-slate-500">{app.experienceYears} exp</div>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-medium text-ink flex items-center gap-1">
                          <MapPin size={12} className="text-blue-600 shrink-0" />
                          <span>{app.area}, {app.city}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 pl-4">PIN: {app.pincode}</div>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700 text-[11px] border border-blue-200">
                          {app.dailyCapacity}
                        </span>
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(app.equipment || []).map(eq => (
                            <span key={eq} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 font-medium border border-slate-200">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          app.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {app.status || 'Pending'}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleDelete(app.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 ml-auto"
                          title="Delete application"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Details Drawer Modal */}
        {selectedApp && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ocean/75 p-4 backdrop-blur-sm"
            onClick={e => {
              if (e.target === e.currentTarget) setSelectedApp(null)
            }}
          >
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-ocean hover:text-white"
              >
                ✕
              </button>

              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {selectedApp.id}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">{selectedApp.businessName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Submitted on {selectedApp.date}</p>

              <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs border border-slate-200">
                <div className="flex justify-between"><span className="text-slate-500">Owner Name:</span><span className="font-bold text-ink">{selectedApp.ownerName}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-bold text-blue-600">{selectedApp.phone}</span></div>
                {selectedApp.email && <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium text-ink">{selectedApp.email}</span></div>}
                <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="font-medium text-ink">{selectedApp.area}, {selectedApp.city} ({selectedApp.pincode})</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Capacity:</span><span className="font-bold text-blue-600">{selectedApp.dailyCapacity}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Experience:</span><span className="font-medium text-ink">{selectedApp.experienceYears}</span></div>
              </div>

              {selectedApp.notes && (
                <div className="mt-4 rounded-xl bg-white p-3 text-xs border border-slate-200">
                  <p className="font-bold text-slate-500 text-[10px] uppercase">Applicant Note:</p>
                  <p className="mt-1 text-slate-700">{selectedApp.notes}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm"
                >
                  <Phone size={14} /> Call Partner
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="flex-1 rounded-full border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
