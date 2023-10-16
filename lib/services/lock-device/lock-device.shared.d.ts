import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery, LockDeviceService } from './lock-device.class';
export type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery };
export type LockDeviceClientService = Pick<LockDeviceService<Params<LockDeviceQuery>>, (typeof lockDeviceMethods)[number]>;
export declare const lockDevicePath = "unlock-device";
export declare const lockDeviceMethods: readonly ["create"];
export declare const lockDeviceClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [lockDevicePath]: LockDeviceClientService;
    }
}
