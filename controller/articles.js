const { Article, Comment } = require('../models/index');

exports.getArticles = (req, res, next) => {
  return Article
    .find()
    .populate('created_by')
    .lean()
    .then(articles => {
      return Promise.all(
        articles.map(article => {
          return Comment.countDocuments({ belongs_to: article._id }).exec()
        })
      )
        .then((count) => {
          const articlesWithCount = articles.map((article, index) => {
            return {
              ...article,
              count: count[index]
            }
          })
          res.send({ articles: articlesWithCount })
        })
    })
    .catch(err => {
      next(err)
    })
}
exports.getCommentsFromArticle = (req, res, next) => {
  return Comment.find({ belongs_to: req.params.article_id })
    .populate('created_by')
    .then(comments => {
      res.send({ comments })
    })
    .catch(err => {
      next(err)
    })
}
exports.addCommentToArticle = (req, res, next) => {
  return Comment.create({
    body: req.body.body,
    belongs_to: req.params.article_id,
    created_by: req.body.created_by
  })
    .then(comment =>
      Comment.findById(comment._id)
        .populate('created_by'))
    .then(comment => {
      res.status(201).send({ comment })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
}
exports.updateVote = (req, res, next) => {
  if (req.query.votes === 'up') {
    return Article.findByIdAndUpdate(req.params.article_id, { $inc: { 'votes': 1 } }, { new: true })
      .then(vote => {
        res.status(202).send({ vote })
      })
      .catch(err => next(err))
  } else if (req.query.votes === 'down') {
    return Article.findByIdAndUpdate(req.params.article_id, { $inc: { 'votes': -1 } }, { new: true })
      .then(vote => {
        res.status(202).send({ vote })
      })
      .catch(err => next(err))
  }
};
exports.getArticleByID = (req, res, next) => {
  return Article
    .findOne({ _id: req.params.article_id })
    .populate('created_by')
    .then(article => {
      res.send({ article })
    })
    .catch(err => next(err))
}