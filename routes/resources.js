"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {



  router.post('/', (req, res) => {
    knex('resources')
      .insert(req.body)
      .returning(['url','title','description','user_id','category','create_at','url_img'])
      .then((result) => {
        res.json({ message: "Successful request to resource table", result });
      });
  });



  router.post('/:id/comment', (req, res) => {
    knex('comments').insert({
      user_id: parseInt(req.body.user_id),
      resource_id:parseInt(req.params.id),
      comment: req.body.comment
    }).catch(err => console.log(err));
  });

  router.patch('/:id/rank/:rank_id', (req, res) => {
    knex('rank').update(
      'rank_value', '2'
    ).then((result) => {
      res.json({ message: "rank_value succesfully updated in rank table"});
    });
  });

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('resources')
      .then((results) => {
        res.json(results);
      });
  });
  router.get('/search/:term', (req,res) => {
    var searchTerm = req.params.term;
    knex('resources').where(function() {
      this.whereRaw(`LOWER(title) LIKE ?`, [`%${searchTerm}%`]);
    })  .orWhereRaw(`LOWER(description) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(category) LIKE ?`, [`%${searchTerm}%`])
      .select('*')
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

    let personalLikePromise = knex('likes') // START OF PERSONAL LIK
    .select('user_id')
    .where('resource_id',id); // END OF PERSONAL LIKE

    let personalRankPromise = knex('rank') // START OF PERSONAL RANK
    .select('user_id','rank_value')
    .where('resource_id',id); // END OF PERSONAL RANK

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

  router.get("/:id/favorites", (req, res) => {
    var id = req.params.id;
    id = parseInt(id);
    var subquery = knex('likes').where('user_id', id).select('resource_id');
    knex
      .select('*')
      .from('resources')
      .where('user_id', id)
      .orWhere('id', 'in', subquery)
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/:id/rank', (req, res) => {
    var id = req.params.id;
    id = parseInt(id);
    knex('rank').insert(
      {
        user_id: req.body.user_id,
        resource_id: req.params.id,
        rank_value: parseInt(req.body.rank_value)
      }).then((result) => {
        res.json( result );
      });
  });
router.get('/', (req, res) => {
    knex
        .select('*')
        .from('resources')
        .then((results) => {
            res.json(results);
        });
});

router.post('/:id/like', (req, res) => {
    knex('likes').insert(
        {user_id : req.body.user_id, resource_id : req.params.id})
        .catch(err => console.log(err));
});

router.post('/:id/like/delete', (req, res) => {
    console.log('inside the delete route');
    knex('likes').where('user_id', req.body.user_id).del();
});


  return router;
};