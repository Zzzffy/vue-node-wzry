const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false,    //不会出现密码，也就不会对密码重复进行散列
    // 对密码进行散列
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
module.exports = mongoose.model('AdminUser', schema)