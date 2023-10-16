import type { Application } from '../../declarations';
import { SmsQueueService } from './sms-queue.class';
import { smsQueuePath } from './sms-queue.shared';
export * from './sms-queue.class';
export * from './sms-queue.schema';
export declare const smsQueue: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [smsQueuePath]: SmsQueueService;
    }
}
