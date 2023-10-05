// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const smsQueueSchema = Type.Object(
  {
    id: Type.Number(),
    message: Type.String(),
    destination: Type.String(),
    direction: Type.String({ default: 'OUT' }),
    sent: Type.Boolean({ default: false }),
    createdAt: Type.String({ default: new Date() }),
    updatedAt: Type.String({ default: new Date() })
  },
  { $id: 'SmsQueue', additionalProperties: false }
)
export type SmsQueue = Static<typeof smsQueueSchema>
export const smsQueueValidator = getValidator(smsQueueSchema, dataValidator)
export const smsQueueResolver = resolve<SmsQueue, HookContext>({})

export const smsQueueExternalResolver = resolve<SmsQueue, HookContext>({})

// Schema for creating new entries
export const smsQueueDataSchema = Type.Pick(smsQueueSchema, ['message', 'destination', 'direction', 'sent'], {
  $id: 'SmsQueueData'
})
export type SmsQueueData = Static<typeof smsQueueDataSchema>
export const smsQueueDataValidator = getValidator(smsQueueDataSchema, dataValidator)
export const smsQueueDataResolver = resolve<SmsQueue, HookContext>({})

// Schema for updating existing entries
export const smsQueuePatchSchema = Type.Partial(smsQueueSchema, {
  $id: 'SmsQueuePatch'
})
export type SmsQueuePatch = Static<typeof smsQueuePatchSchema>
export const smsQueuePatchValidator = getValidator(smsQueuePatchSchema, dataValidator)
export const smsQueuePatchResolver = resolve<SmsQueue, HookContext>({})

// Schema for allowed query properties
export const smsQueueQueryProperties = Type.Pick(smsQueueSchema, ['id', 'message', 'sent', 'direction'])
export const smsQueueQuerySchema = Type.Intersect(
  [
    querySyntax(smsQueueQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SmsQueueQuery = Static<typeof smsQueueQuerySchema>
export const smsQueueQueryValidator = getValidator(smsQueueQuerySchema, queryValidator)
export const smsQueueQueryResolver = resolve<SmsQueueQuery, HookContext>({})
