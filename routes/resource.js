
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    router.post('/resources/:id/like', (req, res) => {
        const current_user = req.session.user_id;
        knex('likes').insert(
            {user_id : current_user});
    });

    router.delete('resources/:id/like'), (req, res) => {
        const current_user = req.session.user_id;
        knex('likes').where({user_id : current_user}).del();
    }


    return router;
  }