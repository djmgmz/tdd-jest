const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/logindb';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(databaseURL, options);
}

module.exports = mongoose;
