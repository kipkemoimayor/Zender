import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Reminder, ReminderData, ReminderPatch, ReminderQuery, ReminderService } from './reminder.class';
export type { Reminder, ReminderData, ReminderPatch, ReminderQuery };
export type ReminderClientService = Pick<ReminderService<Params<ReminderQuery>>, (typeof reminderMethods)[number]>;
export declare const reminderPath = "reminder";
export declare const reminderMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const reminderClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [reminderPath]: ReminderClientService;
    }
}
