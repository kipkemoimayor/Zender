import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device_lock_history', (table) => {
    table.integer('type').defaultTo(1)
    table.dateTime('unlockedAt').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device_lock_history', (table) => {
    table.dropColumns('type', 'unlockedAt')
  })
}
