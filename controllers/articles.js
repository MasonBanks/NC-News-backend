const Article = require('../models/Article')
const Comment = require('../models/Comment')

const getArticles = (req, res, next) => {
  return Article.find()
    .then(articles => {
      res.status(200).send({ articles })
    })
}
const getCommentsByArticle = (req, res, next) => {
  return Comment.find({ belongs_to: req.params.article_id })
    .then(comments => {
      comments ? res.send({ comments }) : next({ status: 404, msg: 'comments not found' })
    })
    .catch(err => {
      if (err.name === 'CastError') next({
        status: 400,
        msg: "not a valid article"
      })
      else next(err)
    })
}

const addCommentToArticle = (req, res, next) => {
  return Comment.create({
    body: req.body.body,
    belongs_to: req.params.article_id,
    created_by: req.body.created_by
  })
    .then(comment => {
      comment ? res.status(201).send({ comment, msg: 'comment added' }) : next({ status: 404, msg: 'comment not added' })
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: "not a valid comment" })
      else next(err)
    })
}

const addAVote = (req, res, next) => {
  if (req.query.votes === 'up') {
    return Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: 1 } }, { new: true })
      .then(vote => {
        vote ? res.status(202).send({ vote, msg: 'vote added' }) : next({ status: 404, msg: 'vote not found' })
      })
  } else if (req.query.votes === 'down') {
    return Article.findByIdAndUpdate(req.params.article_id, { $inc: { vote: -1 } }, { new: true })
      .then(vote => {
        vote ? res.status(202).send({ vote, msg: 'vote added' }) : next({ status: 404, msg: 'vote not found' })
      })
  }
}

module.exports = { getArticles, addCommentToArticle, getCommentsByArticle, addAVote }