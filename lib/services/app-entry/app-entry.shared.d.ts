import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery, AppEntryService } from './app-entry.class';
export type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery };
export type AppEntryClientService = Pick<AppEntryService<Params<AppEntryQuery>>, (typeof appEntryMethods)[number]>;
export declare const appEntryPath = "app-entry";
export declare const appEntryMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const appEntryClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [appEntryPath]: AppEntryClientService;
    }
}
