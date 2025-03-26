export interface Driver {
  id: string
  name: string // min 2 characters
  location: string // must not contain numbers
}

// Type for creating a new driver (without id)
export type CreateDriverInput = Omit<Driver, 'id'>
