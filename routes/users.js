"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => { //usertwo/

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
  router.get("/:id", (req, res) => { //.com/usertwo/:id
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
  return router;
}



///main index server
const knex = knex connection;
const userRoutes = require("users.js")(knex);
const commentsRoutes = require("comments.js")(knex);
app,use("/usertwo", userRoutes)
