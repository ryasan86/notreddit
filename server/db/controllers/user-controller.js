const db = require("../db.js");
const model = require("../models/user.js");

exports.getAllUsers = (req, res) => {};

exports.createUser = (req, res) => {
  model.User.sync()
    .then(() =>
      model.User.create({
        id: null,
        username: req.body.username,
        email: req.body.email,
        postVoteCache: 0,
        commentVoteCache: 0,
        subredditSubscriptions: ""
      })
    )
    .then(user => {
      res.status(200).send(user);
    });
};

exports.getUser = (req, res) => {
  model.User.findOne({
    where: {
      email: req.params.email
    }
  })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.findUserAlt = (req, res) => {
  model.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(
    user => {
      res.status(200).send(user);
    },
    err => {
      console.log(err);
    }
  );
};

exports.addToUserRedditSubscriptions = (req, res) => {
  model.User.findById(req.params.id)
    .then(user => {
      let newVal = user.dataValues.subredditSubscriptions;
      if (user.dataValues.subredditSubscriptions) {
        newVal = newVal.split(", ");
        newVal.push(req.params.subreddit);
        user.update({ subredditSubscriptions: newVal.join(", ") });
      } else {
        user.update({ subredditSubscriptions: req.params.subreddit });
      }
      res.status(200).send(user);
    })
    .catch(err => console.error(err));
};

exports.remFromUserRedditSubscriptions = (req, res) => {
  model.User.findById(req.params.id)
    .then(user => {
      let newVal = user.dataValues.subredditSubscriptions;
      if (user.dataValues.subredditSubscriptions) {
        newVal = newVal.split(", ");
        newVal.splice(newVal.indexOf(req.params.subreddit), 1);
        user.update({ subredditSubscriptions: newVal.join(", ") });
      } else {
        user.update({ subredditSubscriptions: req.params.subreddit });
      }
      res.status(200).send(user);
    })
    .catch(err => console.error(err));
};
