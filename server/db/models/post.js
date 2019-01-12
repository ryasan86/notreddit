const Sequelize = require("sequelize");
const db = require("../db.js");
const User = require("./user.js");
const Subreddit = require("./subreddit.js");

const Post = db.define("post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  commentCache: Sequelize.INTEGER,
  image: Sequelize.STRING,
  votes: Sequelize.INTEGER,
  upvoteCache: Sequelize.INTEGER,
  downvoteCache: Sequelize.INTEGER,
  postType: Sequelize.INTEGER,
  // 0 is post, 1 is comment
  id_parent: Sequelize.INTEGER,
  id_user: Sequelize.INTEGER,
  user_email: Sequelize.STRING,
  username: Sequelize.STRING,
  subreddit: Sequelize.STRING
});

module.exports = {
  Post
};
