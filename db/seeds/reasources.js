
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({id: '1', url: 'https://www.google.com/', title: 'Google', description: 'Used for searching new resources', user_id:'1', category:'research'}),
        knex('resources').insert({id: '2', url: 'https://lighthouselabs.ca/', title: 'Lighthouse', description: 'Main page for school', user_id:'1', category:'research'}),
        knex('resources').insert({id: '3', url: 'https://devhints.io/knex', title: 'Knex CheatSheet', description: 'Quick description of knex commands', user_id:'2', category:'knex'})
      ]);
    });
};
