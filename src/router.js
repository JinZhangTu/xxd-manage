import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Xxd from './views/xxd.vue'
import './plugins/urlParams'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // name: 'home',
      // component: Home
      redirect: '/xxd'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '/Xxd',
      name: 'Xxd',
      component: Xxd
    }
  ]
})