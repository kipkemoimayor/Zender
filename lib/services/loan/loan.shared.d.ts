import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Loan, LoanData, LoanPatch, LoanQuery, LoanService } from './loan.class';
export type { Loan, LoanData, LoanPatch, LoanQuery };
export type LoanClientService = Pick<LoanService<Params<LoanQuery>>, (typeof loanMethods)[number]>;
export declare const loanPath = "loan";
export declare const loanMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const loanClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [loanPath]: LoanClientService;
    }
}
