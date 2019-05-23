
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({url: 'https://www.google.com/', title: 'Google', description: 'Used for searching new resources', user_id:'1', category:'research'}),
        knex('resources').insert({url: 'https://lighthouselabs.ca/', title: 'Lighthouse', description: 'Main page for school', user_id:'1', category:'research'}),
        knex('resources').insert({url: 'https://devhints.io/knex', title: 'Knex CheatSheet', description: 'Quick description of knex commands', user_id:'2', category:'knex'})
      ]);
    });
};
