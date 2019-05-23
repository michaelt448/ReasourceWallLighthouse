
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({id: 1, url: 'https://www.google.com/', title: 'Google', description: 'Used for searching new resources', user_id: 1, category:'research', url_img: 'http://i.dailymail.co.uk/i/pix/2015/09/01/18/2BE1E88B00000578-3218613-image-m-5_1441127035222.jpg'}),
        knex('resources').insert({id: 2, url: 'https://lighthouselabs.ca/', title: 'Lighthouse', description: 'Main page for school', user_id: 1, category:'research', url_img: 'https://cdn.pixabay.com/photo/2018/01/31/16/27/sea-3121435__340.jpg'}),
        knex('resources').insert({id: 3, url: 'https://devhints.io/knex', title: 'Knex CheatSheet', description: 'Quick description of knex commands', user_id: 2, category:'knex', url_img: 'https://assets.devhints.io/previews/knex.jpg?t=20190430045654'})
      ]);
    });
};
