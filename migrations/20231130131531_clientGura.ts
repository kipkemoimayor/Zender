import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('client', (table) => {
    table.string('guarantorPhoneNumber').after('phoneNumber')
    table.string('guarantorName').after('guarantorPhoneNumber')
  })
}

export async function down(knex: Knex): Promise<void> {}
