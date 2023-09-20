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
    idNumber: Type.String(),
    emailAddress: Type.String({ format: 'email' }),
    phoneNumber: Type.String(),
    location: Type.String(),
    status: Type.Number({ default: 1 }),
    createdAt: Type.String({ default: new Date() }),
    updatedAt: Type.String({ default: new Date() })
    // loanId: Type.Optional(Type.String()),
    // imei: Type.Optional(Type.String())
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
  ['fullName', 'idNumber', 'emailAddress', 'phoneNumber', 'location', 'status'],
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
export const loanDetailsPatchResolver = resolve<LoanDetails, HookContext>({})

// Schema for allowed query properties
export const loanDetailsQueryProperties = Type.Pick(loanDetailsSchema, [
  'id',
  'status',
  'phoneNumber',
  'idNumber'
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
