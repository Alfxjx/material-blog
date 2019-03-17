import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import archive from './views/archive'
import about from './views/about'
import login from './views/login'
import page from './views/page'
import edit from './views/edit'
import register from './views/register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/blog',
      props: {tabColor: 'transparent', fontColor: 'black'}
    },
    {
      path: '/blog',
      component: index,
      props: {tabColor: 'transparent', fontColor: 'black'}
    },
    {
      path: '/blog/:id',
      component: page,
      props: true
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
    },
    {
      path: '/edit',
      component: edit
    },
    {
      path: '/reg',
      component: register
    }
  ]
})
