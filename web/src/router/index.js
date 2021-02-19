import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/Main.vue')
const Home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
    path: '/home',
    component: Home
  }]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router