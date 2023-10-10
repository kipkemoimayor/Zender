// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { deviceSchema } from '../device/device.schema'
import { loanSchema } from '../loan/loan.schema'

// Main data model schema
export const reminderSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Integer(),
    sent: Type.Boolean({ default: false }),
    message: Type.String(),
    scheduledAt: Type.Optional(Type.String({ format: 'date-time' })),
    device: Type.Ref(deviceSchema),
    deviceId: Type.Integer(),
    loan: Type.Ref(loanSchema),
    loanId: Type.Integer(),
    createdAt: Type.String({ default: new Date() }),
    updatedAt: Type.String({ default: new Date() })
  },
  { $id: 'Reminder', additionalProperties: false }
)
export type Reminder = Static<typeof reminderSchema>
export const reminderValidator = getValidator(reminderSchema, dataValidator)
export const reminderResolver = resolve<Reminder, HookContext>({})

export const reminderExternalResolver = resolve<Reminder, HookContext>({})

// Schema for creating new entries
export const reminderDataSchema = Type.Pick(
  reminderSchema,
  ['type', 'loanId', 'deviceId', 'message', 'sent'],
  {
    $id: 'ReminderData'
  }
)
export type ReminderData = Static<typeof reminderDataSchema>
export const reminderDataValidator = getValidator(reminderDataSchema, dataValidator)
export const reminderDataResolver = resolve<Reminder, HookContext>({})

// Schema for updating existing entries
export const reminderPatchSchema = Type.Partial(reminderSchema, {
  $id: 'ReminderPatch'
})
export type ReminderPatch = Static<typeof reminderPatchSchema>
export const reminderPatchValidator = getValidator(reminderPatchSchema, dataValidator)
export const reminderPatchResolver = resolve<Reminder, HookContext>({})

// Schema for allowed query properties
export const reminderQueryProperties = Type.Pick(reminderSchema, [
  'id',
  'type',
  'sent',
  'loanId',
  'createdAt'
])
export const reminderQuerySchema = Type.Intersect(
  [
    querySyntax(reminderQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export const reminderResultResolver = resolve<Reminder, HookContext>({
  loan: virtual(async (device, context) => {
    // Populate the user associated via `userId`
    return context.app.service('loan')._get(device.loanId)
  }),
  device: virtual(async (device, context) => {
    // Populate the user associated via `userId`
    return context.app.service('device')._get(device.deviceId)
  })
})
export type ReminderQuery = Static<typeof reminderQuerySchema>
export const reminderQueryValidator = getValidator(reminderQuerySchema, queryValidator)
export const reminderQueryResolver = resolve<ReminderQuery, HookContext>({})
