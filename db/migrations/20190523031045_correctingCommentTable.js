
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.table('comments', function(table){
    table.text('comment')
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.table('comments', function(table){
    table.dropColumn('comment');
    })
  ])
};
