module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost/node-vue-wzry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
