import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.integer('nuovoDeviceId').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumn('nuovoDeviceId')
  })
}
