import type { Application } from '../../declarations';
import { DisbursmentService } from './disbursment.class';
import { disbursmentPath } from './disbursment.shared';
export * from './disbursment.class';
export * from './disbursment.schema';
export declare const disbursment: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [disbursmentPath]: DisbursmentService;
    }
}
