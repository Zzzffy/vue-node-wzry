import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/Main.vue')
const CategoriesAdd = () => import('../views/CategoriesAdd.vue')
const CategoriesList = () => import('../views/CategoriesList.vue')

const ItemAdd = () => import('../views/ItemAdd.vue')
const ItemList = () => import('../views/ItemList.vue')

const HeroAdd = () => import('../views/HeroAdd.vue')
const HeroList = () => import('../views/HeroList.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
    // 分类管理
    path: '/categories/add',
    component: CategoriesAdd
  }, {
    path: '/categories/edit/:id',
    component: CategoriesAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/categories/list',
    component: CategoriesList
  }, {
    // 物品管理
    path: '/items/add',
    component: ItemAdd
  }, {
    path: '/items/edit/:id',
    component: ItemAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/items/list',
    component: ItemList
  }, {
    // 英雄管理
    path: '/heroes/add',
    component: HeroAdd
  }, {
    path: '/heroes/edit/:id',
    component: HeroAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/heroes/list',
    component: HeroList
  }]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router