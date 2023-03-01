'use strict'

/*
|--------------------------------------------------------------------------
| MaintenanceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class MaintenanceSeeder {
  async run () {
    const maintenances = await Database.table('maintenances')
    console.log(maintenances)
  }
}

module.exports = MaintenanceSeeder
