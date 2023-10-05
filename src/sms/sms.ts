import sms from './config'
// const mergeSmsReponse = require('../../utils/mergeSmsResponse');

export interface smsData {
  message: string
  destination: string
}
/**
 * Sends sms
 * @param {array} smsData
 * @returns sent sms response
 */
export const sendSMS = async (smsData: smsData) => {
  try {
    const smsToSend = {
      source: '20460',
      message: smsData.message,
      destination: [
        {
          number: smsData.destination
        }
      ]
    }

    // send sms
    const response = await sms.createSMS(smsToSend)
    // map request to response data
    // const fullSms = mergeSmsReponse(response.data.messages, smsToSend.messages);
    return response
  } catch (error) {
    return error
  }
}
