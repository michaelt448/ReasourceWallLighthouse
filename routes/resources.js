"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

  router.get('/resources', (req, res) => {
    knex
      .select('*')
      .from('resouces')
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/', (req, res) => {
    knex('resources').insert({
      url: 'https://colorhunt.co/',
      title: 'Colour hunt',
      description: 'Site for helping to pick colour schemes.',
      user_id: 3,
      category: 'Front-end',
      url_img: './public/images/colour-hunt-css.png'
    }).returning(['title', 'url']).then((result) => {
      res.json({ message: "Successful request", result });
    });

  });


  router.post('/:id/comment', (req, res) => {
    knex('comments').insert({
      user_id: 2,
      resource_id: 1,
      Comment: "Great resource- thanks for posting!"
    });
  });

  router.patch('/:id/rank/:rank_id', (req, res) => {
    knex('rank').update({
      rank_value: 4
    }
    );
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


  return router;
};
