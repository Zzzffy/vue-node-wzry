module.exports = (app) => {
  const express = require('express')
  // 需要使用子路由的时候就需要用到 router
  const router = express.Router({
    mergeParams: true // 只有写上这一行才能得到路径中的 resource
  })
  // 添加
  router.post('/', async (req, res) => {
    const rs = await req.Model.create(req.body)
    if (rs) {
      res.send({
        meta: {
          status: 201,
          msg: '添加成功！'
        },
        data: rs
      })
    } else {
      res.send({
        meta: {
          status: 500,
          msg: '添加失败！'
        },
        data: null
      })
    }
  })
  // 查询所有
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName == 'Category') {
      // 加上 .populate('parent') 就可以获取 parent整个的父级对象信息，而不只是一个父级id
      queryOptions.populate = 'parent'
    }
    const rs = await req.Model.find().setOptions(queryOptions).limit(10)
    if (rs) {
      res.send({
        meta: {
          status: 200,
          msg: '获取成功！'
        },
        data: rs
      })
    } else {
      res.send({
        meta: {
          status: 500,
          msg: '获取失败！'
        },
        data: null
      })
    }
  })
  // 查询单个
  router.get('/:id', async (req, res) => {
    const rs = await req.Model.findById(req.params.id)
    if (rs) {
      res.send({
        meta: {
          status: 201,
          msg: '获取成功！'
        },
        data: rs
      })
    } else {
      res.send({
        meta: {
          status: 500,
          msg: '获取失败！'
        },
        data: null
      })
    }
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const rs = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    if (rs) {
      res.send({
        meta: {
          status: 201,
          msg: '更新成功！'
        },
        data: rs
      })
    } else {
      res.send({
        meta: {
          status: 500,
          msg: '更新失败！'
        },
        data: null
      })
    }
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    const rs = await req.Model.findByIdAndDelete(req.params.id)
    if (rs) {
      res.send({
        meta: {
          status: 204,
          msg: '删除成功！'
        },
        data: rs
      })
    } else {
      res.send({
        meta: {
          status: 500,
          msg: '删除失败！'
        },
        data: null
      })
    }
  })
  //匹配以 /admin/api 开头的路由，将子路由挂载到上面
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 安装inflection插件方便进行大小写、单复数转换
    const modelName = require('inflection').classify(req.params.resource)
    // 有插件才能在req上挂载属性
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 图片处理插件 multer
  const multer = require('multer')
  // __dirname表示当前文件路径，注意路径拼接
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  // 单独写上传图片请求
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    // 有插件才能在req上挂载属性
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}