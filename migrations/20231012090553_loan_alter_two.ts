import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', async (table) => {
    table.string('status').defaultTo('ACTIVE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', (table) => {
    table.dropColumns('status')
  })
}
