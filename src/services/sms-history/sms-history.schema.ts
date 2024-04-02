// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const smsHistorySchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Integer(),
    status: Type.Boolean({ default: false }),
    clientId: Type.Integer(),
    createdAt: Type.Any({ default: new Date() }),
    updatedAt: Type.Any({ default: new Date() })
  },
  { $id: 'SmsHistory', additionalProperties: false }
)
export type SmsHistory = Static<typeof smsHistorySchema>
export const smsHistoryValidator = getValidator(smsHistorySchema, dataValidator)
export const smsHistoryResolver = resolve<SmsHistory, HookContext>({})

export const smsHistoryExternalResolver = resolve<SmsHistory, HookContext>({})

// Schema for creating new entries
export const smsHistoryDataSchema = Type.Pick(smsHistorySchema, ['type', 'status', 'clientId'], {
  $id: 'SmsHistoryData'
})
export type SmsHistoryData = Static<typeof smsHistoryDataSchema>
export const smsHistoryDataValidator = getValidator(smsHistoryDataSchema, dataValidator)
export const smsHistoryDataResolver = resolve<SmsHistory, HookContext>({})

// Schema for updating existing entries
export const smsHistoryPatchSchema = Type.Partial(smsHistorySchema, {
  $id: 'SmsHistoryPatch'
})
export type SmsHistoryPatch = Static<typeof smsHistoryPatchSchema>
export const smsHistoryPatchValidator = getValidator(smsHistoryPatchSchema, dataValidator)
export const smsHistoryPatchResolver = resolve<SmsHistory, HookContext>({
  updatedAt: async () => {
    return new Date()
  }
})

// Schema for allowed query properties
export const smsHistoryQueryProperties = Type.Pick(smsHistorySchema, ['id', 'type', 'status', 'clientId'])
export const smsHistoryQuerySchema = Type.Intersect(
  [
    querySyntax(smsHistoryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SmsHistoryQuery = Static<typeof smsHistoryQuerySchema>
export const smsHistoryQueryValidator = getValidator(smsHistoryQuerySchema, queryValidator)
export const smsHistoryQueryResolver = resolve<SmsHistoryQuery, HookContext>({})
