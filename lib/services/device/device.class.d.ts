import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Device, DeviceData, DevicePatch, DeviceQuery } from './device.schema';
export type { Device, DeviceData, DevicePatch, DeviceQuery };
export interface DeviceParams extends KnexAdapterParams<DeviceQuery> {
}
export declare class DeviceService<ServiceParams extends Params = DeviceParams> extends KnexService<Device, DeviceData, DeviceParams, DevicePatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
