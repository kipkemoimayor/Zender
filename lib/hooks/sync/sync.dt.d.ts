import { Device, Loan } from '../../client';
import { Paginated } from '@feathersjs/feathers';
import { Application } from '../../declarations';
export interface Sync {
    /**
     * checks if data is already syced with mambu an nuovo pay
     * @param app Application instance
     * @returns boolean true or false
     */
    isSynced: (app: Device) => boolean;
    /**
     * Checks if device data is fully synced between mambu and Nuovo pay
     * @param app application instance
     * @returns booean true or false
     */
    isFullSynced?: (app: Application) => boolean;
    /**
     * Fetching device that are yet to be synced
     * @param app Application instance
     * @returns anna array of Devices
     */
    getPendingDevices: (app: Application) => Promise<Paginated<Device>>;
    /**
     * Checks if mambu device imei has been updated then updates nuovo device with customer details
     * @param app Application instance
     * @param device device details
     * @returns void
     */
    syncMambuData: (app: Application, device: Device) => void;
    /**
     * Checks if nuovo device and udates mambu loan details with device details from nuovo
     * @param app Application instance
     * @param device device details
     * @returns void
     */
    syncNuovoData: (app: Application, device: Device) => void;
    /**
     * proccess mambu-nuovo sync
     * @param app Application instance
     * @param deviceId local device id
     * @param clientId  client id
     * @returns void
     */
    processMambuSync: (app: Application, device: Device) => void;
    /**
     * proccess nuovo-mambu sync
     * @param app Application instance
     * @param deviceId local device id
     * @param clientId  client id
     * @returns void
     */
    proccessNuovoSync: (app: Application, device: any, deviceId: number, loanAccountId: string) => void;
    /**
     * Searches for failed loans that failed to finish proccess of creating client device
     * @param app App instance
     * @returns an array of Laon details
     */
    getFailedDevices: (app: Application) => Promise<Paginated<Loan>>;
    /**
     * Checks mambu for imei field and searches it on nuovo the creates a client device
     * @param app App instance
     * @param loan stored loan details
     * @returns void
     */
    searchAndCreateDevice: (app: Application, loan: Loan) => void;
    syncLockDates: (app: Application, device: Device) => void;
}
