// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', (table) => {
    table.boolean('paid').defaultTo(false)
    table.boolean('paidOff').defaultTo(false)
    table.integer('daysToNextInstallment').defaultTo(null).comment('Number of days before next repayment')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', function (table) {
    table.dropColumns('paid', 'paidOff', 'daysToNextInstallment')
  })
}
