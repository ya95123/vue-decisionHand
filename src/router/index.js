import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '猜拳｜決定之手'
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
      title: '轉盤｜決定之手'
    }
  },
  {
    path: '/raffle',
    name: 'Raffle',
    component: () => import(/* webpackChunkName: "raffle" */ '../views/Raffle.vue'),
    meta: {
      title: '抽獎｜決定之手'
    }
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import(/* webpackChunkName: "group" */ '../views/Group.vue'),
    meta: {
      title: '組合｜決定之手'
    }
  },
  {
    path: '/bottle',
    name: 'Bottle',
    component: () => import(/* webpackChunkName: "bottle" */ '../views/Bottle.vue'),
    meta: {
      title: '酒瓶｜決定之手'
    }
  }
]

const router = new VueRouter({
  routes
})

// to 即將訪問的頁面
// from 是來源頁面
// next 是採取的導向動作
router.afterEach((to, from, next) => {
  document.title = to.meta.title
})

export default router
