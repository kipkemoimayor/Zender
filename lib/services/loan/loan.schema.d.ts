import type { Static } from '@feathersjs/typebox';
import type { HookContext } from '../../declarations';
export declare const loanSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    accountId: import("@sinclair/typebox").TString<string>;
    firstRepaymentDate: import("@sinclair/typebox").TAny;
    loanName: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TString<string>;
    mambuImei: import("@sinclair/typebox").TString<string>;
    clientId: import("@sinclair/typebox").TInteger;
    client: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        fullName: import("@sinclair/typebox").TString<string>;
        idNumber: import("@sinclair/typebox").TString<string>;
        emailAddress: import("@sinclair/typebox").TString<"email">;
        phoneNumber: import("@sinclair/typebox").TString<string>;
        location: import("@sinclair/typebox").TString<string>;
        status: import("@sinclair/typebox").TNumber;
        createdAt: import("@sinclair/typebox").TString<string>;
        updatedAt: import("@sinclair/typebox").TString<string>;
    }>>;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
    retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    encodedKey: import("@sinclair/typebox").TString<string>;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
    daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    paid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    paidOff: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    daysToNextInstallment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export type Loan = Static<typeof loanSchema>;
export declare const loanValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const loanResolver: import("@feathersjs/schema").Resolver<{
    retry?: number | undefined;
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: string | undefined;
    daysRemaining?: number | undefined;
    paid?: boolean | undefined;
    paidOff?: boolean | undefined;
    daysToNextInstallment?: number | undefined;
    id: number;
    status: string;
    client: {
        location: string;
        id: number;
        status: number;
        fullName: string;
        idNumber: string;
        emailAddress: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    accountId: string;
    firstRepaymentDate: any;
    loanName: string;
    mambuImei: string;
    clientId: number;
    encodedKey: string;
}, HookContext>;
export declare const loanExternalResolver: import("@feathersjs/schema").Resolver<{
    retry?: number | undefined;
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: string | undefined;
    daysRemaining?: number | undefined;
    paid?: boolean | undefined;
    paidOff?: boolean | undefined;
    daysToNextInstallment?: number | undefined;
    id: number;
    status: string;
    client: {
        location: string;
        id: number;
        status: number;
        fullName: string;
        idNumber: string;
        emailAddress: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    accountId: string;
    firstRepaymentDate: any;
    loanName: string;
    mambuImei: string;
    clientId: number;
    encodedKey: string;
}, HookContext>;
export declare const loanDataSchema: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    accountId: import("@sinclair/typebox").TString<string>;
    firstRepaymentDate: import("@sinclair/typebox").TAny;
    loanName: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TString<string>;
    mambuImei: import("@sinclair/typebox").TString<string>;
    clientId: import("@sinclair/typebox").TInteger;
    client: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        fullName: import("@sinclair/typebox").TString<string>;
        idNumber: import("@sinclair/typebox").TString<string>;
        emailAddress: import("@sinclair/typebox").TString<"email">;
        phoneNumber: import("@sinclair/typebox").TString<string>;
        location: import("@sinclair/typebox").TString<string>;
        status: import("@sinclair/typebox").TNumber;
        createdAt: import("@sinclair/typebox").TString<string>;
        updatedAt: import("@sinclair/typebox").TString<string>;
    }>>;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
    retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    encodedKey: import("@sinclair/typebox").TString<string>;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
    daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    paid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    paidOff: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    daysToNextInstallment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>, ["accountId", "firstRepaymentDate", "loanName", "status", "mambuImei", "clientId", "encodedKey"]>;
export type LoanData = Static<typeof loanDataSchema>;
export declare const loanDataValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const loanDataResolver: import("@feathersjs/schema").Resolver<{
    retry?: number | undefined;
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: string | undefined;
    daysRemaining?: number | undefined;
    paid?: boolean | undefined;
    paidOff?: boolean | undefined;
    daysToNextInstallment?: number | undefined;
    id: number;
    status: string;
    client: {
        location: string;
        id: number;
        status: number;
        fullName: string;
        idNumber: string;
        emailAddress: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    accountId: string;
    firstRepaymentDate: any;
    loanName: string;
    mambuImei: string;
    clientId: number;
    encodedKey: string;
}, HookContext>;
export declare const loanPatchSchema: import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    accountId: import("@sinclair/typebox").TString<string>;
    firstRepaymentDate: import("@sinclair/typebox").TAny;
    loanName: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TString<string>;
    mambuImei: import("@sinclair/typebox").TString<string>;
    clientId: import("@sinclair/typebox").TInteger;
    client: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        fullName: import("@sinclair/typebox").TString<string>;
        idNumber: import("@sinclair/typebox").TString<string>;
        emailAddress: import("@sinclair/typebox").TString<"email">;
        phoneNumber: import("@sinclair/typebox").TString<string>;
        location: import("@sinclair/typebox").TString<string>;
        status: import("@sinclair/typebox").TNumber;
        createdAt: import("@sinclair/typebox").TString<string>;
        updatedAt: import("@sinclair/typebox").TString<string>;
    }>>;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
    retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    encodedKey: import("@sinclair/typebox").TString<string>;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
    daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    paid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    paidOff: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    daysToNextInstallment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>>;
export type LoanPatch = Static<typeof loanPatchSchema>;
export declare const loanPatchValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const loanPatchResolver: import("@feathersjs/schema").Resolver<{
    retry?: number | undefined;
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: string | undefined;
    daysRemaining?: number | undefined;
    paid?: boolean | undefined;
    paidOff?: boolean | undefined;
    daysToNextInstallment?: number | undefined;
    id: number;
    status: string;
    client: {
        location: string;
        id: number;
        status: number;
        fullName: string;
        idNumber: string;
        emailAddress: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    accountId: string;
    firstRepaymentDate: any;
    loanName: string;
    mambuImei: string;
    clientId: number;
    encodedKey: string;
}, HookContext>;
export declare const loanQueryProperties: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    accountId: import("@sinclair/typebox").TString<string>;
    firstRepaymentDate: import("@sinclair/typebox").TAny;
    loanName: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TString<string>;
    mambuImei: import("@sinclair/typebox").TString<string>;
    clientId: import("@sinclair/typebox").TInteger;
    client: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        fullName: import("@sinclair/typebox").TString<string>;
        idNumber: import("@sinclair/typebox").TString<string>;
        emailAddress: import("@sinclair/typebox").TString<"email">;
        phoneNumber: import("@sinclair/typebox").TString<string>;
        location: import("@sinclair/typebox").TString<string>;
        status: import("@sinclair/typebox").TNumber;
        createdAt: import("@sinclair/typebox").TString<string>;
        updatedAt: import("@sinclair/typebox").TString<string>;
    }>>;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
    retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    encodedKey: import("@sinclair/typebox").TString<string>;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
    daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    paid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    paidOff: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    daysToNextInstallment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>, ["id", "status", "retry", "daysRemaining", "mambuSynced", "mambuSyncedAt"]>;
export declare const loanQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    $limit: import("@sinclair/typebox").TNumber;
    $skip: import("@sinclair/typebox").TNumber;
    $sort: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    $select: import("@sinclair/typebox").TUnsafe<("id" | "status" | "retry" | "mambuSynced" | "mambuSyncedAt" | "daysRemaining")[]>;
    $and: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TNumber;
            $gte: import("@sinclair/typebox").TNumber;
            $lt: import("@sinclair/typebox").TNumber;
            $lte: import("@sinclair/typebox").TNumber;
            $ne: import("@sinclair/typebox").TNumber;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TString<string>;
            $gte: import("@sinclair/typebox").TString<string>;
            $lt: import("@sinclair/typebox").TString<string>;
            $lte: import("@sinclair/typebox").TString<string>;
            $ne: import("@sinclair/typebox").TString<string>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
    }>>, import("@sinclair/typebox").TObject<{
        $or: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TNumber;
                $gte: import("@sinclair/typebox").TNumber;
                $lt: import("@sinclair/typebox").TNumber;
                $lte: import("@sinclair/typebox").TNumber;
                $ne: import("@sinclair/typebox").TNumber;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TString<string>;
                $gte: import("@sinclair/typebox").TString<string>;
                $lt: import("@sinclair/typebox").TString<string>;
                $lte: import("@sinclair/typebox").TString<string>;
                $ne: import("@sinclair/typebox").TString<string>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
        }>>>;
    }>]>>;
    $or: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TNumber;
            $gte: import("@sinclair/typebox").TNumber;
            $lt: import("@sinclair/typebox").TNumber;
            $lte: import("@sinclair/typebox").TNumber;
            $ne: import("@sinclair/typebox").TNumber;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TString<string>;
            $gte: import("@sinclair/typebox").TString<string>;
            $lt: import("@sinclair/typebox").TString<string>;
            $lte: import("@sinclair/typebox").TString<string>;
            $ne: import("@sinclair/typebox").TString<string>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
    }>>>;
}>>, import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TNumber;
        $gte: import("@sinclair/typebox").TNumber;
        $lt: import("@sinclair/typebox").TNumber;
        $lte: import("@sinclair/typebox").TNumber;
        $ne: import("@sinclair/typebox").TNumber;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TString<string>;
        $gte: import("@sinclair/typebox").TString<string>;
        $lt: import("@sinclair/typebox").TString<string>;
        $lte: import("@sinclair/typebox").TString<string>;
        $ne: import("@sinclair/typebox").TString<string>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    retry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    daysRemaining: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
}>>]>, import("@sinclair/typebox").TObject<{}>]>;
export declare const loanResultResolver: import("@feathersjs/schema").Resolver<{
    retry?: number | undefined;
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: string | undefined;
    daysRemaining?: number | undefined;
    paid?: boolean | undefined;
    paidOff?: boolean | undefined;
    daysToNextInstallment?: number | undefined;
    id: number;
    status: string;
    client: {
        location: string;
        id: number;
        status: number;
        fullName: string;
        idNumber: string;
        emailAddress: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    accountId: string;
    firstRepaymentDate: any;
    loanName: string;
    mambuImei: string;
    clientId: number;
    encodedKey: string;
}, HookContext>;
export type LoanQuery = Static<typeof loanQuerySchema>;
export declare const loanQueryValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const loanQueryResolver: import("@feathersjs/schema").Resolver<Partial<{
    $limit: number;
    $skip: number;
    $sort: {
        id?: number | undefined;
        status?: number | undefined;
        retry?: number | undefined;
        mambuSynced?: number | undefined;
        mambuSyncedAt?: number | undefined;
        daysRemaining?: number | undefined;
    };
    $select: ("id" | "status" | "retry" | "mambuSynced" | "mambuSyncedAt" | "daysRemaining")[];
    $and: ({
        id?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        status?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        retry?: number | Partial<{
            $gt?: number | undefined;
            $gte?: number | undefined;
            $lt?: number | undefined;
            $lte?: number | undefined;
            $ne?: number | undefined;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        mambuSynced?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        mambuSyncedAt?: string | Partial<{
            $gt?: string | undefined;
            $gte?: string | undefined;
            $lt?: string | undefined;
            $lte?: string | undefined;
            $ne?: string | undefined;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        daysRemaining?: number | Partial<{
            $gt?: number | undefined;
            $gte?: number | undefined;
            $lt?: number | undefined;
            $lte?: number | undefined;
            $ne?: number | undefined;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
    } | {
        $or: {
            id?: number | Partial<{
                $gt: number;
                $gte: number;
                $lt: number;
                $lte: number;
                $ne: number;
                $in: number[];
                $nin: number[];
            } & {}> | undefined;
            status?: string | Partial<{
                $gt: string;
                $gte: string;
                $lt: string;
                $lte: string;
                $ne: string;
                $in: string[];
                $nin: string[];
            } & {}> | undefined;
            retry?: number | Partial<{
                $gt?: number | undefined;
                $gte?: number | undefined;
                $lt?: number | undefined;
                $lte?: number | undefined;
                $ne?: number | undefined;
                $in: number[];
                $nin: number[];
            } & {}> | undefined;
            mambuSynced?: boolean | Partial<{
                $gt?: boolean | undefined;
                $gte?: boolean | undefined;
                $lt?: boolean | undefined;
                $lte?: boolean | undefined;
                $ne?: boolean | undefined;
                $in: boolean[];
                $nin: boolean[];
            } & {}> | undefined;
            mambuSyncedAt?: string | Partial<{
                $gt?: string | undefined;
                $gte?: string | undefined;
                $lt?: string | undefined;
                $lte?: string | undefined;
                $ne?: string | undefined;
                $in: string[];
                $nin: string[];
            } & {}> | undefined;
            daysRemaining?: number | Partial<{
                $gt?: number | undefined;
                $gte?: number | undefined;
                $lt?: number | undefined;
                $lte?: number | undefined;
                $ne?: number | undefined;
                $in: number[];
                $nin: number[];
            } & {}> | undefined;
        }[];
    })[];
    $or: {
        id?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        status?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        retry?: number | Partial<{
            $gt?: number | undefined;
            $gte?: number | undefined;
            $lt?: number | undefined;
            $lte?: number | undefined;
            $ne?: number | undefined;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        mambuSynced?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        mambuSyncedAt?: string | Partial<{
            $gt?: string | undefined;
            $gte?: string | undefined;
            $lt?: string | undefined;
            $lte?: string | undefined;
            $ne?: string | undefined;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        daysRemaining?: number | Partial<{
            $gt?: number | undefined;
            $gte?: number | undefined;
            $lt?: number | undefined;
            $lte?: number | undefined;
            $ne?: number | undefined;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
    }[];
}> & {
    id?: number | Partial<{
        $gt: number;
        $gte: number;
        $lt: number;
        $lte: number;
        $ne: number;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
    status?: string | Partial<{
        $gt: string;
        $gte: string;
        $lt: string;
        $lte: string;
        $ne: string;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
    retry?: number | Partial<{
        $gt?: number | undefined;
        $gte?: number | undefined;
        $lt?: number | undefined;
        $lte?: number | undefined;
        $ne?: number | undefined;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
    mambuSynced?: boolean | Partial<{
        $gt?: boolean | undefined;
        $gte?: boolean | undefined;
        $lt?: boolean | undefined;
        $lte?: boolean | undefined;
        $ne?: boolean | undefined;
        $in: boolean[];
        $nin: boolean[];
    } & {}> | undefined;
    mambuSyncedAt?: string | Partial<{
        $gt?: string | undefined;
        $gte?: string | undefined;
        $lt?: string | undefined;
        $lte?: string | undefined;
        $ne?: string | undefined;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
    daysRemaining?: number | Partial<{
        $gt?: number | undefined;
        $gte?: number | undefined;
        $lt?: number | undefined;
        $lte?: number | undefined;
        $ne?: number | undefined;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
} & {}, HookContext>;
