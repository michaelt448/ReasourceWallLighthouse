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

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
 
    let id = req.params.id;
    id = parseInt(id);
    console.log('id passed in is', id);
    let commentPromise = knex('comments')//START OF COMMENT QUARY
    .select('comment','created_at','user_id')
    .where('resource_id',id); // END OF COMMENT GETTING QUARY

    let likesPromise = knex('likes') // START OF LIKES QUARY
    .count('id')
    .where('resource_id',id); // END OF LIKES QUARY

    let personalLikePromise = knex('likes')
    .select('user_id')
    .where('resource_id',id);

    let personalRankPromise = knex('rank')
    .select('user_id','rank_value')
    .where('resource_id',id);

    let rankPromise = knex('rank') //START OF RANKS QUARY
    .avg('rank_value')
    .where('resource_id',id); //END OF RANKS QUARY

    let resourcePromise = knex
      .select("*")
      .from("resources")
      .where("id", id);

      Promise.all([commentPromise,likesPromise,rankPromise,resourcePromise,personalLikePromise,personalRankPromise]).then((promiseResults) => {
        const [comments,likes,ranks,resourceProperties,personalLike,personalRank] = promiseResults;
        res.json({
          comments,
          likes,
          ranks,
          resourceProperties,
          personalLike,
          personalRank
        })
      }).catch((err) => {
        console.log(err);
      })
  });

  router.get("/:id/favourites", (req, res) => {
    var id = req.params.id;
    id = parseInt(id);
    var subquery = knex('likes').where("user_id", id).select('resource_id');
    knex
      .select("*")
      .from("resources")
      .where("user_id", id)
      .orWhere('id', 'in', subquery)
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/:id/rank', (req, res) => {
    //const current_user = req.session.user_id;
    var id = req.params.id;
    id = parseInt(id);
    knex('rank').insert(
      {
        user_id: id,
        resource_id: req.body.resource_id,
        rank_value: req.body.rank_value
      }).then((result) => {
        res.json({ message: "Successful rank added", result });
      });
  });

//   router.post('/login', (req,res) => {
//     // console.log('i am inside posting');
//     // console.log(req.body);  
//     console.log(req.session);
//     req.session.user_id = req.body.user_id;
//     console.log('this is my cookie' + req.session.user_id);
//     res.redirect('/'); // TODO: change this to root page later
// })

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('resources')
        .then((results) => {
            res.json(results);
        });
});

router.post('/:id/like', (req, res) => {
    console.log('i am in id like');
    const current_user = req.session.user_id;
    knex('likes').insert(
        {user_id : current_user, resource_id : req.params.resource_id});
});

router.delete('/:id/like'), (req, res) => {
    const current_user = req.session.user_id;
    knex('likes').where({user_id : current_user}).del();
}


  return router;
};
