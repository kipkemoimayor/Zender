import { Device } from '../../client';
import { Application } from '../../declarations';
import { Due, ReminderDue } from './payment.dt';
export declare class DueReminder {
    private app;
    constructor(app: Application);
    getDeviceDueInOneDay(): Promise<{
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
    }[]>;
    getLoansDueInOneDay(loans: number[]): Promise<import("@feathersjs/feathers").Paginated<{
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
    }>>;
    createSms(data: any): Promise<{
        message: string;
        id: number;
        direction: string;
        createdAt: string;
        updatedAt: string;
        destination: string;
        sent: boolean;
    }>;
    getLoans(loans: number[]): Promise<import("@feathersjs/feathers").Paginated<{
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
    }>>;
    getReminders(query?: any): Promise<import("@feathersjs/feathers").Paginated<{
        scheduledAt?: string | undefined;
        type: number;
        message: string;
        id: number;
        device: {
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
        createdAt: string;
        updatedAt: string;
        deviceId: number;
        loanId: number;
        sent: boolean;
    }>>;
    setReminders(app: Application, device: Device): Promise<void>;
    mapData(data: any[], mapKey: string): any[];
    loanPaid(loanId: string): Promise<Due>;
    installmentPaid(loanId: string, device: Device): Promise<ReminderDue>;
    setLockDate(app: Application, device: Device, data: ReminderDue, locked?: boolean): void;
    handlePaymentAdjustment(device: Device): Promise<void>;
}
