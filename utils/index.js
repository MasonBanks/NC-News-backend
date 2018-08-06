const userData = require('../seed/devData/users');
const topicData = require('../seed/devData/topics');
const articleData = require('../seed/devData/articles');
const commentData = require('../seed/devData/comments');

exports.formatUserData = (userData) => {
  return userData.map((user) => {
    return {
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url
    }
  })
}
exports.formatTopicData = (topicData) => {
  return topicData.map((topic) => {
    return {
      title: topic.title,
      slug: topic.slug
    }
  })
}
exports.formatArticleData = (articleData, userDocs) => {
  return articleData.map((article) => {
    return {
      title: article.title,
      body: article.body,
      votes: article.votes,
      created_at: article.created_at,
      belongs_to: article.topic,
      created_by: userDocs.find((user) => {
        return user.username === article.created_by
      })._id
    }
  })
}
exports.formatCommentData = (commentData, articleDocs, userDocs) => {
  return commentData.map((comment) => {
    return {
      body: comment.body,
      votes: comment.votes,
      created_at: comment.created_at,
      belongs_to: articleDocs.find((article) => {
        return article.title === comment.belongs_to
      })._id,
      created_by: userDocs.find((user) => {
        return user.username === comment.created_by
      })._id
    }
  })
}