// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('loan', (table) => {
    table.increments('id')

    table.string('accountId').unique()

    table.dateTime('firstRepaymentDate')

    table.string('loanName')

    table
      .string('status')
      .defaultTo('ACTIVE')
      .checkBetween(['ACTIVE', 'PENDING_APPROVAL', 'CLOSED', 'ACTIVE_IN_ARREARS', 'CLOSED', 'LOCKED'])

    table.string('mambuImei')

    table.timestamps(true, true, true)

    table.integer('clientId').unsigned()
    table.foreign('clientId').references('client.id').onDelete('RESTRICT').onUpdate('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('loan')
}
