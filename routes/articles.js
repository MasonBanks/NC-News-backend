const articlesRouter = require('express').Router();
const { getArticles, getCommentsFromArticle, addCommentToArticle, updateVote, getArticleByID } = require('../controller/articles');

articlesRouter.route('/')
  .get(getArticles)

articlesRouter.route(`/:article_id/comments`)
  .get(getCommentsFromArticle)
  .post(addCommentToArticle)

articlesRouter.route('/:article_id')
  .put(updateVote)
  .get(getArticleByID)

module.exports = articlesRouter