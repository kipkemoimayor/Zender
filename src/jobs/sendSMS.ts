import { Application } from '../declarations'
import { SMS } from '../hooks/payments/sms'

const schedule = require('node-schedule')

export const smsJob = (app: Application) => {
  const job = schedule.scheduleJob('*/5 * * * *', async function () {
    console.log('SMS SCHEDULER RUNNING')
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
