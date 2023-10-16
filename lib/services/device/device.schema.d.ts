import type { Static } from '@feathersjs/typebox';
import type { HookContext } from '../../declarations';
export declare const deviceSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TAny;
    loanId: import("@sinclair/typebox").TInteger;
    loan: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
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
    createdAt: import("@sinclair/typebox").TString<"date-time">;
    updatedAt: import("@sinclair/typebox").TString<"date-time">;
    serialNo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    make: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    model: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    locked: import("@sinclair/typebox").TBoolean;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    nuovoSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nuovoSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
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
    nuovoDeviceId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockDateSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    initialLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lastConnectedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export type Device = Static<typeof deviceSchema>;
export declare const deviceValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const deviceResolver: import("@feathersjs/schema").Resolver<{
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: any;
    serialNo?: any;
    make?: any;
    model?: any;
    nuovoSynced?: boolean | undefined;
    nuovoSyncedAt?: any;
    nuovoDeviceId?: any;
    lockReady?: boolean | undefined;
    lockReadyScheduleAt?: any;
    lockDateSynced?: boolean | undefined;
    nextLockDate?: any;
    initialLockDate?: any;
    lastConnectedAt?: any;
    reminderSet?: boolean | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | undefined;
    id: number;
    status: any;
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
    loan: {
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
    };
    imei: string;
    createdAt: string;
    updatedAt: string;
    loanId: number;
    clientId: number;
    locked: boolean;
}, HookContext>;
export declare const deviceExternalResolver: import("@feathersjs/schema").Resolver<{
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: any;
    serialNo?: any;
    make?: any;
    model?: any;
    nuovoSynced?: boolean | undefined;
    nuovoSyncedAt?: any;
    nuovoDeviceId?: any;
    lockReady?: boolean | undefined;
    lockReadyScheduleAt?: any;
    lockDateSynced?: boolean | undefined;
    nextLockDate?: any;
    initialLockDate?: any;
    lastConnectedAt?: any;
    reminderSet?: boolean | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | undefined;
    id: number;
    status: any;
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
    loan: {
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
    };
    imei: string;
    createdAt: string;
    updatedAt: string;
    loanId: number;
    clientId: number;
    locked: boolean;
}, HookContext>;
export declare const deviceDataSchema: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TAny;
    loanId: import("@sinclair/typebox").TInteger;
    loan: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
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
    createdAt: import("@sinclair/typebox").TString<"date-time">;
    updatedAt: import("@sinclair/typebox").TString<"date-time">;
    serialNo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    make: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    model: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    locked: import("@sinclair/typebox").TBoolean;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    nuovoSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nuovoSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
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
    nuovoDeviceId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockDateSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    initialLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lastConnectedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>, ["imei", "status", "loanId", "serialNo", "make", "model", "locked", "clientId", "nuovoDeviceId", "lockReady", "lockReadyScheduleAt", "lockDateSynced", "nextLockDate", "initialLockDate", "lastConnectedAt", "scheduleNumber"]>;
export type DeviceData = Static<typeof deviceDataSchema>;
export declare const deviceDataValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const deviceDataResolver: import("@feathersjs/schema").Resolver<{
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: any;
    serialNo?: any;
    make?: any;
    model?: any;
    nuovoSynced?: boolean | undefined;
    nuovoSyncedAt?: any;
    nuovoDeviceId?: any;
    lockReady?: boolean | undefined;
    lockReadyScheduleAt?: any;
    lockDateSynced?: boolean | undefined;
    nextLockDate?: any;
    initialLockDate?: any;
    lastConnectedAt?: any;
    reminderSet?: boolean | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | undefined;
    id: number;
    status: any;
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
    loan: {
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
    };
    imei: string;
    createdAt: string;
    updatedAt: string;
    loanId: number;
    clientId: number;
    locked: boolean;
}, HookContext>;
export declare const devicePatchSchema: import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TAny;
    loanId: import("@sinclair/typebox").TInteger;
    loan: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
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
    createdAt: import("@sinclair/typebox").TString<"date-time">;
    updatedAt: import("@sinclair/typebox").TString<"date-time">;
    serialNo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    make: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    model: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    locked: import("@sinclair/typebox").TBoolean;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    nuovoSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nuovoSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
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
    nuovoDeviceId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockDateSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    initialLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lastConnectedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>>;
export type DevicePatch = Static<typeof devicePatchSchema>;
export declare const devicePatchValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const devicePatchResolver: import("@feathersjs/schema").Resolver<{
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: any;
    serialNo?: any;
    make?: any;
    model?: any;
    nuovoSynced?: boolean | undefined;
    nuovoSyncedAt?: any;
    nuovoDeviceId?: any;
    lockReady?: boolean | undefined;
    lockReadyScheduleAt?: any;
    lockDateSynced?: boolean | undefined;
    nextLockDate?: any;
    initialLockDate?: any;
    lastConnectedAt?: any;
    reminderSet?: boolean | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | undefined;
    id: number;
    status: any;
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
    loan: {
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
    };
    imei: string;
    createdAt: string;
    updatedAt: string;
    loanId: number;
    clientId: number;
    locked: boolean;
}, HookContext>;
export declare const deviceQueryProperties: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    imei: import("@sinclair/typebox").TString<string>;
    status: import("@sinclair/typebox").TAny;
    loanId: import("@sinclair/typebox").TInteger;
    loan: import("@sinclair/typebox").TRef<import("@sinclair/typebox").TObject<{
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
    createdAt: import("@sinclair/typebox").TString<"date-time">;
    updatedAt: import("@sinclair/typebox").TString<"date-time">;
    serialNo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    make: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    model: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    locked: import("@sinclair/typebox").TBoolean;
    mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mambuSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    nuovoSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nuovoSyncedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
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
    nuovoDeviceId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lockDateSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    initialLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    lastConnectedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>, ["id", "imei", "status", "mambuSynced", "mambuSynced", "loanId", "lockReady", "lockReadyScheduleAt", "locked", "nextLockDate", "reminderSet", "reminderSetDate", "clientId", "scheduleNumber"]>;
export declare const deviceQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    $limit: import("@sinclair/typebox").TNumber;
    $skip: import("@sinclair/typebox").TNumber;
    $sort: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        imei: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        loanId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        clientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        mambuSynced: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        locked: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    $select: import("@sinclair/typebox").TUnsafe<("id" | "status" | "imei" | "loanId" | "clientId" | "mambuSynced" | "locked" | "lockReady" | "lockReadyScheduleAt" | "nextLockDate" | "reminderSet" | "reminderSetDate" | "scheduleNumber")[]>;
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
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TAny, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TAny;
            $gte: import("@sinclair/typebox").TAny;
            $lt: import("@sinclair/typebox").TAny;
            $lte: import("@sinclair/typebox").TAny;
            $ne: import("@sinclair/typebox").TAny;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        imei: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        loanId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TInteger;
            $gte: import("@sinclair/typebox").TInteger;
            $lt: import("@sinclair/typebox").TInteger;
            $lte: import("@sinclair/typebox").TInteger;
            $ne: import("@sinclair/typebox").TInteger;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        clientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TInteger;
            $gte: import("@sinclair/typebox").TInteger;
            $lt: import("@sinclair/typebox").TInteger;
            $lte: import("@sinclair/typebox").TInteger;
            $ne: import("@sinclair/typebox").TInteger;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
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
        locked: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TBoolean, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TBoolean;
            $gte: import("@sinclair/typebox").TBoolean;
            $lt: import("@sinclair/typebox").TBoolean;
            $lte: import("@sinclair/typebox").TBoolean;
            $ne: import("@sinclair/typebox").TBoolean;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TAny, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TAny;
                $gte: import("@sinclair/typebox").TAny;
                $lt: import("@sinclair/typebox").TAny;
                $lte: import("@sinclair/typebox").TAny;
                $ne: import("@sinclair/typebox").TAny;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            imei: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            loanId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TInteger;
                $gte: import("@sinclair/typebox").TInteger;
                $lt: import("@sinclair/typebox").TInteger;
                $lte: import("@sinclair/typebox").TInteger;
                $ne: import("@sinclair/typebox").TInteger;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            clientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TInteger;
                $gte: import("@sinclair/typebox").TInteger;
                $lt: import("@sinclair/typebox").TInteger;
                $lte: import("@sinclair/typebox").TInteger;
                $ne: import("@sinclair/typebox").TInteger;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
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
            locked: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TBoolean, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TBoolean;
                $gte: import("@sinclair/typebox").TBoolean;
                $lt: import("@sinclair/typebox").TBoolean;
                $lte: import("@sinclair/typebox").TBoolean;
                $ne: import("@sinclair/typebox").TBoolean;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
            reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TAny, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TAny;
            $gte: import("@sinclair/typebox").TAny;
            $lt: import("@sinclair/typebox").TAny;
            $lte: import("@sinclair/typebox").TAny;
            $ne: import("@sinclair/typebox").TAny;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        imei: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        loanId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TInteger;
            $gte: import("@sinclair/typebox").TInteger;
            $lt: import("@sinclair/typebox").TInteger;
            $lte: import("@sinclair/typebox").TInteger;
            $ne: import("@sinclair/typebox").TInteger;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        clientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TInteger;
            $gte: import("@sinclair/typebox").TInteger;
            $lt: import("@sinclair/typebox").TInteger;
            $lte: import("@sinclair/typebox").TInteger;
            $ne: import("@sinclair/typebox").TInteger;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
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
        locked: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TBoolean, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TBoolean;
            $gte: import("@sinclair/typebox").TBoolean;
            $lt: import("@sinclair/typebox").TBoolean;
            $lte: import("@sinclair/typebox").TBoolean;
            $ne: import("@sinclair/typebox").TBoolean;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
        reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TAny, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TAny;
        $gte: import("@sinclair/typebox").TAny;
        $lt: import("@sinclair/typebox").TAny;
        $lte: import("@sinclair/typebox").TAny;
        $ne: import("@sinclair/typebox").TAny;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    imei: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    loanId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TInteger;
        $gte: import("@sinclair/typebox").TInteger;
        $lt: import("@sinclair/typebox").TInteger;
        $lte: import("@sinclair/typebox").TInteger;
        $ne: import("@sinclair/typebox").TInteger;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    clientId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TInteger;
        $gte: import("@sinclair/typebox").TInteger;
        $lt: import("@sinclair/typebox").TInteger;
        $lte: import("@sinclair/typebox").TInteger;
        $ne: import("@sinclair/typebox").TInteger;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TInteger>;
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
    locked: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TBoolean, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TBoolean;
        $gte: import("@sinclair/typebox").TBoolean;
        $lt: import("@sinclair/typebox").TBoolean;
        $lte: import("@sinclair/typebox").TBoolean;
        $ne: import("@sinclair/typebox").TBoolean;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TBoolean>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    lockReady: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    lockReadyScheduleAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    nextLockDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    reminderSet: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    reminderSetDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    scheduleNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
}>>]>, import("@sinclair/typebox").TObject<{
    $or: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    $limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    $select: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    getStats: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>]>;
export declare const deviceResultResolver: import("@feathersjs/schema").Resolver<{
    mambuSynced?: boolean | undefined;
    mambuSyncedAt?: any;
    serialNo?: any;
    make?: any;
    model?: any;
    nuovoSynced?: boolean | undefined;
    nuovoSyncedAt?: any;
    nuovoDeviceId?: any;
    lockReady?: boolean | undefined;
    lockReadyScheduleAt?: any;
    lockDateSynced?: boolean | undefined;
    nextLockDate?: any;
    initialLockDate?: any;
    lastConnectedAt?: any;
    reminderSet?: boolean | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | undefined;
    id: number;
    status: any;
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
    loan: {
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
    };
    imei: string;
    createdAt: string;
    updatedAt: string;
    loanId: number;
    clientId: number;
    locked: boolean;
}, HookContext>;
export type DeviceQuery = Static<typeof deviceQuerySchema>;
export declare const deviceQueryValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const deviceQueryResolver: import("@feathersjs/schema").Resolver<Partial<{
    $limit: number;
    $skip: number;
    $sort: {
        id?: number | undefined;
        status?: number | undefined;
        imei?: number | undefined;
        loanId?: number | undefined;
        clientId?: number | undefined;
        mambuSynced?: number | undefined;
        locked?: number | undefined;
        lockReady?: number | undefined;
        lockReadyScheduleAt?: number | undefined;
        nextLockDate?: number | undefined;
        reminderSet?: number | undefined;
        reminderSetDate?: number | undefined;
        scheduleNumber?: number | undefined;
    };
    $select: ("id" | "status" | "imei" | "loanId" | "clientId" | "mambuSynced" | "locked" | "lockReady" | "lockReadyScheduleAt" | "nextLockDate" | "reminderSet" | "reminderSetDate" | "scheduleNumber")[];
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
        status?: any;
        imei?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        loanId?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        clientId?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
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
        locked?: boolean | Partial<{
            $gt: boolean;
            $gte: boolean;
            $lt: boolean;
            $lte: boolean;
            $ne: boolean;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        lockReady?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        lockReadyScheduleAt?: any;
        nextLockDate?: any;
        reminderSet?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        reminderSetDate?: any;
        scheduleNumber?: number | Partial<{
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
            status?: any;
            imei?: string | Partial<{
                $gt: string;
                $gte: string;
                $lt: string;
                $lte: string;
                $ne: string;
                $in: string[];
                $nin: string[];
            } & {}> | undefined;
            loanId?: number | Partial<{
                $gt: number;
                $gte: number;
                $lt: number;
                $lte: number;
                $ne: number;
                $in: number[];
                $nin: number[];
            } & {}> | undefined;
            clientId?: number | Partial<{
                $gt: number;
                $gte: number;
                $lt: number;
                $lte: number;
                $ne: number;
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
            locked?: boolean | Partial<{
                $gt: boolean;
                $gte: boolean;
                $lt: boolean;
                $lte: boolean;
                $ne: boolean;
                $in: boolean[];
                $nin: boolean[];
            } & {}> | undefined;
            lockReady?: boolean | Partial<{
                $gt?: boolean | undefined;
                $gte?: boolean | undefined;
                $lt?: boolean | undefined;
                $lte?: boolean | undefined;
                $ne?: boolean | undefined;
                $in: boolean[];
                $nin: boolean[];
            } & {}> | undefined;
            lockReadyScheduleAt?: any;
            nextLockDate?: any;
            reminderSet?: boolean | Partial<{
                $gt?: boolean | undefined;
                $gte?: boolean | undefined;
                $lt?: boolean | undefined;
                $lte?: boolean | undefined;
                $ne?: boolean | undefined;
                $in: boolean[];
                $nin: boolean[];
            } & {}> | undefined;
            reminderSetDate?: any;
            scheduleNumber?: number | Partial<{
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
        status?: any;
        imei?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        loanId?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        clientId?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
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
        locked?: boolean | Partial<{
            $gt: boolean;
            $gte: boolean;
            $lt: boolean;
            $lte: boolean;
            $ne: boolean;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        lockReady?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        lockReadyScheduleAt?: any;
        nextLockDate?: any;
        reminderSet?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
        reminderSetDate?: any;
        scheduleNumber?: number | Partial<{
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
    status?: any;
    imei?: string | Partial<{
        $gt: string;
        $gte: string;
        $lt: string;
        $lte: string;
        $ne: string;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
    loanId?: number | Partial<{
        $gt: number;
        $gte: number;
        $lt: number;
        $lte: number;
        $ne: number;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
    clientId?: number | Partial<{
        $gt: number;
        $gte: number;
        $lt: number;
        $lte: number;
        $ne: number;
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
    locked?: boolean | Partial<{
        $gt: boolean;
        $gte: boolean;
        $lt: boolean;
        $lte: boolean;
        $ne: boolean;
        $in: boolean[];
        $nin: boolean[];
    } & {}> | undefined;
    lockReady?: boolean | Partial<{
        $gt?: boolean | undefined;
        $gte?: boolean | undefined;
        $lt?: boolean | undefined;
        $lte?: boolean | undefined;
        $ne?: boolean | undefined;
        $in: boolean[];
        $nin: boolean[];
    } & {}> | undefined;
    lockReadyScheduleAt?: any;
    nextLockDate?: any;
    reminderSet?: boolean | Partial<{
        $gt?: boolean | undefined;
        $gte?: boolean | undefined;
        $lt?: boolean | undefined;
        $lte?: boolean | undefined;
        $ne?: boolean | undefined;
        $in: boolean[];
        $nin: boolean[];
    } & {}> | undefined;
    reminderSetDate?: any;
    scheduleNumber?: number | Partial<{
        $gt?: number | undefined;
        $gte?: number | undefined;
        $lt?: number | undefined;
        $lte?: number | undefined;
        $ne?: number | undefined;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
} & {
    $limit?: any;
    $select?: any;
    $or?: any;
    getStats?: any;
}, HookContext>;
