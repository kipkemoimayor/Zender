// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const sentSmsSchema = Type.Object(
  {
    id: Type.Number(),
    message: Type.String(),
    destination: Type.String(),
    direction: Type.String({ default: 'OUT' }),
    sent: Type.Boolean({ default: false }),
    createdAt: Type.String({ default: new Date() }),
    updatedAt: Type.String({ default: new Date() })
  },
  { $id: 'SentSms', additionalProperties: false }
)
export type SentSms = Static<typeof sentSmsSchema>
export const sentSmsValidator = getValidator(sentSmsSchema, dataValidator)
export const sentSmsResolver = resolve<SentSms, HookContext>({})

export const sentSmsExternalResolver = resolve<SentSms, HookContext>({})

// Schema for creating new entries
export const sentSmsDataSchema = Type.Pick(sentSmsSchema, ['message', 'destination', 'direction', 'sent'], {
  $id: 'SentSmsData'
})
export type SentSmsData = Static<typeof sentSmsDataSchema>
export const sentSmsDataValidator = getValidator(sentSmsDataSchema, dataValidator)
export const sentSmsDataResolver = resolve<SentSms, HookContext>({})

// Schema for updating existing entries
export const sentSmsPatchSchema = Type.Partial(sentSmsSchema, {
  $id: 'SentSmsPatch'
})
export type SentSmsPatch = Static<typeof sentSmsPatchSchema>
export const sentSmsPatchValidator = getValidator(sentSmsPatchSchema, dataValidator)
export const sentSmsPatchResolver = resolve<SentSms, HookContext>({})

// Schema for allowed query properties
export const sentSmsQueryProperties = Type.Pick(sentSmsSchema, ['id', 'destination'])
export const sentSmsQuerySchema = Type.Intersect(
  [
    querySyntax(sentSmsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SentSmsQuery = Static<typeof sentSmsQuerySchema>
export const sentSmsQueryValidator = getValidator(sentSmsQuerySchema, queryValidator)
export const sentSmsQueryResolver = resolve<SentSmsQuery, HookContext>({})
