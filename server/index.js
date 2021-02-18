const express = require('express')
const app = express()

app.set('secret', 'awh2af6njf8ef') // 用于返回token

app.use(require('cors')()) // 解决跨域问题（npm install cors）
app.use(express.json()) // 把 post请求体解析为 json的中间件

require('../server/plugins/db')(app)
require('../server/routes/admin/router')(app)

app.use('/uploads', express.static(__dirname + '/uploads/'))


app.listen(3000, () => {
  console.log('running...');
})