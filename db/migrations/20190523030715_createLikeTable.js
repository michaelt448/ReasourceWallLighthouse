
exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function (table) {
    table.increments('id');
    table.integer('user_id');
    table.integer('resource_id').references('id').inTable('resources').notNull().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};

