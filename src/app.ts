// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
require('dotenv').config()
process.env.TZ = 'Africa/Nairobi'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { mysql } from './mysql'
import { services } from './services/index'
import { channels } from './channels'
import middleware from './middleware'
import bodyParser from 'body-parser'
import { NuovoApi } from './nuovo/api'
import { syncJob } from './jobs/sync'
import { paymentJob } from './jobs/repayment'
import { reminderJob } from './jobs/reminder'
import util from './utils'
import { lockJob } from './jobs/lock'
import { unlockJob } from './jobs/unlock'
import { smsJob } from './jobs/sendSMS'

const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

// auth
app.use('/api', middleware.validateEntry)
app.use('/api', serveStatic(app.get('public')))
app.use('/app-definition', serveStatic('./public/dev.xml'))

// Host the public folder
app.use('/docs', serveStatic('./public/templates/'))

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(mysql)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// new NuovoApi().getAllDevices()

// console.log(replaceHtml({startRepaymentDate:new Date().toDateString()}))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

// syncJob(app)

// Handle payment and schedules
// paymentJob(app)

// reminder job

// reminderJob(app)

// lockJob(app)

// unlockJob(app)

smsJob(app)

export { app }
