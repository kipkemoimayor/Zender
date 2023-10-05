// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  DeviceLockHistory,
  DeviceLockHistoryData,
  DeviceLockHistoryPatch,
  DeviceLockHistoryQuery
} from './device-lock-history.schema'

export type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery }

export interface DeviceLockHistoryParams extends KnexAdapterParams<DeviceLockHistoryQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DeviceLockHistoryService<
  ServiceParams extends Params = DeviceLockHistoryParams
> extends KnexService<
  DeviceLockHistory,
  DeviceLockHistoryData,
  DeviceLockHistoryParams,
  DeviceLockHistoryPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'device_lock_history'
  }
}
