// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Numbers, NumbersData, NumbersPatch, NumbersQuery } from './numbers.schema'

export type { Numbers, NumbersData, NumbersPatch, NumbersQuery }

export interface NumbersParams extends KnexAdapterParams<NumbersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class NumbersService<ServiceParams extends Params = NumbersParams> extends KnexService<
  Numbers,
  NumbersData,
  NumbersParams,
  NumbersPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'numbers'
  }
}
