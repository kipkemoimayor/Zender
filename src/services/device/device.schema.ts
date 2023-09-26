// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { LoanData, loanSchema } from '../loan/loan.schema'
import { loanDetailsDataSchema } from '../clients/loan-details.schema'

// Main data model schema
export const deviceSchema = Type.Object(
  {
    id: Type.Number(),
    imei: Type.String(),
    status: Type.Any({ description: 'LOCKED-device locked,ACTIVE-device active', default: null }),
    loanId: Type.Integer(),
    loan: Type.Ref(loanSchema),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
    serialNo: Type.Optional(Type.Any()),
    make: Type.Optional(Type.Any()),
    model: Type.Optional(Type.Any()),
    locked: Type.Boolean(),
    mambuSynced: Type.Optional(Type.Boolean({ default: false })),
    mambuSyncedAt: Type.Optional(Type.Any()),
    nuovoSynced: Type.Optional(Type.Boolean({ default: false })),
    nuovoSyncedAt: Type.Optional(Type.Any()),
    clientId: Type.Integer(),
    client: Type.Ref(loanDetailsDataSchema),
    nuovoDeviceId: Type.Optional(Type.String())
  },
  { $id: 'Device', additionalProperties: false }
)
export type Device = Static<typeof deviceSchema>
export const deviceValidator = getValidator(deviceSchema, dataValidator)
export const deviceResolver = resolve<Device, HookContext>({})

export const deviceExternalResolver = resolve<Device, HookContext>({})

// Schema for creating new entries
export const deviceDataSchema = Type.Pick(
  deviceSchema,
  ['imei', 'status', 'loanId', 'serialNo', 'make', 'model', 'locked', 'clientId', 'nuovoDeviceId'],
  {
    $id: 'DeviceData'
  }
)
export type DeviceData = Static<typeof deviceDataSchema>
export const deviceDataValidator = getValidator(deviceDataSchema, dataValidator)
export const deviceDataResolver = resolve<Device, HookContext>({})

// Schema for updating existing entries
export const devicePatchSchema = Type.Partial(deviceSchema, {
  $id: 'DevicePatch'
})
export type DevicePatch = Static<typeof devicePatchSchema>
export const devicePatchValidator = getValidator(devicePatchSchema, dataValidator)
export const devicePatchResolver = resolve<Device, HookContext>({})

// Schema for allowed query properties
export const deviceQueryProperties = Type.Pick(deviceSchema, ['id', 'imei', 'mambuSynced', 'mambuSynced'])
export const deviceQuerySchema = Type.Intersect(
  [
    querySyntax(deviceQueryProperties),
    // Add additional query properties here
    Type.Object({ $or: Type.Any(), $limit: Type.Any() }, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export const deviceResultResolver = resolve<Device, HookContext>({
  loan: virtual(async (device, context) => {
    // Populate the user associated via `userId`
    return context.app.service('loan')._get(device.loanId)
  })
})

export type DeviceQuery = Static<typeof deviceQuerySchema>
export const deviceQueryValidator = getValidator(deviceQuerySchema, queryValidator)
export const deviceQueryResolver = resolve<DeviceQuery, HookContext>({})
