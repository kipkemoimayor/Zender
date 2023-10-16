import type { Application } from '../../declarations';
import { AppEntryService } from './app-entry.class';
import { appEntryPath } from './app-entry.shared';
export * from './app-entry.class';
export declare const appEntry: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [appEntryPath]: AppEntryService;
    }
}
