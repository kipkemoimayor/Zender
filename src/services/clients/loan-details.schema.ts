// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const loanDetailsSchema = Type.Object(
  {
    id: Type.Number(),
    fullName: Type.String(),
    loanId: Type.Optional(Type.String()),
    phoneNumber: Type.String(),
    guarantorPhoneNumber: Type.String(),
    guarantorName: Type.String(),
    status: Type.Boolean({ default: true }),
    createdAt: Type.Any({ default: new Date() }),
    updatedAt: Type.Any({ default: new Date() })
  },
  { $id: 'LoanDetails', additionalProperties: true }
)
export type LoanDetails = Static<typeof loanDetailsSchema>
export const loanDetailsValidator = getValidator(loanDetailsSchema, dataValidator)
export const loanDetailsResolver = resolve<LoanDetails, HookContext>({})

export const loanDetailsExternalResolver = resolve<LoanDetails, HookContext>({})

// 'file_id', 'file_type', 'client_id', 'client_email'
// Schema for creating new entries
export const loanDetailsDataSchema = Type.Pick(
  loanDetailsSchema,
  ['fullName', 'phoneNumber', 'status', 'loanId', 'guarantorPhoneNumber', 'guarantorName'],
  {
    $id: 'LoanDetailsData'
  }
)
export type LoanDetailsData = Static<typeof loanDetailsDataSchema>
export const loanDetailsDataValidator = getValidator(loanDetailsDataSchema, dataValidator)
export const loanDetailsDataResolver = resolve<LoanDetails, HookContext>({})

// Schema for updating existing entries
export const loanDetailsPatchSchema = Type.Partial(loanDetailsSchema, {
  $id: 'LoanDetailsPatch'
})
export type LoanDetailsPatch = Static<typeof loanDetailsPatchSchema>
export const loanDetailsPatchValidator = getValidator(loanDetailsPatchSchema, dataValidator)
export const loanDetailsPatchResolver = resolve<LoanDetails, HookContext>({
  updatedAt: async () => {
    return new Date()
  }
})

// Schema for allowed query properties
export const loanDetailsQueryProperties = Type.Pick(loanDetailsSchema, [
  'id',
  'status',
  'phoneNumber',
  'status',
  'loanId',
  'guarantorPhoneNumber'
])
export const loanDetailsQuerySchema = Type.Intersect(
  [
    querySyntax(loanDetailsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LoanDetailsQuery = Static<typeof loanDetailsQuerySchema>
export const loanDetailsQueryValidator = getValidator(loanDetailsQuerySchema, queryValidator)
export const loanDetailsQueryResolver = resolve<LoanDetailsQuery, HookContext>({})
