'use strict'

/*
|--------------------------------------------------------------------------
| TokenSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class TokenSeeder {
  async run () {
    const tokens = await Database.table('tokens')
    console.log(tokens)
  }
}

module.exports = TokenSeeder
