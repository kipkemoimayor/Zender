import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery } from './lock-device.schema';
export type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery };
export interface LockDeviceServiceOptions {
    app: Application;
}
export interface LockDeviceParams extends Params<LockDeviceQuery> {
}
export declare class LockDeviceService<ServiceParams extends LockDeviceParams = LockDeviceParams> implements ServiceInterface<LockDevice, LockDeviceData, ServiceParams, LockDevicePatch> {
    options: LockDeviceServiceOptions;
    constructor(options: LockDeviceServiceOptions);
    find(_params?: ServiceParams): Promise<LockDevice[]>;
    get(id: Id, _params?: ServiceParams): Promise<LockDevice>;
    create(data: LockDeviceData, params?: ServiceParams): Promise<LockDevice>;
    create(data: LockDeviceData[], params?: ServiceParams): Promise<LockDevice[]>;
    update(id: NullableId, data: LockDeviceData, _params?: ServiceParams): Promise<LockDevice>;
    patch(id: NullableId, data: LockDevicePatch, _params?: ServiceParams): Promise<LockDevice>;
    remove(id: NullableId, _params?: ServiceParams): Promise<LockDevice>;
}
export declare const getOptions: (app: Application) => {
    app: Application;
};
