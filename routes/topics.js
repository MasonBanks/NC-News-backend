const topicsRouter = require('express').Router();
const { getTopics, getArticleByTopic, postArticleToTopic } = require('../controller/topics')

topicsRouter.route('/')
  .get(getTopics)

topicsRouter.route('/:topic_slug/articles')
  .get(getArticleByTopic)
  .post(postArticleToTopic)

module.exports = topicsRouter