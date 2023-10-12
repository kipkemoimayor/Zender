// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const disbursmentSchema = Type.Object(
  {
    id: Type.Number(),
    imei: Type.String(),
    loanAccountId: Type.String()
  },
  { $id: 'Disbursment', additionalProperties: false }
)
export type Disbursment = Static<typeof disbursmentSchema>
export const disbursmentValidator = getValidator(disbursmentSchema, dataValidator)
export const disbursmentResolver = resolve<Disbursment, HookContext>({})

export const disbursmentExternalResolver = resolve<Disbursment, HookContext>({})

// Schema for creating new entries
export const disbursmentDataSchema = Type.Pick(disbursmentSchema, ['imei', 'loanAccountId'], {
  $id: 'DisbursmentData'
})
export type DisbursmentData = Static<typeof disbursmentDataSchema>
export const disbursmentDataValidator = getValidator(disbursmentDataSchema, dataValidator)
export const disbursmentDataResolver = resolve<Disbursment, HookContext>({})

// Schema for updating existing entries
export const disbursmentPatchSchema = Type.Partial(disbursmentSchema, {
  $id: 'DisbursmentPatch'
})
export type DisbursmentPatch = Static<typeof disbursmentPatchSchema>
export const disbursmentPatchValidator = getValidator(disbursmentPatchSchema, dataValidator)
export const disbursmentPatchResolver = resolve<Disbursment, HookContext>({})

// Schema for allowed query properties
export const disbursmentQueryProperties = Type.Pick(disbursmentSchema, ['id', 'loanAccountId'])
export const disbursmentQuerySchema = Type.Intersect(
  [
    querySyntax(disbursmentQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DisbursmentQuery = Static<typeof disbursmentQuerySchema>
export const disbursmentQueryValidator = getValidator(disbursmentQuerySchema, queryValidator)
export const disbursmentQueryResolver = resolve<DisbursmentQuery, HookContext>({})
