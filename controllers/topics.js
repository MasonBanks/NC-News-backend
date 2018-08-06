const Topic = require('../models/Topic');
const Article = require('../models/Article');

const getTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
}
const postArticleToTopic = (req, res, next) => {
  return Article.create({
    title: req.body.title,
    body: req.body.body,
    belongs_to: req.params.topic,
    created_by: req.body.created_by
  })
    .then(post => {
      post ? res.status(201).send({ post, msg: 'article added' }) : next({ status: 404, msg: 'article not added' })
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: "not a valid article" })
      else next(err)
    })
}
const getArticlesByTopic = (req, res, next) => {
  return Article.find({ belongs_to: req.params.topic })
    .then(articles => {
      articles ? res.send({ articles }) : next({ status: 404, msg: 'article not found' })
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: "not a valid topic" })
      else next(err)
    })
}

module.exports = { getTopics, getArticlesByTopic, postArticleToTopic }