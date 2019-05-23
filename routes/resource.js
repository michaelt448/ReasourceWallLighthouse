
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    router.post('/login', (req,res) => {
        res.cookie.session.user_id = req.body.user_id;
        res.redirect('/resources/:id/like'); // TODO: change this to root page later
    })

    router.get('/', (req, res) => {
        knex
            .select('*')
            .from('resources')
            .then((results) => {
                res.json(results);
            });
    });

    router.post('/resources/:id/like', (req, res) => {
        const current_user = req.session.user_id;
        knex('likes').insert(
            {user_id : current_user, resource_id : req.params.resource_id});
    });

    router.delete('/resources/:id/like'), (req, res) => {
        const current_user = req.session.user_id;
        knex('likes').where({user_id : current_user}).del();
    }


    return router;
  }