export interface Axconfig {
    baseUrl: string | undefined;
    apiKey?: string;
}
export interface IReminder {
    message: string;
    deviceIds: number[];
}
export interface ScheduleData {
    name: string;
    message: string;
    scheduleFrom: string;
    scheduleTo: string;
    scheduledAt: string;
    deviceIds: number[];
}
export interface Query {
    ['fields']: string;
}
export declare class NuovoApi {
    private config;
    private axios;
    constructor();
    getAllDevices(query: string): Promise<{
        total_count: number;
        devices: any[];
    }>;
    getDevice(deviceId: any): Promise<any>;
    updateCustomer(deviceId: string, data: any): Promise<any>;
    lockDevice(deviceIds: number[]): Promise<any>;
    unlockDevice(deviceIds: number[]): Promise<any>;
    scheduleDeviceLock(deviceId: number[], lockDate: string): Promise<any>;
    setReminder(data: IReminder): Promise<any>;
}
