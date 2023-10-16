import type { Static } from '@feathersjs/typebox';
import type { HookContext } from '../../declarations';
export declare const sentSmsSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    message: import("@sinclair/typebox").TString<string>;
    destination: import("@sinclair/typebox").TString<string>;
    direction: import("@sinclair/typebox").TString<string>;
    sent: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
}>;
export type SentSms = Static<typeof sentSmsSchema>;
export declare const sentSmsValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const sentSmsResolver: import("@feathersjs/schema").Resolver<{
    message: string;
    id: number;
    direction: string;
    createdAt: string;
    updatedAt: string;
    destination: string;
    sent: boolean;
}, HookContext>;
export declare const sentSmsExternalResolver: import("@feathersjs/schema").Resolver<{
    message: string;
    id: number;
    direction: string;
    createdAt: string;
    updatedAt: string;
    destination: string;
    sent: boolean;
}, HookContext>;
export declare const sentSmsDataSchema: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    message: import("@sinclair/typebox").TString<string>;
    destination: import("@sinclair/typebox").TString<string>;
    direction: import("@sinclair/typebox").TString<string>;
    sent: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
}>, ["message", "destination", "direction", "sent"]>;
export type SentSmsData = Static<typeof sentSmsDataSchema>;
export declare const sentSmsDataValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const sentSmsDataResolver: import("@feathersjs/schema").Resolver<{
    message: string;
    id: number;
    direction: string;
    createdAt: string;
    updatedAt: string;
    destination: string;
    sent: boolean;
}, HookContext>;
export declare const sentSmsPatchSchema: import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    message: import("@sinclair/typebox").TString<string>;
    destination: import("@sinclair/typebox").TString<string>;
    direction: import("@sinclair/typebox").TString<string>;
    sent: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
}>>;
export type SentSmsPatch = Static<typeof sentSmsPatchSchema>;
export declare const sentSmsPatchValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const sentSmsPatchResolver: import("@feathersjs/schema").Resolver<{
    message: string;
    id: number;
    direction: string;
    createdAt: string;
    updatedAt: string;
    destination: string;
    sent: boolean;
}, HookContext>;
export declare const sentSmsQueryProperties: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    message: import("@sinclair/typebox").TString<string>;
    destination: import("@sinclair/typebox").TString<string>;
    direction: import("@sinclair/typebox").TString<string>;
    sent: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString<string>;
    updatedAt: import("@sinclair/typebox").TString<string>;
}>, ["id", "destination"]>;
export declare const sentSmsQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    $limit: import("@sinclair/typebox").TNumber;
    $skip: import("@sinclair/typebox").TNumber;
    $sort: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        destination: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    $select: import("@sinclair/typebox").TUnsafe<("id" | "destination")[]>;
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
        destination: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            destination: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        destination: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    destination: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
export type SentSmsQuery = Static<typeof sentSmsQuerySchema>;
export declare const sentSmsQueryValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const sentSmsQueryResolver: import("@feathersjs/schema").Resolver<Partial<{
    $limit: number;
    $skip: number;
    $sort: {
        id?: number | undefined;
        destination?: number | undefined;
    };
    $select: ("id" | "destination")[];
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
        destination?: string | Partial<{
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
            destination?: string | Partial<{
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
        destination?: string | Partial<{
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
    destination?: string | Partial<{
        $gt: string;
        $gte: string;
        $lt: string;
        $lte: string;
        $ne: string;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
} & {}, HookContext>;
