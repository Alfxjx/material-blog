import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import archive from './views/archive'
import about from './views/about'
import login from './views/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/archive',
      component: archive
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/login',
      component: login
    }
  ]
})
