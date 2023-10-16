import type { Application } from '../../declarations';
import { LoanService } from './loan.class';
import { loanPath } from './loan.shared';
export * from './loan.class';
export * from './loan.schema';
export declare const loan: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [loanPath]: LoanService;
    }
}
