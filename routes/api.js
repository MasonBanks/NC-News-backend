const router = require('express').Router();
const articlesRouter = require('./articles.js');
const topicsRouter = require('./topics.js');
const commentsRouter = require('./comments.js');
const userRouter = require('./users.js');

router.use('/articles', articlesRouter)
router.use('/topics', topicsRouter)
router.use('/comments', commentsRouter)
router.use('/users', userRouter)

module.exports = router;