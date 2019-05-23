
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id');
    table.integer('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('resource_id').references('id').inTable('resources').notNull().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
