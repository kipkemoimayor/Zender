import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery } from './device-lock-history.schema';
export type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery };
export interface DeviceLockHistoryParams extends KnexAdapterParams<DeviceLockHistoryQuery> {
}
export declare class DeviceLockHistoryService<ServiceParams extends Params = DeviceLockHistoryParams> extends KnexService<DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryParams, DeviceLockHistoryPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
