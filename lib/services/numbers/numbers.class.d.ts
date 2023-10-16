import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Numbers, NumbersData, NumbersPatch, NumbersQuery } from './numbers.schema';
export type { Numbers, NumbersData, NumbersPatch, NumbersQuery };
export interface NumbersParams extends KnexAdapterParams<NumbersQuery> {
}
export declare class NumbersService<ServiceParams extends Params = NumbersParams> extends KnexService<Numbers, NumbersData, NumbersParams, NumbersPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
