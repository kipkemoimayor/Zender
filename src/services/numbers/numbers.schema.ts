// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const numbersSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Numbers', additionalProperties: false }
)
export type Numbers = Static<typeof numbersSchema>
export const numbersValidator = getValidator(numbersSchema, dataValidator)
export const numbersResolver = resolve<Numbers, HookContext>({})

export const numbersExternalResolver = resolve<Numbers, HookContext>({})

// Schema for creating new entries
export const numbersDataSchema = Type.Pick(numbersSchema, ['text'], {
  $id: 'NumbersData'
})
export type NumbersData = Static<typeof numbersDataSchema>
export const numbersDataValidator = getValidator(numbersDataSchema, dataValidator)
export const numbersDataResolver = resolve<Numbers, HookContext>({})

// Schema for updating existing entries
export const numbersPatchSchema = Type.Partial(numbersSchema, {
  $id: 'NumbersPatch'
})
export type NumbersPatch = Static<typeof numbersPatchSchema>
export const numbersPatchValidator = getValidator(numbersPatchSchema, dataValidator)
export const numbersPatchResolver = resolve<Numbers, HookContext>({})

// Schema for allowed query properties
export const numbersQueryProperties = Type.Pick(numbersSchema, ['id', 'text'])
export const numbersQuerySchema = Type.Intersect(
  [
    querySyntax(numbersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NumbersQuery = Static<typeof numbersQuerySchema>
export const numbersQueryValidator = getValidator(numbersQuerySchema, queryValidator)
export const numbersQueryResolver = resolve<NumbersQuery, HookContext>({})
