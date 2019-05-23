
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('resources', function(table) {
            table.increments('id').primary();
            table.string('url');
            table.string('title');
            table.string('description');
            table.integer('user_id');
            table.string('category');
            table.timestamp('create_at').defaultTo(knex.fn.now());
        })
    ]);
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('resources')
  ])
};
