
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rank').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('rank').insert({id: 1, user_id: 1, resource_id: 1, rank_value: 5}),
      ]);
    });
};
