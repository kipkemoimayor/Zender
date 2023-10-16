import type { Application } from '../../declarations';
import { LoanDetailsService } from './loan-details.class';
import { loanDetailsPath } from './loan-details.shared';
export * from './loan-details.class';
export * from './loan-details.schema';
export declare const loanDetails: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [loanDetailsPath]: LoanDetailsService;
    }
}
