export type ServiceStatus = 'ACTIVE' | 'UPCOMING' | 'DEPRECATED' | 'INACTIVE'

export type ServiceId = 'laundry' | 'software' | 'erp' | 'marketing' | 'house_help' | 'maid'

export type ServiceEntity = {
  id: string
  slug: string
  name: string
  hindiSubtitle: string
  shortDesc: string
  fullDescription?: string | null
  category: string
  status: ServiceStatus
  path: string
  partnerRole?: string | null
  badgeLabel?: string | null
  badgeColor?: string | null
  iconName: string
  imageUrl: string
  gradientClass?: string | null
  borderColor?: string | null
  glowClass?: string | null
  sortOrder: number
  isFeatured?: boolean
  plans?: any[]
  pricingItems?: any[]
}

export type ServiceStatusSummary = {
  total: number
  activeCount: number
  upcomingCount: number
  activeRoles: string[]
}

export type ServicePageProps = {
  onNavigate: (path: string) => void
  onOpenPartnerApply: (role?: any) => void
}
