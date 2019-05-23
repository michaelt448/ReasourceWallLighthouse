
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('likes').insert({id: 1, user_id: 1, resource_id: 3})
        // knex('likes').insert({id: '2', url: 'https://lighthouselabs.ca/', title: 'Lighthouse', description: 'Main page for school', user_id:'1', category:'research'}),
        // knex('likes').insert({id: '3', url: 'https://devhints.io/knex', title: 'Knex CheatSheet', description: 'Quick description of knex commands', user_id:'2', category:'knex'})
      ]);
    });
};
