const db = require("../db.js");
const model = require("../models/post.js");

// Get Helpers

exports.getComments = (req, res) => {
  model.Post.findAll({
    where: {
      id_parent: req.params.id,
      postType: 1
    }
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.getSubredditPosts = (req, res) => {
  model.Post.findAll({
    where: {
      subreddit: req.query.subredditName
    }
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.getUserPosts = (req, res) => {
  model.Post.findAll({
    where: {
      user_email: req.query.user,
      postType: 0
    }
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.getAllPosts = (req, res) => {
  model.Post.findAll({
    where: {
      postType: 0
    }
  }).then(
    posts => {
      res.status(200).send(posts);
    },
    err => {
      console.log(err);
    }
  );
};

// Post Helpers

exports.createNestedComment = (req, res) => {
  const {
    title,
    body,
    image,
    subreddit,
    user_email,
    username,
    parentId,
    comment
  } = req.body.post;
  model.Post.sync()
    .then(() =>
      model.Post.create({
        id: null,
        body,
        commentCache: 0,
        votes: 0,
        postType: 1,
        id_parent: comment.id,
        user_email,
        username
      })
    )
    .then(post => {
      console.log(post);
      res.status(200).send(post);
    });
};

exports.createComment = (req, res) => {
  const {
    title,
    body,
    image,
    subreddit,
    user_email,
    username,
    parentId,
    comment
  } = req.body.post;
  model.Post.sync()
    .then(() =>
      model.Post.create({
        id: null,
        body,
        commentCache: 0,
        votes: 0,
        postType: 1,
        id_parent: parentId,
        user_email,
        username
      })
    )
    .then(post => {
      console.log(post);
      res.status(200).send(post);
    });
};

exports.createPost = (req, res) => {
  const {
    title,
    body,
    image,
    subreddit,
    user_email,
    username,
    parentId,
    comment
  } = req.body.post;
  model.Post.sync()
    .then(() =>
      model.Post.create({
        id: null,
        title,
        body,
        commentCache: 0,
        votes: 0,
        image,
        postType: 0,
        user_id: req.body.user_id,
        user_email,
        username,
        subreddit
      })
    )
    .then(post => {
      console.log(post);
      res.status(200).send(post);
    });
};
