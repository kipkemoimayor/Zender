import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('reminder', (table) => {
    table.text('message').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('reminder', (table) => {
    table.dropColumns('message')
  })
}
