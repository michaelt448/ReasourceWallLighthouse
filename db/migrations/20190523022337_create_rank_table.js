exports.up = function(knex, Promise) {
    return knex.schema.createTable('rank', function (table) {
      table.increments('id');
      table.string('rank_value');
      table.integer('user_id')
      table.integer('resource_id').unsigned().notNullable().onDelete('cascade').references('id').inTable('resources')
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  };
  