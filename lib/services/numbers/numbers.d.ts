import type { Application } from '../../declarations';
import { NumbersService } from './numbers.class';
import { numbersPath } from './numbers.shared';
export * from './numbers.class';
export * from './numbers.schema';
export declare const numbers: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [numbersPath]: NumbersService;
    }
}
