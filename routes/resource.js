"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

    router.get("/", (req, res) => {
        knex
            .select("*")
            .from("resources")
            .then((results) => {
                res.json(results);
            });
    });

    router.get("/:id", (req, res) => {
        knex
            .select("*")
            .from("resources")
            .where("id = ?", req.params.id)
            .then((results) => {
                res.json(results);
            });
    });

    router.get("/:user_id/favourites", (req, res) => {
        var subquery = knex('likes').where("id = ?", req.params.id)
        knex
            .select("*")
            .from("resources")
            .where("id = ?", req.params.id)
            .orwhere('id', 'in', subquery)
            .then((results) => {
                res.json(results);
            });
    });

    router.post('/:id/rank', (req, res) => {
        const current_user = req.session.user_id;
        knex('rank').insert(
            {
                user_id: current_user
        resource_id: req.param.id
        rank_value: req.body.rank_value
            }
        );
    });

    return router;
}
