export const ENDPOINTS = {
  SERVICES: {
    BASE: '/services',
    LOCAL: '/services/local',
    ACTIVE: '/services/active',
    SUMMARY: '/services/summary',
    BY_SLUG: (slug: string) => `/services/${slug}`,
  },
  APPLICATIONS: {
    BASE: '/applications',
    CREATE: '/applications/partner',
    GET_ONE: (id: string) => `/applications/${id}`,
  },
  PLANS: {
    BASE: '/plans',
    PRICING_TIERS: '/plans/pricing-tiers',
    GET_ONE: (slug: string) => `/plans/${slug}`,
  },
  AUTH: {
    STATUS: '/auth/status',
  },
  HEALTH: '/health',
} as const

