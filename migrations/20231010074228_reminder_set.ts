import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.boolean('reminderSet').defaultTo(false)
    table.datetime('reminderSetDate').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumns('reminderSet', 'reminderSetDate')
  })
}
