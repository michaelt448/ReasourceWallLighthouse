
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('rank', function(table){
            table.dropColumn('rank_value')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('users', function(table) {
          table.string('rank_value')
      })
  ])
};
