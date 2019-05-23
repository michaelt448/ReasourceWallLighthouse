"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('resouces')
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/resources', (req, res) => {
    knex('resouces').insert({id:
      url: 'https://colorhunt.co/'
      title: 'Colour hunt',
      description: 'Site for helping to pick colour schemes.',
      user_id: 3,
      category: 'Front-end',
      url_image: './public/images/colour-hunt-css.png'
      })

    });


  return router;
}
















