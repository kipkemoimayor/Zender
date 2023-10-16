import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
type AppEntry = any;
type AppEntryData = any;
type AppEntryPatch = any;
type AppEntryQuery = any;
export type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery };
export interface AppEntryServiceOptions {
    app: Application;
}
export interface AppEntryParams extends Params<AppEntryQuery> {
}
export declare class AppEntryService<ServiceParams extends AppEntryParams = AppEntryParams> implements ServiceInterface<AppEntry, AppEntryData, ServiceParams, AppEntryPatch> {
    options: AppEntryServiceOptions;
    constructor(options: AppEntryServiceOptions);
    find(_params?: ServiceParams): Promise<AppEntry[]>;
    get(id: Id, _params?: ServiceParams): Promise<AppEntry>;
    create(data: AppEntryData, params?: ServiceParams): Promise<AppEntry>;
    create(data: AppEntryData[], params?: ServiceParams): Promise<AppEntry[]>;
    update(id: NullableId, data: AppEntryData, _params?: ServiceParams): Promise<AppEntry>;
    patch(id: NullableId, data: AppEntryPatch, _params?: ServiceParams): Promise<AppEntry>;
    remove(id: NullableId, _params?: ServiceParams): Promise<AppEntry>;
}
export declare const getOptions: (app: Application) => {
    app: Application;
};
