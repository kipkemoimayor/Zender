import type { Application } from '../../declarations';
import { LockDeviceService } from './lock-device.class';
import { lockDevicePath } from './lock-device.shared';
export * from './lock-device.class';
export * from './lock-device.schema';
export declare const lockDevice: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [lockDevicePath]: LockDeviceService;
    }
}
