// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sms_queue', (table) => {
    table.increments('id')
    table.text('message')
    table.string('destination')
    table.string('direction').defaultTo('OUT').checkBetween(['IN', 'OUT'])
    table.boolean('sent').defaultTo(0)
    table.timestamps(true, true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sms-queue')
}
