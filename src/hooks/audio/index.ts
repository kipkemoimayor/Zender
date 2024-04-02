import { Mailer } from '../../email'
import { speechToText } from './speechToText'

export const audioHook = async (context: any) => {
  console.log(`Running hook Audio-hook on ${context.path}.${context.method}`)

  // read audio and send via email
  const mailer = new Mailer({
    auth: {
      pass: '',
      user: ''
    },
    host: '',
    port: 567,
    secure: false
  })

  const text: string = speechToText()

  console.log(text)

  // send text from transciption
  mailer.sendEmail({
    from: '',
    to: '',
    subject: 'Audio transcription',
    message: text,
    attachment: []
  })
}
