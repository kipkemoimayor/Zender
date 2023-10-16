import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Numbers, NumbersData, NumbersPatch, NumbersQuery, NumbersService } from './numbers.class';
export type { Numbers, NumbersData, NumbersPatch, NumbersQuery };
export type NumbersClientService = Pick<NumbersService<Params<NumbersQuery>>, (typeof numbersMethods)[number]>;
export declare const numbersPath = "numbers";
export declare const numbersMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const numbersClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [numbersPath]: NumbersClientService;
    }
}
