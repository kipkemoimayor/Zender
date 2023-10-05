import { SentSms } from '../../client'
import { Application } from '../../declarations'
import { sendSMS, smsData } from '../../sms/sms'

export class SMS {
  constructor(private app: Application) {}

  getQueuedSms() {
    return this.app.service('sms-queue').find({
      query: {
        sent: false,
        direction: 'OUT'
      },
      paginate: false
    })
  }

  moveSentSms(sms: SentSms) {
    const copy = { message: sms.message, sent: true, destination: sms.destination, direction: 'OUT' }
    this.app
      .service('sent-sms')
      .create({ ...copy, sent: true })
      .then(() => {
        // delete from qeueu
        this.app.service('sms-queue').remove(sms.id)
      })
  }

  deleteQueuedSms(id: number) {
    return this.app.service('sms-queue').remove(id)
  }

  sendSms(data: smsData) {
    return sendSMS(data)
  }
}
