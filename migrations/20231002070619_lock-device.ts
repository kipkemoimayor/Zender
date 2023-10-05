import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.boolean('lockReady').defaultTo(0)
    table.dateTime('lockReadyScheduleAt').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumns('lockReady', 'lockReadyScheduleAt')
  })
}
