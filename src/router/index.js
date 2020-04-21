import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/game/:playerId',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/eddy',
    name: 'Eddy',
    component: () => import('../views/TestEddy.vue')
  },
  {
    path: '/francois',
    name: 'Francois',
    component: () => import('../views/TestFrancois.vue')
  },
  {
    path: '/hugues',
    name: 'Hugues',
    component: () => import('../views/TestHugues.vue')
  },
  {
    path: '/kevin',
    name: 'Kevin',
    component: () => import('../views/TestKevin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
