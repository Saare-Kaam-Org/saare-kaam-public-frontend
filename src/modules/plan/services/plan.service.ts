import { clientApi } from '../../../api/clientApi'
import { ENDPOINTS } from '../../../api/endpoint'
import { SubscriptionPlanItem, PricingCategoryItem } from '../types'
import { subscriptionPlans as defaultPlans, pricingTiers as defaultTiers } from '../../../data/content'

export class PlanService {
  /**
   * Business Logic: Fetch plans from backend API with graceful fallback to default plans
   */
  async getSubscriptionPlans(category?: string): Promise<SubscriptionPlanItem[]> {
    try {
      const endpoint = category && category !== 'all'
        ? `${ENDPOINTS.PLANS.BASE}?category=${category}`
        : ENDPOINTS.PLANS.BASE

      const response = await clientApi.get<{ success: boolean; data: any[] }>(endpoint)

      if (response && response.data && response.data.length > 0) {
        return response.data.map(p => ({
          id: p.slug || p.id,
          name: p.name,
          serviceCategory: (['house_help', 'house-help', 'maid'].includes(p.serviceCategory?.toLowerCase())
            ? 'house_help'
            : 'laundry') as 'laundry' | 'house_help' | 'maid',
          price: `₹${Number(p.price).toLocaleString('en-IN')}`,
          period: p.periodLabel || '/ month',
          popular: Boolean(p.popular),
          badge: p.badge || undefined,
          description: p.description,
          features: p.features || [],
          cta: p.cta || 'Get Started',
        }))
      }

      return defaultPlans
    } catch {
      // Graceful fallback to default plans if backend offline
      return defaultPlans
    }
  }

  /**
   * Business Logic: Fetch categorized rate cards from backend
   */
  async getPricingTiers(category?: string): Promise<PricingCategoryItem[]> {
    try {
      const endpoint = category
        ? `${ENDPOINTS.PLANS.PRICING_TIERS}?category=${category}`
        : ENDPOINTS.PLANS.PRICING_TIERS

      const response = await clientApi.get<{ success: boolean; data: PricingCategoryItem[] }>(endpoint)

      if (response && response.data && response.data.length > 0) {
        return response.data
      }

      return defaultTiers
    } catch {
      return defaultTiers
    }
  }
}

export const planService = new PlanService()

