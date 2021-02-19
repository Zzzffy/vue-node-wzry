module.exports = (app) => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const User = require('../../models/AdminUser')
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
    // if (req.Model.modelName == 'Article') {
    //   for (const i of req.Model.parent) {
    //     queryOptions.populate = i
    //   }
    // }
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

  const authMiddleWare = require('../../middleware/auth')
  const resourceMiddleWare = require('../../middleware/resource')
  //匹配以 /admin/api 开头的路由，将子路由挂载到上面
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)

  // 图片处理插件 multer
  const multer = require('multer')
  // __dirname表示当前文件路径，注意路径拼接
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  // 单独写上传图片请求
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    // 有插件才能在req上挂载属性
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    // 1.查找用户
    const {
      username,
      password
    } = req.body
    const user = await User.findOne({
      username
    }).select('+password')
    assert(user, 422, '用户不存在！')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在！'
    //   })
    // }
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误！')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误！'
    //   })
    // }
    // 3. 返回token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      token,
      username
    })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}