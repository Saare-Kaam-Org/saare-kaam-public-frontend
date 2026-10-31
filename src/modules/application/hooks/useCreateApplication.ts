import { useState } from 'react'
import { applicationService } from '../services/application.service'
import { CreateApplicationPayload, ApplicationEntity } from '../types'

export function useCreateApplication() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ApplicationEntity | null>(null)

  const submit = async (payload: CreateApplicationPayload): Promise<ApplicationEntity | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await applicationService.submitApplication(payload)
      setData(result)
      return result
    } catch (err: any) {
      const message = err.message || 'Failed to submit application. Please verify backend server is running.'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setData(null)
  }

  return {
    submit,
    reset,
    isLoading,
    error,
    data,
  }
}

