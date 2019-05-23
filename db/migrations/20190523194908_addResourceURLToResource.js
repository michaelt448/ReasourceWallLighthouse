exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resources', function(table){
            table.string('url_img')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('resources', function(table) {
          table.dropColumn('url_img')
      })
  ])
};
