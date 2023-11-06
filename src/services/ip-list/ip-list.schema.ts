// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ipListSchema = Type.Object(
  {
    id: Type.Number(),
    ipAddress: Type.String(),
    status: Type.Boolean({ default: true })
  },
  { $id: 'IpList', additionalProperties: false }
)
export type IpList = Static<typeof ipListSchema>
export const ipListValidator = getValidator(ipListSchema, dataValidator)
export const ipListResolver = resolve<IpList, HookContext>({})

export const ipListExternalResolver = resolve<IpList, HookContext>({})

// Schema for creating new entries
export const ipListDataSchema = Type.Pick(ipListSchema, ['ipAddress', 'status'], {
  $id: 'IpListData'
})
export type IpListData = Static<typeof ipListDataSchema>
export const ipListDataValidator = getValidator(ipListDataSchema, dataValidator)
export const ipListDataResolver = resolve<IpList, HookContext>({})

// Schema for updating existing entries
export const ipListPatchSchema = Type.Partial(ipListSchema, {
  $id: 'IpListPatch'
})
export type IpListPatch = Static<typeof ipListPatchSchema>
export const ipListPatchValidator = getValidator(ipListPatchSchema, dataValidator)
export const ipListPatchResolver = resolve<IpList, HookContext>({})

// Schema for allowed query properties
export const ipListQueryProperties = Type.Pick(ipListSchema, ['id', 'ipAddress', 'status'])
export const ipListQuerySchema = Type.Intersect(
  [
    querySyntax(ipListQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IpListQuery = Static<typeof ipListQuerySchema>
export const ipListQueryValidator = getValidator(ipListQuerySchema, queryValidator)
export const ipListQueryResolver = resolve<IpListQuery, HookContext>({})
