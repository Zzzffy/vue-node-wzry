import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Main = () => import('../views/Main.vue')

const CategoriesAdd = () => import('../views/category/CategoriesAdd.vue')
const CategoriesList = () => import('../views/category/CategoriesList.vue')

const ItemAdd = () => import('../views/item/ItemAdd.vue')
const ItemList = () => import('../views/item/ItemList.vue')

const HeroAdd = () => import('../views/hero/HeroAdd.vue')
const HeroList = () => import('../views/hero/HeroList.vue')

const ArticleAdd = () => import('../views/article/ArticleAdd.vue')
const ArticleList = () => import('../views/article/ArticleList.vue')

const AdAdd = () => import('../views/add/AdAdd.vue')
const AdList = () => import('../views/add/AdList.vue')

const AdminUserAdd = () => import('../views/admin-user/AdminUserAdd.vue')
const AdminUserList = () => import('../views/admin-user/AdminUserList.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    isPublic: true
  }
}, {
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
  }, {
    // 文章管理
    path: '/articles/add',
    component: ArticleAdd
  }, {
    path: '/articles/edit/:id',
    component: ArticleAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/articles/list',
    component: ArticleList
  }, {
    // 广告位管理
    path: '/ads/add',
    component: AdAdd
  }, {
    path: '/ads/edit/:id',
    component: AdAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/ads/list',
    component: AdList
  }, {
    // 管理员管理
    path: '/admin_user/add',
    component: AdminUserAdd
  }, {
    path: '/admin_user/edit/:id',
    component: AdminUserAdd,
    props: true //表示将路径中的参数id注入到组件当中
  }, {
    path: '/admin_user/list',
    component: AdminUserList
  }]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
// to 将要访问的路径
// from 从哪个路径跳转
// next是一个函数，表示放行 带参数的话表示跳转到特定页面

router.beforeEach((to, from, next) => {
  // 如果不是登录页面并且token为空，则跳转到登录页面
  if (!to.meta.isPublic && !sessionStorage.getItem('token')) {
    return next('/login')
  }
  // 否则放行
  next()
})

export default router