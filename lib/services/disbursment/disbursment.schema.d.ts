import type { Static } from '@feathersjs/typebox';
import type { HookContext } from '../../declarations';
export declare const disbursmentSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    loanAccountId: import("@sinclair/typebox").TString<string>;
}>;
export type Disbursment = Static<typeof disbursmentSchema>;
export declare const disbursmentValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const disbursmentResolver: import("@feathersjs/schema").Resolver<{
    id: number;
    imei: string;
    loanAccountId: string;
}, HookContext>;
export declare const disbursmentExternalResolver: import("@feathersjs/schema").Resolver<{
    id: number;
    imei: string;
    loanAccountId: string;
}, HookContext>;
export declare const disbursmentDataSchema: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    loanAccountId: import("@sinclair/typebox").TString<string>;
}>, ["imei", "loanAccountId"]>;
export type DisbursmentData = Static<typeof disbursmentDataSchema>;
export declare const disbursmentDataValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const disbursmentDataResolver: import("@feathersjs/schema").Resolver<{
    id: number;
    imei: string;
    loanAccountId: string;
}, HookContext>;
export declare const disbursmentPatchSchema: import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    loanAccountId: import("@sinclair/typebox").TString<string>;
}>>;
export type DisbursmentPatch = Static<typeof disbursmentPatchSchema>;
export declare const disbursmentPatchValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const disbursmentPatchResolver: import("@feathersjs/schema").Resolver<{
    id: number;
    imei: string;
    loanAccountId: string;
}, HookContext>;
export declare const disbursmentQueryProperties: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    loanAccountId: import("@sinclair/typebox").TString<string>;
}>, ["id", "loanAccountId"]>;
export declare const disbursmentQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    $limit: import("@sinclair/typebox").TNumber;
    $skip: import("@sinclair/typebox").TNumber;
    $sort: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        loanAccountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    $select: import("@sinclair/typebox").TUnsafe<("id" | "loanAccountId")[]>;
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
        loanAccountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            loanAccountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        loanAccountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    loanAccountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
}>>]>, import("@sinclair/typebox").TObject<{}>]>;
export type DisbursmentQuery = Static<typeof disbursmentQuerySchema>;
export declare const disbursmentQueryValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const disbursmentQueryResolver: import("@feathersjs/schema").Resolver<Partial<{
    $limit: number;
    $skip: number;
    $sort: {
        id?: number | undefined;
        loanAccountId?: number | undefined;
    };
    $select: ("id" | "loanAccountId")[];
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
        loanAccountId?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
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
            loanAccountId?: string | Partial<{
                $gt: string;
                $gte: string;
                $lt: string;
                $lte: string;
                $ne: string;
                $in: string[];
                $nin: string[];
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
        loanAccountId?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
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
    loanAccountId?: string | Partial<{
        $gt: string;
        $gte: string;
        $lt: string;
        $lte: string;
        $ne: string;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
} & {}, HookContext>;
