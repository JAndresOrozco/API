'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DatosPersonalesSchema extends Schema {
  up () {
    this.create('datos_personales', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nombre', 80)
      table.string('apellido_paterno', 80)
      table.string('apellido_materno', 60)
      table.string('telefono', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('datos_personales')
  }
}

module.exports = DatosPersonalesSchema
