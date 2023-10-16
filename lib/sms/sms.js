"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const config_1 = __importDefault(require("./config"));
/**
 * Sends sms
 * @param {array} smsData
 * @returns sent sms response
 */
const sendSMS = async (smsData) => {
    try {
        const smsToSend = {
            source: '20460',
            message: smsData.message,
            destination: [
                {
                    number: smsData.destination
                }
            ]
        };
        // send sms
        const response = await config_1.default.createSMS(smsToSend);
        // map request to response data
        // const fullSms = mergeSmsReponse(response.data.messages, smsToSend.messages);
        return response;
    }
    catch (error) {
        return error;
    }
};
exports.sendSMS = sendSMS;
//# sourceMappingURL=sms.js.map