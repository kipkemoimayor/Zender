// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('device_lock_history', (table) => {
    table.increments('id')

    table.dateTime('lockedAt')
    table.text('reason')
    table.timestamps(true, true, true)
    table.integer('deviceId').unsigned()
    table.foreign('deviceId').references('device.id').onDelete('RESTRICT').onUpdate('CASCADE')

    table.integer('loanId').unsigned()
    table.foreign('loanId').references('loan.id').onDelete('RESTRICT').onUpdate('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('device_lock_history')
}
