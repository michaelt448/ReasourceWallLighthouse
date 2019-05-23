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

    return router;

    router.get("/:id", (req, res) => {
        knex
            .select("*")
            .from("resources")
            .where("id = ?", req.params.id)
            .then((results) => {
                res.json(results);
            });
    });

    return router;

    // router.get("/:user_id/favourites", (req, res) => {
    //     knex
    //         .select("*")
    //         .from("resources")
    //         .where("id = ?", req.params.id)



    //         .then((results) => {
    //             res.json(results);
    //         });
    // });

    return router;
}