import { SentSms } from '../../client';
import { Application } from '../../declarations';
import { smsData } from '../../sms/sms';
export declare class SMS {
    private app;
    constructor(app: Application);
    getQueuedSms(): Promise<{
        message: string;
        id: number;
        direction: string;
        createdAt: string;
        updatedAt: string;
        destination: string;
        sent: boolean;
    }[]>;
    moveSentSms(sms: SentSms): void;
    deleteQueuedSms(id: number): Promise<{
        message: string;
        id: number;
        direction: string;
        createdAt: string;
        updatedAt: string;
        destination: string;
        sent: boolean;
    }>;
    sendSms(data: smsData): Promise<any>;
}
