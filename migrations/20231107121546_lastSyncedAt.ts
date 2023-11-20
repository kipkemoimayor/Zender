import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', async (table) => {
    await table.datetime('lastSyncedAt').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumns('lastSyncedAt')
  })
}
