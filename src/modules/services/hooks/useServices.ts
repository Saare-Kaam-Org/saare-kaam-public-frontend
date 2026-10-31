import { useState, useEffect, useCallback } from 'react'
import { serviceService } from '../services/service.service'
import { ServiceEntity, ServiceStatusSummary } from '../types'

export function useServices() {
  const [services, setServices] = useState<ServiceEntity[]>([])
  const [summary, setSummary] = useState<ServiceStatusSummary | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [list, sum] = await Promise.all([
        serviceService.getAllServices(),
        serviceService.getStatusSummary(),
      ])
      setServices(list)
      setSummary(sum)
    } catch (err: any) {
      setError(err?.message || 'Failed to load services from backend')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const activeServices = services.filter(s => s.status === 'ACTIVE')
  const upcomingServices = services.filter(s => s.status === 'UPCOMING')

  /**
   * Check if a specific partner role is active based on live DB service statuses
   */
  const isRoleActive = (roleName: string): boolean => {
    const normalized = roleName.toUpperCase().replace(/\s+/g, '_')
    if (summary?.activeRoles) {
      return summary.activeRoles.some(r => r.toUpperCase() === normalized)
    }
    // Fallback: check against activeServices list
    return activeServices.some(s => s.partnerRole?.toUpperCase() === normalized)
  }

  return {
    services,
    activeServices,
    upcomingServices,
    summary,
    isLoading,
    error,
    refresh: fetchServices,
    isRoleActive,
  }
}

