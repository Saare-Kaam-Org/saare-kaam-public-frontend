export type PartnerRole = 'laundry_vendor' | 'house_help' | 'maid'

export type ApplicationStatus = 'Pending' | 'Verified' | 'Contacted' | 'Rejected'

export type CreateApplicationPayload = {
  role: PartnerRole
  ownerName: string
  phone: string
  email?: string
  city: string
  area: string
  pincode: string
  experienceYears?: string
  notes?: string

  // Laundry
  businessName?: string
  dailyCapacity?: string
  equipment?: string[]

  // House Help
  houseHelpServices?: string[]
  maidServices?: string[]
  verificationReady?: boolean
  languages?: string[]
}

export type ApplicationEntity = {
  id: string
  applicationNo: string
  role: string
  ownerName: string
  phone: string
  email?: string | null
  city: string
  area: string
  pincode: string
  experienceYears: string
  notes?: string | null
  status: string
  createdAt: string
  businessName?: string | null
  dailyCapacity?: string | null
  equipment?: string[]
  houseHelpServices?: string[]
  maidServices?: string[]
  verificationReady?: boolean
  languages?: string[]
}
