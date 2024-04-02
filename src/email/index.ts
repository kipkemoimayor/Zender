import nodemailer from 'nodemailer'
import { Email, IMailer, TransporterConfig } from './mailer.dt'
import { logger } from '../logger'

export class Mailer implements IMailer {
  constructor(private configs: TransporterConfig) {
    if (process.env.NODE_ENV !== 'production') {
      // this.configs = {
      //   host: 'smtp.ethereal.email',
      //   port: 587,
      //   secure: false,
      //   auth: {
      //     user: 'ralph.senger91@ethereal.email',
      //     pass: 'mZBEuBK9mwyQEcr38Q'
      //   }
      // }
    }
  }

  createTransport() {
    return nodemailer.createTransport({
      host: this.configs.host,
      port: this.configs.port,
      secure: this.configs.secure,
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      auth: {
        user: this.configs.auth.user,
        pass: this.configs.auth.pass
      }
    })
  }

  async sendEmail(email: Email, callback?: (error: boolean, val: any) => void) {
    try {
      const info = await this.createTransport().sendMail({
        from: `Auctions <${email.from}>`, // sender address
        to: email.to, // list of receivers
        bcc: email.bcc,
        subject: email.subject, // Subject line
        html: email.message, // html body
        attachments: email.attachment
      })

      if (info.messageId) {
        if (typeof callback == 'function') {
          callback(false, info)
        }
      }

      logger.info('Message sent: %s', info.messageId)
    } catch (error) {
      if (typeof callback == 'function') {
        callback(true, error)
      }
    }
  }
}
