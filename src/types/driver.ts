import type { BaseEntity } from './common'

export interface Driver extends BaseEntity {
  name: string
  location: string
}

export type CreateDriverInput = Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>

export interface DriverFilters {
  searchQuery: string
}
