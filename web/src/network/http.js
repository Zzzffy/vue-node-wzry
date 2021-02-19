import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
  timeout: 5000
})

// axios请求拦截：为请求头对象添加Token验证的Authorization字段，保证拥有获取数据的权限
// http.interceptors.request.use(config => {
//   if (sessionStorage.getItem('token')) {
//     config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
//   }
//   return config
// })

// response拦截器，对客户端的错误进行拦截
// http.interceptors.response.use(res => {
//   return res
// }, err => {
//   if (err.response.data.message) {
//     Vue.prototype.$message({
//       type: 'error',
//       message: err.response.data.message
//     })
//   }
//   if(err.response.status == 401) {
//     router.push('/login')
//   }
//   return Promise.reject(err)
// })


export default http