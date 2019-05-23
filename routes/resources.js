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


  return router;
};
















