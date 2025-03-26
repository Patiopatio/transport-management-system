import { configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { localize } from '@vee-validate/i18n'
import { z } from 'zod'

// Configure VeeValidate
configure({
  generateMessage: localize('en', {
    messages: {
      required: 'This field is required',
      min: 'This field must be at least {length} characters',
      max: 'This field must not exceed {length} characters',
      alpha_spaces: 'This field can only contain letters and spaces',
    },
  }),
})

// Helper to convert Zod schema to VeeValidate schema
export const toFormValidator = (schema: z.ZodType) => {
  return toTypedSchema(schema)
}
