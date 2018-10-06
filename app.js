const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const apiRouter = require('./routes/api');
const DB_URL = process.env.DB_URL || require('./config/index').DB_URL
const body_parser = require('body-parser')

app.use(cors())
app.use(body_parser.json())

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => { `app connected to ${DB_URL}` })

app.use('/api', apiRouter)

app.use('/*', (err, req, res, next) => {
  next({ status: 404, msg: 'Route not found' })
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    err.status = 400;
    err.msg = err.message;
  }
  res.status(err.status || 500).send({ msg: err.msg || "Internal server error!" })
})

module.exports = app;