import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Device, DeviceData, DevicePatch, DeviceQuery, DeviceService } from './device.class';
export type { Device, DeviceData, DevicePatch, DeviceQuery };
export type DeviceClientService = Pick<DeviceService<Params<DeviceQuery>>, (typeof deviceMethods)[number]>;
export declare const devicePath = "device";
export declare const deviceMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const deviceClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [devicePath]: DeviceClientService;
    }
}
