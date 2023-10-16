import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery, SentSmsService } from './sent-sms.class';
export type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery };
export type SentSmsClientService = Pick<SentSmsService<Params<SentSmsQuery>>, (typeof sentSmsMethods)[number]>;
export declare const sentSmsPath = "sent-sms";
export declare const sentSmsMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const sentSmsClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [sentSmsPath]: SentSmsClientService;
    }
}
