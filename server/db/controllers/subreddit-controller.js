const db = require("../db.js");
const model = require("../models/subreddit.js");

exports.getSubreddit = (req, res) => {
  const id = req.params.id;
  model.Subreddit.findOne({
    where: {
      id
    }
  }).then(
    subreddit => {
      res.status(200).send(subreddit);
    },
    err => {
      console.log(err);
    }
  );
};

exports.getSubredditByName = (req, res) => {
  model.Subreddit.findOne({
    where: {
      name: req.params.name
    }
  }).then(
    subreddit => {
      res.status(200).send(subreddit);
    },
    err => {
      console.log(err);
    }
  );
};

exports.allSubredditNames = (req, res) => {
  model.Subreddit.findAll({
    attributes: ["name"]
  }).then(
    subreddits => {
      res.status(200).send(subreddits);
    },
    err => {
      console.log(err);
    }
  );
};

exports.createSubreddit = (req, res) => {
  const name = req.body.subreddit.name;
  const description = req.body.subreddit.description;
  model.Subreddit.sync()
    .then(() =>
      model.Subreddit.create({
        name,
        description
      })
    )
    .then(subreddit => {
      res.status(200).send(subreddit);
    });
};
