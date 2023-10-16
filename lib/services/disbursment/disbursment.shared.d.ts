import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery, DisbursmentService } from './disbursment.class';
export type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery };
export type DisbursmentClientService = Pick<DisbursmentService<Params<DisbursmentQuery>>, (typeof disbursmentMethods)[number]>;
export declare const disbursmentPath = "disbursment";
export declare const disbursmentMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const disbursmentClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [disbursmentPath]: DisbursmentClientService;
    }
}
