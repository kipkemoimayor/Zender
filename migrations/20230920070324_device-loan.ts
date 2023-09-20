import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.integer('clientId').unsigned()
    table.foreign('clientId').references('client.id').onDelete('RESTRICT').onUpdate('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumn('clientId')
    table.dropForeign('clientId')
  })
}
