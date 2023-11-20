// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { loanSchema } from '../loan/loan.schema'
import { deviceSchema } from '../device/device.schema'

// Main data model schema
export const deviceLockHistorySchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Number(),
    lockedAt: Type.Optional(Type.Any()),
    unlockedAt: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.String({ default: new Date() })),
    updatedAt: Type.Optional(Type.String({ default: new Date() })),
    deviceId: Type.Integer(),
    loanId: Type.Integer(),
    reason: Type.String(),
    loan: Type.Ref(loanSchema),
    device: Type.Ref(deviceSchema)
  },
  { $id: 'DeviceLockHistory', additionalProperties: false }
)
export type DeviceLockHistory = Static<typeof deviceLockHistorySchema>
export const deviceLockHistoryValidator = getValidator(deviceLockHistorySchema, dataValidator)
export const deviceLockHistoryResolver = resolve<DeviceLockHistory, HookContext>({})

export const deviceLockHistoryExternalResolver = resolve<DeviceLockHistory, HookContext>({})

// Schema for creating new entries
export const deviceLockHistoryDataSchema = Type.Pick(
  deviceLockHistorySchema,
  ['type', 'lockedAt', 'unlockedAt', 'createdAt', 'updatedAt', 'deviceId', 'loanId', 'reason'],
  {
    $id: 'DeviceLockHistoryData'
  }
)
export type DeviceLockHistoryData = Static<typeof deviceLockHistoryDataSchema>
export const deviceLockHistoryDataValidator = getValidator(deviceLockHistoryDataSchema, dataValidator)
export const deviceLockHistoryDataResolver = resolve<DeviceLockHistory, HookContext>({})

// Schema for updating existing entries
export const deviceLockHistoryPatchSchema = Type.Partial(deviceLockHistorySchema, {
  $id: 'DeviceLockHistoryPatch'
})
export type DeviceLockHistoryPatch = Static<typeof deviceLockHistoryPatchSchema>
export const deviceLockHistoryPatchValidator = getValidator(deviceLockHistoryPatchSchema, dataValidator)
export const deviceLockHistoryPatchResolver = resolve<DeviceLockHistory, HookContext>({})

// Schema for allowed query properties
export const deviceLockHistoryQueryProperties = Type.Pick(deviceLockHistorySchema, ['id', 'type'])
export const deviceLockHistoryQuerySchema = Type.Intersect(
  [
    querySyntax(deviceLockHistoryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export const lockHistoryResultResolver = resolve<DeviceLockHistory, HookContext>({
  loan: virtual(async (device, context) => {
    // Populate the user associated via `userId`
    return context.app.service('loan').get(device.loanId)
  }),
  device: virtual(async (device, context) => {
    // Populate the user associated via `userId`
    return context.app.service('device').get(device.deviceId)
  })
})
export type DeviceLockHistoryQuery = Static<typeof deviceLockHistoryQuerySchema>
export const deviceLockHistoryQueryValidator = getValidator(deviceLockHistoryQuerySchema, queryValidator)
export const deviceLockHistoryQueryResolver = resolve<DeviceLockHistoryQuery, HookContext>({})
