const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/api');
const { DB_URL } = require('./config/index')
const body_parser = require('body-parser')

app.use(body_parser.json())

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => { `app connected to ${DB_URL}` })

app.use('/api', apiRouter)

module.exports = app;