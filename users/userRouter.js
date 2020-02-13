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
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found'});
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "Error retrieving this user"})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id;

  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "Error getting user's posts"});
  })
});




router.post('/', (req, res) => {
  //do your magic!
  const name = req.body.name;
  Users.insert({name})
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
  const post = req.body;
  Posts.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding post" });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  Users.remove(id).then(() => res.status(204).end());
});

router.put('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { name } = req.body;
  Users.update(id, { name }).then(() => {
    Users.getById(id)
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error getting user" });
      });
  });
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
