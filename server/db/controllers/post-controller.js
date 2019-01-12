const db = require("../db.js");
const model = require("../models/post.js");
const utils = require("./helpers.js");

// Post Controllers
exports.getAllPosts = (req, res) => {
  if (req.params.id) {
    utils.getComments(req, res);
  } else if (req.query.subredditName) {
    utils.getSubredditPosts(req, res);
  } else if (req.query.user) {
    utils.getUserPosts(req, res);
  } else {
    utils.getAllPosts(req, res);
  }
};

exports.getPost = (req, res) => {
  const id = req.params.id;
  model.Post.findOne({
    where: {
      id
    }
  }).then(
    post => {
      res.status(200).send(post);
    },
    err => {
      console.log(err);
    }
  );
};

exports.createPost = (req, res) => {
  if (req.body.postparentId) {
    if (req.body.post.comment) {
      utils.createNestedComment(req, res);
    } else {
      utils.createComment(req, res);
    }
  } else {
    utils.createPost(req, res);
  }
};

exports.updatePostWithUpvote = (req, res) => {
  model.Post.findById(req.params.id)
    .then(post => post.increment("votes", { by: 1 }))
    .then(post => {
      res.status(200).send(post);
    })
    .catch(err => console.error(err));
};

exports.updatePostWithDownvote = (req, res) => {
  model.Post.findById(req.params.id)
    .then(post => post.decrement("votes", { by: 1 }))
    .then(post => {
      res.status(200).send(post);
    })
    .catch(err => console.error(err));
};

exports.updateOne = (req, res) => {
  res.status(200).send("update one");
};

exports.deletePost = (req, res) => {
  model.Post.destroy({
    where: {
      $or: {
        id: {
          $eq: req.params.id
        },
        id_parent: {
          $eq: req.params.id
        }
      }
    }
  }).then(() => res.status(200).send("deleted"));
};

exports.deleteAllPosts = (req, res) => {
  model.Post.destroy({
    where: {},
    truncate: true
  }).then(() => res.send("deleted all posts"));
};

exports.searchPosts = (req, res) => {
  model.Post.findAll({
    where: {
      title: {
        $like: `%${req.body.search}%`
      }
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
