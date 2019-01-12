const Sequelize = require('sequelize');
const db = require('../db.js');
const Post = require('./post.js');

let User;

const defineUser = () =>
  new Promise((resolve, reject) => {
    User = db.define('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      postVoteCache: Sequelize.INTEGER,
      commentVoteCache: Sequelize.INTEGER,
      subredditSubscriptions: Sequelize.STRING,
    });
  });

defineUser()
  .then(() => {
    User.hasMany(Post);
  })
  .catch(() => {
    console.log('error creating user');
  });

module.exports = {
  User,
};

// User.hasMany(Post);
