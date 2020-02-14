import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { siteKey: '6LdnH8cUAAAAAFTsfCqN722Mb3eSvYDn7qOtQ4sS' })

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')