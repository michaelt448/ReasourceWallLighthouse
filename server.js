"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
var cookieParser = require('cookie-parser');


// Seperated Routes for each Resource
const resourceRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


//jb cookie
app.use(cookieParser());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes

app.use("/api/resources",resourceRoutes(knex));

// Home page

//jb cookie
// run  npm install cookie-parser
app.get("/", (req, res) => {
  let templateVars = {
    userID: req.cookies.user_id
  };
  res.render("homepage", templateVars);
});


app.get("/favs", (req, res) => {
  console.log(req.session)
  res.render("favorites");
});
  
app.get("/login", (req,res) => {
  res.render("login");
});

app.post("/login", (req,res) => {
  req.session.user_id = req.body.userID;
  res.redirect("/");
});

app.get("/:id", (req, res) => {
  res.render("specificResource");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
