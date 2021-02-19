const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    // ref指定要关联的模型
    ref: 'Category' //当 parent和 Category中的 ObjectId相同时，就可以找出来
  }
})

// 子分类再关联新闻
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Article'
})
module.exports = mongoose.model('Category', schema)