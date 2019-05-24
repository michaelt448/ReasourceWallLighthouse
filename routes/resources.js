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
      url_img: './public/images/colour-hunt-css.png'
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
      'rank_value', '4'
    ).returning(['rank_value']).then((result) => {
      res.json({ message: "Successful request to rank table", result });
    });
  });

  return router;
};
















