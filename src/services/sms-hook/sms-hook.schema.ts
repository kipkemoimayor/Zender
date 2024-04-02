// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const smsHookSchema = Type.Object(
  {
    id: Type.Number(),
    smsType: Type.String(),
    loanId: Type.Optional(Type.String())
  },
  { $id: 'SmsHook', additionalProperties: false }
)
export type SmsHook = Static<typeof smsHookSchema>
export const smsHookValidator = getValidator(smsHookSchema, dataValidator)
export const smsHookResolver = resolve<SmsHook, HookContext>({})

export const smsHookExternalResolver = resolve<SmsHook, HookContext>({})

// Schema for creating new entries
export const smsHookDataSchema = Type.Pick(smsHookSchema, ['smsType', 'loanId'], {
  $id: 'SmsHookData'
})
export type SmsHookData = Static<typeof smsHookDataSchema>
export const smsHookDataValidator = getValidator(smsHookDataSchema, dataValidator)
export const smsHookDataResolver = resolve<SmsHook, HookContext>({})

// Schema for updating existing entries
export const smsHookPatchSchema = Type.Partial(smsHookSchema, {
  $id: 'SmsHookPatch'
})
export type SmsHookPatch = Static<typeof smsHookPatchSchema>
export const smsHookPatchValidator = getValidator(smsHookPatchSchema, dataValidator)
export const smsHookPatchResolver = resolve<SmsHook, HookContext>({})

// Schema for allowed query properties
export const smsHookQueryProperties = Type.Pick(smsHookSchema, ['id', 'loanId'])
export const smsHookQuerySchema = Type.Intersect(
  [
    querySyntax(smsHookQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SmsHookQuery = Static<typeof smsHookQuerySchema>
export const smsHookQueryValidator = getValidator(smsHookQuerySchema, queryValidator)
export const smsHookQueryResolver = resolve<SmsHookQuery, HookContext>({})
