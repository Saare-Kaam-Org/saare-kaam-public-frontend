export type PlanServiceCategory = 'laundry' | 'house_help' | 'maid'

export type SubscriptionPlanItem = {
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

export type PricingCategoryItem = {
  category: string
  items: Array<{
    name: string
    price: string
    note?: string
  }>
}

