// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('client', (table) => {
    table.increments('id')

    table.string('fullName')

    table.string('location')

    table.string('idNumber').unique()

    table.string('phoneNumber')

    table.string('emailAddress')

    table.integer('status').defaultTo(1).comment('1-ACTIVE,0-INACTIVE')

    table.timestamps(true, true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('client')
}
