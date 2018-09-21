const { Comment } = require('../models/index')

exports.commentVote = (req, res, next) => {
  if (req.query.votes === 'up') {
    return Comment.findByIdAndUpdate(req.params.comment_id, { $inc: { 'votes': 1 } }, { new: true })
      .then(vote => {
        res.status(202).send({ vote })
      })
      .catch(err => next(err))
  } else if (req.query.votes === 'down') {
    return Comment.findByIdAndUpdate(req.params.comment_id, { $inc: { 'votes': -1 } }, { new: true })
      .then(vote => {
        res.status(202).send({ vote })
      })
      .catch(err => next(err))
  }
}
exports.deleteComment = (req, res, next) => {
  return Comment.findByIdAndRemove({ _id: req.params.comment_id })
    .then(comment => {
      res.status(202).send({ comment })
    })
}
exports.getAllComments = (req, res, next) => {
  return Comment
    .find()
    .populate('created_by')
    .then(comments => {
      res.status(200).send({ comments })
    })
}