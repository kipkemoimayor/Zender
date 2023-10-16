import type { Application } from '../../declarations';
import { ReminderService } from './reminder.class';
import { reminderPath } from './reminder.shared';
export * from './reminder.class';
export * from './reminder.schema';
export declare const reminder: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [reminderPath]: ReminderService;
    }
}
