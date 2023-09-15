// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery } from './loan-details.schema'

export type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery }

export interface LoanDetailsParams extends KnexAdapterParams<LoanDetailsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LoanDetailsService<ServiceParams extends Params = LoanDetailsParams> extends KnexService<
  LoanDetails,
  LoanDetailsData,
  LoanDetailsParams,
  LoanDetailsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'client'
  }
}
