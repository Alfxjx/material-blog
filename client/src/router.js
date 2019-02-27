import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index'
import archive from './components/archive'
import about from './components/about'
import login from './components/login'

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
