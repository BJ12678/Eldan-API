'use strict'

/*
|--------------------------------------------------------------------------
| CustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CustomerSeeder {
  async run () {
    const customers = await Database.table('customers')
    console.log(customers)
  }
}

module.exports = CustomerSeeder
