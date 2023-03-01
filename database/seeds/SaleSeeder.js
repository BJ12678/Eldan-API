'use strict'

/*
|--------------------------------------------------------------------------
| SaleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class SaleSeeder {
  async run () {
    const sales = await Database.table('sales')
    console.log(sales)
  }
}

module.exports = SaleSeeder
