import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery, LoanDetailsService } from './loan-details.class';
export type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery };
export type LoanDetailsClientService = Pick<LoanDetailsService<Params<LoanDetailsQuery>>, (typeof loanDetailsMethods)[number]>;
export declare const loanDetailsPath = "client";
export declare const loanDetailsMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const loanDetailsClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [loanDetailsPath]: LoanDetailsClientService;
    }
}
