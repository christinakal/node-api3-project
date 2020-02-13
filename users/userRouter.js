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




router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  Users.remove(id).then(() => res.status(204).end());
});

router.put('/:id', validateUserId, (req, res) => {
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
  const { id } = req.params;
  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "The specified user does not exist" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: "Name must be a string" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const { id: user_id } = req.params;
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({ error: "Post requires body" });
  } else if (!text) {
    res.status(400).json({ error: "Post requires text" });
  } else {
    req.body = { user_id, text };
    next();
  }
}

module.exports = router;
