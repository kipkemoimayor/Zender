// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const lockDeviceSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.String(),
    loanAccountId: Type.String(),
    imei: Type.String()
  },
  { $id: 'LockDevice', additionalProperties: false }
)
export type LockDevice = Static<typeof lockDeviceSchema>
export const lockDeviceValidator = getValidator(lockDeviceSchema, dataValidator)
export const lockDeviceResolver = resolve<LockDevice, HookContext>({})

export const lockDeviceExternalResolver = resolve<LockDevice, HookContext>({})

// Schema for creating new entries
export const lockDeviceDataSchema = Type.Pick(lockDeviceSchema, ['type', 'loanAccountId', 'imei'], {
  $id: 'LockDeviceData'
})
export type LockDeviceData = Static<typeof lockDeviceDataSchema>
export const lockDeviceDataValidator = getValidator(lockDeviceDataSchema, dataValidator)
export const lockDeviceDataResolver = resolve<LockDevice, HookContext>({})

// Schema for updating existing entries
export const lockDevicePatchSchema = Type.Partial(lockDeviceSchema, {
  $id: 'LockDevicePatch'
})
export type LockDevicePatch = Static<typeof lockDevicePatchSchema>
export const lockDevicePatchValidator = getValidator(lockDevicePatchSchema, dataValidator)
export const lockDevicePatchResolver = resolve<LockDevice, HookContext>({})

// Schema for allowed query properties
export const lockDeviceQueryProperties = Type.Pick(lockDeviceSchema, ['id', 'type'])
export const lockDeviceQuerySchema = Type.Intersect(
  [
    querySyntax(lockDeviceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LockDeviceQuery = Static<typeof lockDeviceQuerySchema>
export const lockDeviceQueryValidator = getValidator(lockDeviceQuerySchema, queryValidator)
export const lockDeviceQueryResolver = resolve<LockDeviceQuery, HookContext>({})
