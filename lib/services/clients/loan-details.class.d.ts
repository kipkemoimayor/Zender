import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery } from './loan-details.schema';
export type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery };
export interface LoanDetailsParams extends KnexAdapterParams<LoanDetailsQuery> {
}
export declare class LoanDetailsService<ServiceParams extends Params = LoanDetailsParams> extends KnexService<LoanDetails, LoanDetailsData, LoanDetailsParams, LoanDetailsPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
