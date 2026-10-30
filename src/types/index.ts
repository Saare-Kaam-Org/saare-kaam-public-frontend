export type PartnerApplication = {
  id: string
  date: string
  ownerName: string
  phone: string
  email?: string
  businessName: string
  city: string
  area: string
  pincode: string
  dailyCapacity: string
  equipment: string[]
  experienceYears: string
  notes?: string
  status?: 'Pending' | 'Verified' | 'Contacted'
}

export type Service = {
  id: string
  name: string
  tagline: string
  description: string
  price: string
  unit: string
  tag: string
  image: string
  badge?: string
  features: string[]
}

export type PricingItem = {
  category: string
  items: { name: string; price: string; note?: string }[]
}

export type SubscriptionPlan = {
  id: string
  name: string
  price: string
  period: string
  popular?: boolean
  description: string
  features: string[]
  cta: string
}