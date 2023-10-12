// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery } from './disbursment.schema'
import { MethodNotAllowed } from '@feathersjs/errors'

export type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery }

export interface DisbursmentServiceOptions {
  app: Application
}

export interface DisbursmentParams extends Params<DisbursmentQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class DisbursmentService<ServiceParams extends DisbursmentParams = DisbursmentParams>
  implements ServiceInterface<Disbursment, DisbursmentData, ServiceParams, DisbursmentPatch>
{
  constructor(public options: DisbursmentServiceOptions) {}

  async find(_params?: ServiceParams): Promise<Disbursment[]> {
    throw new MethodNotAllowed()
  }

  async get(id: Id, _params?: ServiceParams): Promise<Disbursment> {
    throw new MethodNotAllowed()
  }

  async create(data: DisbursmentData, params?: ServiceParams): Promise<Disbursment>
  async create(data: DisbursmentData[], params?: ServiceParams): Promise<Disbursment[]>
  async create(
    data: DisbursmentData | DisbursmentData[],
    params?: ServiceParams
  ): Promise<Disbursment | Disbursment[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: DisbursmentData, _params?: ServiceParams): Promise<Disbursment> {
    throw new MethodNotAllowed()
  }

  async patch(id: NullableId, data: DisbursmentPatch, _params?: ServiceParams): Promise<Disbursment> {
    throw new MethodNotAllowed()
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<Disbursment> {
    throw new MethodNotAllowed()
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
