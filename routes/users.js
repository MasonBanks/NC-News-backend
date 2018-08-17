const usersRouter = require('express').Router();
const { getAllUsers, getUserInfo } = require('../controller/users')

usersRouter.route('/')
  .get(getAllUsers)

usersRouter.route('/:user_id')
  .get(getUserInfo)

module.exports = usersRouter