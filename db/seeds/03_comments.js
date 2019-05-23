
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({id: 1, user_id: 1, resource_id: 1, comment: "This is awesome app!!!"}),
      ]);
    });
};
