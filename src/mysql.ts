// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex'
import type { Knex } from 'knex'
import type { Application } from './declarations'

declare module './declarations' {
  interface Configuration {
    mysqlClient: Knex
  }
}

export const mysql = (app: Application) => {
  const config: any = app.get('mysql')
  config.connection = process.env.DATABASE_CONNECTION
  // config.timzone = 'UTC+03:00'

  const db = knex(config!)

  // {
  //   connection: config!,
  //   pool: {
  //     afterCreate: function (connection: any, callback: any) {
  //       connection.query('SET time_zone = Africa/Nairobi;', function (err: any) {
  //         callback(err, connection)
  //       })
  //     }
  //   }
  // }

  app.set('mysqlClient', db)
}
