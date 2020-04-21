import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import store from './store/index'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  watch: {
    $route (to) {
      // Changes the page's name (works)
      document.title = `Otter Quiz - ${to.name}`
    }
  }
}).$mount('#app')
