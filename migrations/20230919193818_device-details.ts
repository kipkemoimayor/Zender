import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.string('serialNo')
    table.string('make')
    table.string('model')
    table.boolean('mambuSynced').defaultTo(null)
    table.dateTime('mambuSyncedAt').defaultTo(null)
    table.boolean('nuovoSynced').defaultTo(null)
    table.dateTime('nuovoSyncedAt').defaultTo(null)
    table.boolean('locked')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('device', (table) => {
    table.dropColumns(
      'serialNo',
      'make',
      'model',
      'mambuSynced',
      'mambuSyncedAt',
      'nuovoSyncedAt',
      'nuovoSynced',
      'locked'
    )
  })
}
