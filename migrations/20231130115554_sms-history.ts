// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sms_history', (table) => {
    table.increments('id')
    table.integer('type').comment('1:SMS TYPE 1, 2:SMS TYPE 2')
    table.boolean('status').defaultTo(true)
    table.integer('clientId').unsigned()
    table.foreign('clientId').references('client.id').onDelete('RESTRICT').onUpdate('CASCADE')
    table.timestamps(true, true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sms_history')
}
