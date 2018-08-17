const mongoose = require('mongoose');
const { formatUserData, formatCommentData, formatTopicData, formatArticleData } = require('../utils');
const { User, Article, Comment, Topic } = require('../models/index');

const seedDB = ({ userData, commentData, topicData, articleData }) => {
  return mongoose.connection.dropDatabase()
    .then(() => {
      return Promise.all([
        User.insertMany(formatUserData(userData)),
        Topic.insertMany(formatTopicData(topicData))
      ])
    })
    .then(([userDocs, topicDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticleData(articleData, userDocs)),
        userDocs, topicDocs
      ])
    })
    .then(([articleDocs, userDocs, topicDocs]) => {
      return Promise.all([
        Comment.insertMany(formatCommentData(commentData, articleDocs, userDocs)), articleDocs, topicDocs, userDocs
      ])
    })
    .then(docs => {
      return docs
    })
}

module.exports = seedDB