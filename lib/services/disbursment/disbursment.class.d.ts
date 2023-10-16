import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery } from './disbursment.schema';
export type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery };
export interface DisbursmentServiceOptions {
    app: Application;
}
export interface DisbursmentParams extends Params<DisbursmentQuery> {
}
export declare class DisbursmentService<ServiceParams extends DisbursmentParams = DisbursmentParams> implements ServiceInterface<Disbursment, DisbursmentData, ServiceParams, DisbursmentPatch> {
    options: DisbursmentServiceOptions;
    constructor(options: DisbursmentServiceOptions);
    find(_params?: ServiceParams): Promise<Disbursment[]>;
    get(id: Id, _params?: ServiceParams): Promise<Disbursment>;
    create(data: DisbursmentData, params?: ServiceParams): Promise<Disbursment>;
    create(data: DisbursmentData[], params?: ServiceParams): Promise<Disbursment[]>;
    update(id: NullableId, data: DisbursmentData, _params?: ServiceParams): Promise<Disbursment>;
    patch(id: NullableId, data: DisbursmentPatch, _params?: ServiceParams): Promise<Disbursment>;
    remove(id: NullableId, _params?: ServiceParams): Promise<Disbursment>;
}
export declare const getOptions: (app: Application) => {
    app: Application;
};
