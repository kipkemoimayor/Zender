// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { IpList, IpListData, IpListPatch, IpListQuery, IpListService } from './ip-list.class'

export type { IpList, IpListData, IpListPatch, IpListQuery }

export type IpListClientService = Pick<IpListService<Params<IpListQuery>>, (typeof ipListMethods)[number]>

export const ipListPath = 'ip-list'

export const ipListMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ipListClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ipListPath, connection.service(ipListPath), {
    methods: ipListMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ipListPath]: IpListClientService
  }
}
