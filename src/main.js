import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import './plugins/axios'
import './plugins/urlParams'

import './assets/css/common.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')