const router = require('express').Router();
const topicsRouter = require('./topics.js');
const articlesRouter = require('./articles.js');
// const commentsRouter = require('./comments.js');
// const usersRouter = require('./users.js')
// const { getHomepage } = require('../controllers/api.js')


// router.route('/')
//   .get(getHomepage)

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
// router.use('/comments', commentsRouter);
// router.use('/users', usersRouter);

module.exports = router;