import type { Application } from '../../declarations';
import { DeviceService } from './device.class';
import { devicePath } from './device.shared';
export * from './device.class';
export * from './device.schema';
export declare const device: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [devicePath]: DeviceService;
    }
}
