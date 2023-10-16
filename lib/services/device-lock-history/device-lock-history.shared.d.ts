import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery, DeviceLockHistoryService } from './device-lock-history.class';
export type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery };
export type DeviceLockHistoryClientService = Pick<DeviceLockHistoryService<Params<DeviceLockHistoryQuery>>, (typeof deviceLockHistoryMethods)[number]>;
export declare const deviceLockHistoryPath = "device-lock-history";
export declare const deviceLockHistoryMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const deviceLockHistoryClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [deviceLockHistoryPath]: DeviceLockHistoryClientService;
    }
}
