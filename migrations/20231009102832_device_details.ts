import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.boolean('lockDateSynced').defaultTo(0)
    table.dateTime('nextLockDate').defaultTo(null)
    table.dateTime('initialLockDate').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumns('lockDateSynced', 'nextLockDate', 'initialLockDate')
  })
}
