import type { Application } from '../../declarations';
import { SentSmsService } from './sent-sms.class';
import { sentSmsPath } from './sent-sms.shared';
export * from './sent-sms.class';
export * from './sent-sms.schema';
export declare const sentSms: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [sentSmsPath]: SentSmsService;
    }
}
