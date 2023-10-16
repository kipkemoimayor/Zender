import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery } from './sent-sms.schema';
export type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery };
export interface SentSmsParams extends KnexAdapterParams<SentSmsQuery> {
}
export declare class SentSmsService<ServiceParams extends Params = SentSmsParams> extends KnexService<SentSms, SentSmsData, SentSmsParams, SentSmsPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
