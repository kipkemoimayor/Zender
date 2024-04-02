// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { SmsHistory, SmsHistoryData, SmsHistoryPatch, SmsHistoryQuery } from './sms-history.schema'

export type { SmsHistory, SmsHistoryData, SmsHistoryPatch, SmsHistoryQuery }

export interface SmsHistoryParams extends KnexAdapterParams<SmsHistoryQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SmsHistoryService<ServiceParams extends Params = SmsHistoryParams> extends KnexService<
  SmsHistory,
  SmsHistoryData,
  SmsHistoryParams,
  SmsHistoryPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'sms_history'
  }
}
