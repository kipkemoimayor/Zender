// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Numbers, NumbersData, NumbersPatch, NumbersQuery, NumbersService } from './numbers.class'

export type { Numbers, NumbersData, NumbersPatch, NumbersQuery }

export type NumbersClientService = Pick<NumbersService<Params<NumbersQuery>>, (typeof numbersMethods)[number]>

export const numbersPath = 'numbers'

export const numbersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const numbersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(numbersPath, connection.service(numbersPath), {
    methods: numbersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [numbersPath]: NumbersClientService
  }
}
