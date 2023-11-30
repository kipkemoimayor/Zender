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

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { mysql } from './mysql'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'
import middleware from './middleware'
import bodyParser from 'body-parser'

import util from './utils'

import { NotFound } from '@feathersjs/errors'

process.env.TZ = 'Africa/Nairobi'
const session: any = {}
const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(
  cors({
    origin: app.get('origins')
  })
)
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

// auth
app.use('/api', middleware.validateEntry)
app.use('/app-definition', serveStatic('./public/dev.xml'))

// Host the public folder
app.use('/docs', serveStatic('./public/templates/'))

app.use(
  '/api',
  function (req: any, res, next) {
    console.log(req.url)
    //generate token valid for 30 seconds using token id
    if (req.requestIsValid) {
      let expiry = new Date().getTime()
      expiry += 1000 * 2
      session[req.requestToken] = { expiresIn: expiry }
    }
    const mambuUser = JSON.parse(util.readSession() || JSON.stringify({ session: '' })).session
    const sess = session[mambuUser.split('.')[1]]
    const mambuUserSession = req.header('mambuUser')
    console.log(mambuUserSession)
    console.log(sess)

    if (sess || mambuUserSession) {
      if (sess.expiresIn > new Date().getTime() || mambuUserSession) {
        // save token
        try {
          util.createToken(process?.env?.SESSION_TOKEN || '')
        } catch (error) {
          console.log(error)
        }
        return next()
      } else {
        throw new NotFound()
      }
    } else {
      throw new NotFound()
    }
  },
  serveStatic(app.get('public'))
)

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
app.configure(authentication)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

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

export { app }
