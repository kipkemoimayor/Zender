// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { loanDetailsSchema } from '../clients/loan-details.schema'

// Main data model schema
export const loanSchema = Type.Object(
  {
    id: Type.Number(),
    accountId: Type.String(),
    firstRepaymentDate: Type.Any(),
    loanName: Type.String(),
    status: Type.String(),
    mambuImei: Type.String(),
    clientId: Type.Integer(),
    client: Type.Ref(loanDetailsSchema),
    createdAt: Type.String({ default: new Date() }),
    updatedAt: Type.String({ default: new Date() }),
  },
  { $id: 'Loan', additionalProperties: false }
)
export type Loan = Static<typeof loanSchema>
export const loanValidator = getValidator(loanSchema, dataValidator)
export const loanResolver = resolve<Loan, HookContext>({})

export const loanExternalResolver = resolve<Loan, HookContext>({})

// Schema for creating new entries
export const loanDataSchema = Type.Pick(
  loanSchema,
  ['accountId', 'firstRepaymentDate', 'loanName', 'status', 'mambuImei', 'clientId'],
  {
    $id: 'LoanData'
  }
)
export type LoanData = Static<typeof loanDataSchema>
export const loanDataValidator = getValidator(loanDataSchema, dataValidator)
export const loanDataResolver = resolve<Loan, HookContext>({})

// Schema for updating existing entries
export const loanPatchSchema = Type.Partial(loanSchema, {
  $id: 'LoanPatch'
})
export type LoanPatch = Static<typeof loanPatchSchema>
export const loanPatchValidator = getValidator(loanPatchSchema, dataValidator)
export const loanPatchResolver = resolve<Loan, HookContext>({})

// Schema for allowed query properties
export const loanQueryProperties = Type.Pick(loanSchema, ['id', 'status'])
export const loanQuerySchema = Type.Intersect(
  [
    querySyntax(loanQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LoanQuery = Static<typeof loanQuerySchema>
export const loanQueryValidator = getValidator(loanQuerySchema, queryValidator)
export const loanQueryResolver = resolve<LoanQuery, HookContext>({})
