import { useState, useEffect } from 'react'
import { planService } from '../services/plan.service'
import { SubscriptionPlanItem } from '../types'
import { subscriptionPlans as defaultPlans } from '../../../data/content'

export function usePlans(categoryFilter: 'all' | 'laundry' | 'erp' = 'all') {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>(defaultPlans)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await planService.getSubscriptionPlans(categoryFilter)
      setPlans(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load plans from backend')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [categoryFilter])

  return {
    plans,
    isLoading,
    error,
    refresh: fetchPlans,
  }
}

