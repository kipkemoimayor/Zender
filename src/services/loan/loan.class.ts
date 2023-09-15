// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Loan, LoanData, LoanPatch, LoanQuery } from './loan.schema'

export type { Loan, LoanData, LoanPatch, LoanQuery }

export interface LoanParams extends KnexAdapterParams<LoanQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LoanService<ServiceParams extends Params = LoanParams> extends KnexService<
  Loan,
  LoanData,
  LoanParams,
  LoanPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'loan'
  }
}
