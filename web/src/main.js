import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay
} from 'swiper/core'
import http from '../src/network/http'


import '../src/assets/scss/style.scss'
import 'swiper/swiper-bundle.css'
import './assets/iconfont/iconfont.css'

// 卡片组件
import Card from '../src/components/Card.vue'
import ListCard from '../src/components/ListCard.vue'
Vue.component('m-list-card', ListCard)
Vue.component('m-card', Card)

SwiperClass.use([Pagination, Mousewheel, Autoplay])
Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')