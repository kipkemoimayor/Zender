// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery } from './sms-queue.schema'

export type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery }

export interface SmsQueueParams extends KnexAdapterParams<SmsQueueQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SmsQueueService<ServiceParams extends Params = SmsQueueParams> extends KnexService<
  SmsQueue,
  SmsQueueData,
  SmsQueueParams,
  SmsQueuePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'sms_queue'
  }
}
