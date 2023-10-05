// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery } from './sent-sms.schema'

export type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery }

export interface SentSmsParams extends KnexAdapterParams<SentSmsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SentSmsService<ServiceParams extends Params = SentSmsParams> extends KnexService<
  SentSms,
  SentSmsData,
  SentSmsParams,
  SentSmsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'sent_sms'
  }
}
