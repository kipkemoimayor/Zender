// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { SmsHook, SmsHookData, SmsHookPatch, SmsHookQuery } from './sms-hook.schema'
import { NotImplemented } from '@feathersjs/errors'

export type { SmsHook, SmsHookData, SmsHookPatch, SmsHookQuery }

export interface SmsHookServiceOptions {
  app: Application
}

export interface SmsHookParams extends Params<SmsHookQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SmsHookService<ServiceParams extends SmsHookParams = SmsHookParams>
  implements ServiceInterface<SmsHook, SmsHookData, ServiceParams, SmsHookPatch>
{
  constructor(public options: SmsHookServiceOptions) {}

  async find(_params?: ServiceParams): Promise<SmsHook[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<SmsHook> {
    throw new NotImplemented()
  }

  async create(data: SmsHookData, params?: ServiceParams): Promise<SmsHook>
  async create(data: SmsHookData[], params?: ServiceParams): Promise<SmsHook[]>
  async create(data: SmsHookData | SmsHookData[], params?: ServiceParams): Promise<SmsHook | SmsHook[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: SmsHookData, _params?: ServiceParams): Promise<SmsHook> {
    throw new NotImplemented()
  }

  async patch(id: NullableId, data: SmsHookPatch, _params?: ServiceParams): Promise<SmsHook> {
    throw new NotImplemented()
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<SmsHook> {
    throw new NotImplemented()
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
