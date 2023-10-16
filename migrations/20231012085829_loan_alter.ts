import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', async (table) => {
    await table.dropColumn('status')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('loan', (table) => {
    table.dropColumns('')
  })
}
