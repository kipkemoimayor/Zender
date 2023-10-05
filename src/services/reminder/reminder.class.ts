// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Reminder, ReminderData, ReminderPatch, ReminderQuery } from './reminder.schema'

export type { Reminder, ReminderData, ReminderPatch, ReminderQuery }

export interface ReminderParams extends KnexAdapterParams<ReminderQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ReminderService<ServiceParams extends Params = ReminderParams> extends KnexService<
  Reminder,
  ReminderData,
  ReminderParams,
  ReminderPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'reminder'
  }
}
