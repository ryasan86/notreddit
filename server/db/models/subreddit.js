const Sequelize = require('sequelize');
const db = require('../db.js');
const Post = require('./post.js');

let Subreddit;

const defineSubreddit = () =>
  new Promise((resolve, reject) => {
    Subreddit = db.define('subreddit', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: Sequelize.STRING,
    });
  });

defineSubreddit().then(() => {
  Subreddit.hasMany(Post, { foreignKey: 'id_subreddit' });
});

module.exports = {
  Subreddit,
};
