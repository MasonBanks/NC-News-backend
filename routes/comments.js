const commentsRouter = require('express').Router();
const { commentVote, deleteComment, getAllComments } = require('../controller/comments');

commentsRouter.route('/:comment_id')
  .put(commentVote)
  .delete(deleteComment)

commentsRouter.route('/')
  .get(getAllComments)

module.exports = commentsRouter