const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();


router.get('/', (req, res) => {
  // do your magic!
   Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.post('/', (req, res) => {
  //do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the post"
      });
    }); 
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  // const id = req.params.id;
  // const post = { ...req.body, user_id: id };
  // Users.insert(post)
  // .then(post => {
  //   res.status(200).json(post);
  // })
  // .catch( error => {
  //   console.log(error);
  //   res.status(500).json({message: "Sorry, we can't proceed"});
  // })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
