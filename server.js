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
//jb cookie
var cookieParser = require('cookie-parser');


// Seperated Routes for each Resource
const resourceRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// app.use(cookieSession({
//   name : 'session',
//   keys : ['key1'],
//   maxAge : 1000*60*60
// }));

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
// app.use("/api/users", usersRoutes(knex));

app.use("/api/resources",resourceRoutes(knex));

// Home page

//jb cookie
// run  npm install cookie-parser
app.get("/", (req, res) => {
  // console.log('rendering');
  //console.log(req.session);
  // console.log(req.body.user);
  // console.log(req.cookies);
  // console.log(req.cookies && req.cookies.user_id);
  let templateVars = {
    userID: req.cookies.user_id
    //userID: document.cookie
  };
  // console.log("HAZ", req.session.user_id );
  res.render("homepage", templateVars);
});

//if sending cookie server side then use the template format

app.get("/favs", (req, res) => {
  // console.log('rendering');
  console.log(req.session)
  res.render("favorites");
});
  
app.get("/login", (req,res) => {
  console.log("click")
  res.render("login");
});

app.post("/login", (req,res) => {
  console.log("login", req.body);
  req.session.user_id = req.body.userID;
  res.redirect("/");
});

app.get("/:id", (req, res) => {
  // console.log('rendering');
  console.log(req.session)
  res.render("specificResource");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
