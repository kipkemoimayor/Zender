// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Device, DeviceData, DevicePatch, DeviceQuery } from './device.schema'

export type { Device, DeviceData, DevicePatch, DeviceQuery }

export interface DeviceParams extends KnexAdapterParams<DeviceQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DeviceService<ServiceParams extends Params = DeviceParams> extends KnexService<
  Device,
  DeviceData,
  DeviceParams,
  DevicePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'device'
  }
}
