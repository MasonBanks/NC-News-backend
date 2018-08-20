const { Topic, Article, Comment } = require('../models/index');

exports.getTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
}
exports.getArticleByTopic = (req, res, next) => {
  return Article.find({ belongs_to: req.params.topic_slug }).lean()
    .then(articles => {
      return Promise.all(
        articles.map(article => {
          return Comment.countDocuments({ belongs_to: article._id }).exec()
        })
      )
        .then((count) => {
          const articlesWithCounts = articles.map((article, index) => {
            return {
              ...article,
              count: count[index]
            }
          })
          articles ? res.send({ articles: articlesWithCounts }) : next({ status: 404, msg: 'article not found' })
        })
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: "not a valid topic" })
      else next(err)
    })
}
exports.postArticleToTopic = (req, res, next) => {
  return Article.create({
    title: req.body.title,
    body: req.body.body,
    belongs_to: req.params.topic_slug,
    created_by: req.body.created_by
  })
    .then(post => {
      post ? res.status(201).send({ post, msg: 'article added' }) : next({ status: 404, msg: 'article not added' })
    })
    .catch(err => {
      next(err)
    })
}