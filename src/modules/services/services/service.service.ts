import { clientApi } from '../../../api/clientApi'
import { ENDPOINTS } from '../../../api/endpoint'
import { ServiceEntity, ServiceStatusSummary } from '../types'

// Fallback local services
const defaultFallbackLocalServices: ServiceEntity[] = [
  {
    id: 'laundry',
    slug: 'laundry',
    name: 'Laundry & Garment Care',
    hindiSubtitle: 'Har Kapda Chamkega, Aapka Waqt Bachega.',
    shortDesc: '100% individual sanitised drum wash, premium steam pressing & 24-48H doorstep valet delivery.',
    fullDescription: 'Doorstep laundry, dry cleaning, sanitised wash & fold, and premium steam pressing designed for families, students, and businesses.',
    category: 'LAUNDRY',
    status: 'ACTIVE',
    path: '/laundry',
    partnerRole: 'LAUNDRY_VENDOR',
    badgeLabel: 'Live • 24-48H Return',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    iconName: 'Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    gradientClass: 'bg-gradient-to-br from-[#0b172c] via-[#0e2748] to-[#0284c7]',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    glowClass: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]',
    sortOrder: 1,
    isFeatured: true,
  },
  {
    id: 'house-help',
    slug: 'house-help',
    name: 'House Help Service',
    hindiSubtitle: 'All Cleaning, Cooking & Domestic Help at Transparent Hourly Rates.',
    shortDesc: 'Trained, police-verified domestic helpers for all cleaning, home cooking, and floor care with hourly booking.',
    fullDescription: 'Verified, trustworthy domestic assistance network. Daily sweeping, mopping, utensil washing, and healthy home-cooked meals charged at transparent hourly rates.',
    category: 'HOUSE_HELP',
    status: 'ACTIVE',
    path: '/house-help',
    partnerRole: 'HOUSE_HELP',
    badgeLabel: 'Live • Hourly Help',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    gradientClass: 'bg-gradient-to-br from-[#071c1b] via-[#0f3d36] to-[#059669]',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    glowClass: 'hover:shadow-[0_0_35px_rgba(45,212,191,0.3)]',
    sortOrder: 2,
    isFeatured: true,
  },
]

export class ServiceService {
  /**
   * Business Logic: Get local doorstep services (domain: LOCAL)
   */
  async getAllServices(): Promise<ServiceEntity[]> {
    try {
      const res = await clientApi.get<{ success: boolean; data: ServiceEntity[] }>(
        ENDPOINTS.SERVICES.LOCAL
      )
      if (res && res.data && res.data.length > 0) {
        return res.data
      }
      return defaultFallbackLocalServices
    } catch {
      return defaultFallbackLocalServices
    }
  }

  /**
   * Business Logic: Get active local services only
   */
  async getActiveServices(): Promise<ServiceEntity[]> {
    try {
      const all = await this.getAllServices()
      return all.filter(s => s.status === 'ACTIVE')
    } catch {
      return defaultFallbackLocalServices.filter(s => s.status === 'ACTIVE')
    }
  }

  /**
   * Business Logic: Get status summary & active partner roles
   */
  async getStatusSummary(): Promise<ServiceStatusSummary> {
    try {
      const res = await clientApi.get<{ success: boolean; data: ServiceStatusSummary }>(
        ENDPOINTS.SERVICES.SUMMARY
      )
      if (res && res.data) {
        return res.data
      }
      return {
        total: 2,
        activeCount: 2,
        upcomingCount: 0,
        activeRoles: ['LAUNDRY_VENDOR', 'HOUSE_HELP'],
      }
    } catch {
      return {
        total: 2,
        activeCount: 2,
        upcomingCount: 0,
        activeRoles: ['LAUNDRY_VENDOR', 'HOUSE_HELP'],
      }
    }
  }

  /**
   * Business Logic: Get service details with plans & pricing by slug
   */
  async getServiceBySlug(slug: string): Promise<ServiceEntity | null> {
    try {
      const res = await clientApi.get<{ success: boolean; data: ServiceEntity }>(
        ENDPOINTS.SERVICES.BY_SLUG(slug)
      )
      return res?.data || null
    } catch {
      return defaultFallbackLocalServices.find(s => s.slug === slug || s.path.includes(slug)) || null
    }
  }
}

export const serviceService = new ServiceService()
