import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../src/network/http'
import '../src/assets/css/base.css'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadURL() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')