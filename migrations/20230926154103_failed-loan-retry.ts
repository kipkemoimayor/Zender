// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', (table) => {
    table.integer('retry').defaultTo(0).comment('Number of times a loan retry has been run')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', function (table) {
    table.dropColumn('retry')
  })
}
