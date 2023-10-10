// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex'
import type { Knex } from 'knex'
import type { Application } from './declarations'
import { logger } from './logger'

declare module './declarations' {
  interface Configuration {
    mysqlClient: Knex
  }
}

export const mysql = (app: Application) => {
  const config: any = app.get('mysql')
  config.connection = process.env.DATABASE_CONNECTION
  // config.timzone = 'UTC+03:00'

  const db = knex({
    ...config
    // debug: true
  })

  app.set('mysqlClient', db)
}
