import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Loan, LoanData, LoanPatch, LoanQuery } from './loan.schema';
export type { Loan, LoanData, LoanPatch, LoanQuery };
export interface LoanParams extends KnexAdapterParams<LoanQuery> {
}
export declare class LoanService<ServiceParams extends Params = LoanParams> extends KnexService<Loan, LoanData, LoanParams, LoanPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
