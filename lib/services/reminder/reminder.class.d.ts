import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Reminder, ReminderData, ReminderPatch, ReminderQuery } from './reminder.schema';
export type { Reminder, ReminderData, ReminderPatch, ReminderQuery };
export interface ReminderParams extends KnexAdapterParams<ReminderQuery> {
}
export declare class ReminderService<ServiceParams extends Params = ReminderParams> extends KnexService<Reminder, ReminderData, ReminderParams, ReminderPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
