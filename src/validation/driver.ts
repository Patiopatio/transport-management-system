import { z } from 'zod'
import type { CreateDriverInput } from '@/types'

export const driverSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(50, 'Location must not exceed 50 characters')
    .regex(/^[^0-9]+$/, 'Location must not contain numbers'),
})

// Type assertion to ensure schema matches our type
export const validateDriver = (input: unknown): CreateDriverInput => {
  return driverSchema.parse(input)
}
