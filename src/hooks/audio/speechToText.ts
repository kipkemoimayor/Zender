const fs = require('fs')
const sdk = require('microsoft-cognitiveservices-speech-sdk')
import path from 'path'
import util from '../../utils'

const speechTranslationConfig: any = sdk.SpeechTranslationConfig.fromSubscription(
  process.env.SPEECH_KEY,
  process.env.SPEECH_REGION
)

speechTranslationConfig.speechRecognitionLanguage = 'en-US'

// define language
let language = 'it'
speechTranslationConfig.addTargetLanguage(language)

// define audio input
export const speechToText = () => {
  let audioConfig = sdk.AudioConfig.fromWavFileInput(util.readFile('ENG_M.wav'))

  let translationRecognizer = new sdk.TranslationRecognizer(speechTranslationConfig, audioConfig)

  return translationRecognizer.recognizeOnceAsync((result: any) => {
    switch (result.reason) {
      case sdk.ResultReason.TranslatedSpeech:
        console.log(`RECOGNIZED: Text=${result.text}`)
        console.log('Translated into [' + language + ']: ' + result.translations.get(language))
        return result.text
      case sdk.ResultReason.NoMatch:
        console.log('NOMATCH: Speech could not be recognized.')
        return 'NOMATCH: Speech could not be recognized.'
      case sdk.ResultReason.Canceled:
        const cancellation = sdk.CancellationDetails.fromResult(result)
        console.log(`CANCELED: Reason=${cancellation.reason}`)

        if (cancellation.reason == sdk.CancellationReason.Error) {
          console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`)
          console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`)
          console.log('CANCELED: Did you set the speech resource key and region values?')
        }
        return `CANCELED: Reason=${cancellation.reason}`
    }
    translationRecognizer.close()
  })
}
