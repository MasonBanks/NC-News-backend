const articlesRouter = require('express').Router();
const { getArticles, getCommentsByArticle, addCommentToArticle, addAVote } = require('../controllers/articles');

articlesRouter.route('/')
  .get(getArticles)

articlesRouter.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(addCommentToArticle)

articlesRouter.route('/:article_id')
  .put(addAVote)

module.exports = articlesRouter