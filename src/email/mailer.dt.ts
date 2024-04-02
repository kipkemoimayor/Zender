import { Transporter } from 'nodemailer'

interface Attachment {
  filename: string
  path: string
}
export interface Email {
  message: string
  from: string
  subject: string
  to: string
  bcc?: string[]
  attachment?: Attachment[]
}

export interface IMailer {
  /**
   * Registers node mailer transporter
   * @returns Node mailer transporter
   */
  createTransport: () => Transporter
  /**
   * Sends email
   * @param email email data
   * @param callback function called when an email has been sent successfully
   * @returns void
   */
  sendEmail: (email: Email, callback?: (val: any) => void) => Promise<void>
}

export interface TransporterConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}
