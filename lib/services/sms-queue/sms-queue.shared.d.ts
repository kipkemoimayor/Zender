import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery, SmsQueueService } from './sms-queue.class';
export type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery };
export type SmsQueueClientService = Pick<SmsQueueService<Params<SmsQueueQuery>>, (typeof smsQueueMethods)[number]>;
export declare const smsQueuePath = "sms-queue";
export declare const smsQueueMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const smsQueueClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [smsQueuePath]: SmsQueueClientService;
    }
}
