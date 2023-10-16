export interface smsData {
    message: string;
    destination: string;
}
/**
 * Sends sms
 * @param {array} smsData
 * @returns sent sms response
 */
export declare const sendSMS: (smsData: smsData) => Promise<any>;
