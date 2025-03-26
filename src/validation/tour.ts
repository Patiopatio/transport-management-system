import { z } from 'zod'
import type { CreateTourInput, UpdateTourInput } from '@/types'

export const tourSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name must not exceed 100 characters'),
  shipmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  locationFrom: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(50, 'Location must not exceed 50 characters'),
  locationTo: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(50, 'Location must not exceed 50 characters'),
  assignedDriverId: z.string().nullable(),
})

// Partial schema for updates
export const tourUpdateSchema = tourSchema.partial()

// Type assertion to ensure schema matches our types
export const validateTour = (input: unknown): CreateTourInput => {
  return tourSchema.parse(input)
}

export const validateTourUpdate = (input: unknown): UpdateTourInput => {
  return tourUpdateSchema.parse(input)
}
