// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { IpList, IpListData, IpListPatch, IpListQuery } from './ip-list.schema'

export type { IpList, IpListData, IpListPatch, IpListQuery }

export interface IpListParams extends KnexAdapterParams<IpListQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class IpListService<ServiceParams extends Params = IpListParams> extends KnexService<
  IpList,
  IpListData,
  IpListParams,
  IpListPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'ip-list'
  }
}
