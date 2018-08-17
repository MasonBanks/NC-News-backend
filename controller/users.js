const { User, Comment, Topic, Article } = require('../models/index');

exports.getAllUsers = (req, res, next) => {
  return User.find()
    .then(users => {
      res.status(200).send({ users })
    })
}

exports.getUserInfo = (req, res, next) => {
  return User.find({ _id: req.params.user_id })
    .then(user => {
      res.status(200).send({ user })
    })
    .catch(err => {
      err.status(404).send({ msg: err.msg })
    })
}