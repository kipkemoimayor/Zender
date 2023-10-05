// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', (table) => {
    table.string('encodedKey').defaultTo(null)
    table.boolean('mambuSynced').defaultTo(null)
    table.dateTime('mambuSyncedAt').defaultTo(null)
    table.dateTime('nextRepaymentDate').defaultTo(null)
    table.integer('daysRemaining').defaultTo(null).comment('Number of days before next repayment')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', function (table) {
    table.dropColumns('encodedKey', 'mambuSynced', 'mambuSyncedAt', 'nextRepaymentDate', 'daysRemaining')
  })
}
