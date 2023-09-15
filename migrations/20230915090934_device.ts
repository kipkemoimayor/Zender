// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('device', (table) => {
    table.increments('id')

    table.string('imei')

    table.string('status').defaultTo(null).checkBetween(['ACTIVE', 'LOCKED', 'PENDING'])

    table.timestamps(true, true, true)

    table.integer('loanId').unsigned()
    table.foreign('loanId').references('loan.id').onDelete('RESTRICT').onUpdate('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('device')
}
