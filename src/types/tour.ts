import type { BaseEntity } from './common'

export interface Tour extends BaseEntity {
  customerName: string
  shipmentDate: string // ISO date string
  locationFrom: string
  locationTo: string
  assignedDriverId?: string | null
}

// Type for creating a new tour (without id)
export type CreateTourInput = Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>

// Type for updating an existing tour
export type UpdateTourInput = Partial<CreateTourInput>

// Type for tour with driver validation
export interface TourDriverAssignment {
  driverId: string
  driverLocation: string
  tourLocationFrom: string
}

export interface TourFilters {
  searchQuery: string
  dateFilter: string
}
