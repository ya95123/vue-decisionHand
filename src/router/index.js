import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '猜拳｜狄斯俊之手',
      login: false
    }
  },
  {
    path: '/wheel',
    name: 'Wheel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "wheel" */ '../views/Wheel.vue'),
    meta: {
      title: '轉盤｜狄斯俊之手',
      login: false
    }
  },
  {
    path: '/raffle',
    name: 'Raffle',
    component: () => import(/* webpackChunkName: "raffle" */ '../views/Raffle.vue'),
    meta: {
      title: '抽獎｜狄斯俊之手',
      login: false
    }
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import(/* webpackChunkName: "group" */ '../views/Group.vue'),
    meta: {
      title: '組合｜狄斯俊之手',
      login: true
    }
  },
  {
    path: '/bottle',
    name: 'Bottle',
    component: () => import(/* webpackChunkName: "bottle" */ '../views/Bottle.vue'),
    meta: {
      title: '酒瓶｜狄斯俊之手',
      login: false
    }
  }
]

const router = new VueRouter({
  routes
})

// to 即將訪問的頁面
// from 是來源頁面
// next 是採取的導向動作
router.beforeEach((to, from, next) => {
  // 如果要去的地方'需要登入'，且 user 尚未登入，就轉到 login 頁面
  if (to.meta.login && !store.state.user) {
    next('/')
  } else {
    // 有登入，就去到他自己的相簿裡
    next()
  }
})

router.afterEach((to, from) => {
  // 頁面名稱
  document.title = to.meta.title
})

export default router
