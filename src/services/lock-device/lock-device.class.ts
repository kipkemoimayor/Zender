// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery } from './lock-device.schema'
import { MethodNotAllowed } from '@feathersjs/errors'

export type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery }

export interface LockDeviceServiceOptions {
  app: Application
}

export interface LockDeviceParams extends Params<LockDeviceQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class LockDeviceService<ServiceParams extends LockDeviceParams = LockDeviceParams>
  implements ServiceInterface<LockDevice, LockDeviceData, ServiceParams, LockDevicePatch>
{
  constructor(public options: LockDeviceServiceOptions) {}

  async find(_params?: ServiceParams): Promise<LockDevice[]> {
    throw new MethodNotAllowed()
  }

  async get(id: Id, _params?: ServiceParams): Promise<LockDevice> {
    throw new MethodNotAllowed()
  }

  async create(data: LockDeviceData, params?: ServiceParams): Promise<LockDevice>
  async create(data: LockDeviceData[], params?: ServiceParams): Promise<LockDevice[]>
  async create(
    data: LockDeviceData | LockDeviceData[],
    params?: ServiceParams
  ): Promise<LockDevice | LockDevice[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: LockDeviceData, _params?: ServiceParams): Promise<LockDevice> {
    throw new MethodNotAllowed()
  }

  async patch(id: NullableId, data: LockDevicePatch, _params?: ServiceParams): Promise<LockDevice> {
    throw new MethodNotAllowed()
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<LockDevice> {
    throw new MethodNotAllowed()
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
