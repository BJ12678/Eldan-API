'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaintenanceSchema extends Schema {
  up () {
    this.create('maintenances', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('date', 255)
      table.string('employee', 255)
      table.string('remarks', 255)
      table.integer('amount', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('maintenances')
  }
}

module.exports = MaintenanceSchema
