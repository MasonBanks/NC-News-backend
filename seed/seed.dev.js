
const mongoose = require('mongoose');
const seedDB = require('./seed');
const data = require('./devData/index');
const { DB_URL } = require('../config');

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => seedDB(data)
  )
  .then(() => mongoose.disconnect()
  )