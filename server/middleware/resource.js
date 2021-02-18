module.exports = options => {
  return async (req, res, next) => {
    // 安装inflection插件方便进行大小写、单复数转换
    const modelName = require('inflection').classify(req.params.resource)
    // 有插件才能在req上挂载属性
    req.Model = require(`../models/${modelName}`)
    next()
  }
}