"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {



  router.post('/', (req, res) => {
    knex('resources').insert({
      url: 'https://colorhunt.co/',
      title: 'Colour hunt',
      description: 'Site for helping to pick colour schemes.',
      user_id: 3,
      category: 'Front-end',
      url_img: 'https://www.google.com/search?q=bootstrap&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjppayhrrXiAhU1FzQIHUGUBSQQ_AUIDigB&biw=1163&bih=581#imgrc=4aFpbvERzh62wM:'
    }).returning(['url','title','description','user_id','category','create_at','url_img']).then((result) => {
      res.json({ message: "Successful request to resource table", result });
    });

  });


  router.post('/:id/comment', (req, res) => {
    knex('comments').insert({
      user_id: 2,
      resource_id: 1,
      comment: "Great resource- thanks for posting!"
    }).returning(['comment','user_id','resource_id','created_at']).then((result) => {
      res.json({ message: "Successful request to commit table", result });
    });
  });

  router.patch('/:id/rank/:rank_id', (req, res) => {
    knex('rank').update(
      'rank_value', '2'
    ).then((result) => {
      res.json({ message: "rank_value succesfully updated in rank table"});
    });
  });



  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    var id = req.params.id;
    id = parseInt(id);
    knex
      .select("*")
      .from("resources")
      .where("id", id)
      // .where("id: 1")//, req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id/favourites", (req, res) => {
    var id = req.params.id;
    id = parseInt(id);
    var subquery = knex('likes').where("user_id", id).select('resource_id');
    knex
      .select("*")
      .from("resources")
      .where("user_id", id)
      .orWhere('id', 'in', subquery)
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/:id/rank', (req, res) => {
    //const current_user = req.session.user_id;
    var id = req.params.id;
    id = parseInt(id);
    knex('rank').insert(
      {
        user_id: id,
        resource_id: req.body.resource_id,
        rank_value: req.body.rank_value
      }).then((result) => {
      res.json({ message: "Successful rank added", result });
    });
  });

  //   router.post('/login', (req,res) => {
  //     // console.log('i am inside posting');
  //     // console.log(req.body);  
  //     console.log(req.session);
  //     req.session.user_id = req.body.user_id;
  //     console.log('this is my cookie' + req.session.user_id);
  //     res.redirect('/'); // TODO: change this to root page later
  // }) --------->>>>>>> NEEDS TO BE DELETED IF USER TABLE IS NOT MADE

  // router.get('/', (req, res) => {
  //   knex
  //     .select('*')
  //     .from('resources')
  //     .then((results) => {
  //       res.json(results);
  //     });
  // });

  router.post('/:id/like', (req, res) => {
    console.log('i am in id like');
    const current_user = req.session.user_id;
    knex('likes').insert(
      {user_id : current_user, resource_id : req.params.resource_id});
  });

  router.delete('/:id/like', (req, res) => {
    const current_user = req.session.user_id;
    knex('likes').where({user_id : current_user}).del();
  });


  return router;
};