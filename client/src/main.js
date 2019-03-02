import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  'el': '#app',
  data() {
    return {value: ''}
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
