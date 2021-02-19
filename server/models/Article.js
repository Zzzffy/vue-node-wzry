const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  parent: [{
    type: mongoose.SchemaTypes.ObjectId,
    // ref指定要关联的模型
    ref: 'Category' //当 parent和 Category中的 ObjectId相同时，就可以找出来
  }]
}, {
  timestamps: true //时间戳，会自带两个字段：创建和修改数据时间
})
module.exports = mongoose.model('Article', schema)