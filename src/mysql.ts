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
  // const connection: any = {
  //   database: process.env.DATABASE_NAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   user: process.env.DATABASE_USER,
  //   host: process.env.DATABASE_HOST,
  //   port: process.env.DATABASE_PORT
  // }
  config.connection = process.env.DATABASE_CONNECTION
  const db = knex(config!)

  app.set('mysqlClient', db)
}
