import { Application } from '../declarations'
import { SMS } from '../hooks/payments/sms'

const schedule = require('node-schedule')

export const smsJob = (app: Application) => {
  const job = schedule.scheduleJob('*/1 * * * *', async function () {
    console.log('sms scheduler running')
    const smsClass = new SMS(app)
    const queuedSMS = await smsClass.getQueuedSms()

    if (!queuedSMS.length) {
      return
    }

    queuedSMS.forEach((sms) => {
      //send sms
      smsClass.sendSms({ destination: sms.destination, message: sms.message }).then(() => {
        // move sms
        smsClass.moveSentSms(sms)
      })
    })
    try {
    } catch (error) {
      console.log(error)
    }
  })
}
