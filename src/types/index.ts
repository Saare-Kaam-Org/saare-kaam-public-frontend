export type PartnerRole =
  | 'laundry_vendor'
  | 'house_help'
  | 'maid'

export type PartnerApplication = {
  id: string
  date: string
  role: PartnerRole
  ownerName: string
  phone: string
  email?: string
  city: string
  area: string
  pincode: string
  experienceYears: string
  notes?: string
  status?: 'Pending' | 'Verified' | 'Contacted'

  // Laundry Vendor specific
  businessName?: string
  dailyCapacity?: string
  equipment?: string[]

  // House Help specific
  houseHelpServiceTypes?: string[]
  maidServiceTypes?: string[]
  verificationReady?: boolean
  languages?: string[]
}

export type ServiceOffering = {
  id: string
  name: string
  tagline: string
  description: string
  price?: string
  unit?: string
  tag: string
  badge?: string
  image: string
  features: string[]
  details?: string[]
}

export type ServiceCategory = {
  id: 'laundry' | 'house_help' | 'maid'
  name: string
  hindiSubtitle: string
  shortDesc: string
  longDesc: string
  status: 'active' | 'upcoming'
  iconName: string
  heroBadge: string
  actionLabel: string
  partnerRole: PartnerRole
  partnerCta: string
  highlights: string[]
  offerings: ServiceOffering[]
}

export type PricingItem = {
  category: string
  items: { name: string; price: string; note?: string }[]
}

export type SubscriptionPlan = {
  id: string
  name: string
  serviceCategory: 'laundry' | 'house_help' | 'maid'
  price: string
  period: string
  popular?: boolean
  badge?: string
  description: string
  features: string[]
  cta: string
}
