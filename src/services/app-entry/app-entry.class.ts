// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'

type AppEntry = any
type AppEntryData = any
type AppEntryPatch = any
type AppEntryQuery = any

export type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery }

export interface AppEntryServiceOptions {
  app: Application
}

export interface AppEntryParams extends Params<AppEntryQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AppEntryService<ServiceParams extends AppEntryParams = AppEntryParams>
  implements ServiceInterface<AppEntry, AppEntryData, ServiceParams, AppEntryPatch>
{
  constructor(public options: AppEntryServiceOptions) {}

  async find(_params?: ServiceParams): Promise<AppEntry[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<AppEntry> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: AppEntryData, params?: ServiceParams): Promise<AppEntry>
  async create(data: AppEntryData[], params?: ServiceParams): Promise<AppEntry[]>
  async create(data: AppEntryData | AppEntryData[], params?: ServiceParams): Promise<AppEntry | AppEntry[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: AppEntryData, _params?: ServiceParams): Promise<AppEntry> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: AppEntryPatch, _params?: ServiceParams): Promise<AppEntry> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<AppEntry> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
