import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery } from './sms-queue.schema';
export type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery };
export interface SmsQueueParams extends KnexAdapterParams<SmsQueueQuery> {
}
export declare class SmsQueueService<ServiceParams extends Params = SmsQueueParams> extends KnexService<SmsQueue, SmsQueueData, SmsQueueParams, SmsQueuePatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
