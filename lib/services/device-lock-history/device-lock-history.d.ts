import type { Application } from '../../declarations';
import { DeviceLockHistoryService } from './device-lock-history.class';
import { deviceLockHistoryPath } from './device-lock-history.shared';
export * from './device-lock-history.class';
export * from './device-lock-history.schema';
export declare const deviceLockHistory: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [deviceLockHistoryPath]: DeviceLockHistoryService;
    }
}
