import { clientApi } from '../../../api/clientApi'
import { ENDPOINTS } from '../../../api/endpoint'
import { CreateApplicationPayload, ApplicationEntity } from '../types'

export class ApplicationService {
  /**
   * Business Logic: Validate and submit a partner application to backend PostgreSQL
   */
  async submitApplication(payload: CreateApplicationPayload): Promise<ApplicationEntity> {
    // Basic client-side validation
    if (!payload.ownerName.trim()) {
      throw new Error('Full Name is required.')
    }
    if (!payload.phone.trim()) {
      throw new Error('WhatsApp Phone Number is required.')
    }
    if (!payload.city.trim() || !payload.area.trim() || !payload.pincode.trim()) {
      throw new Error('City, Area, and Pincode are required.')
    }

    // Prepare payload
    const sanitized: CreateApplicationPayload = {
      ...payload,
      ownerName: payload.ownerName.trim(),
      phone: payload.phone.trim(),
      email: payload.email?.trim() || undefined,
      city: payload.city.trim(),
      area: payload.area.trim(),
      pincode: payload.pincode.trim(),
      notes: payload.notes?.trim() || undefined,
      businessName: payload.businessName?.trim() || undefined,
    }

    // Call backend API via clientApi
    const response = await clientApi.post<{ success: boolean; data: ApplicationEntity; message: string }>(
      ENDPOINTS.APPLICATIONS.CREATE,
      sanitized
    )

    if (!response || !response.data) {
      throw new Error('Unexpected response received from server')
    }

    return response.data
  }
}

export const applicationService = new ApplicationService()

