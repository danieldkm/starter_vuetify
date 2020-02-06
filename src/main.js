import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Home from './components/Home.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/home",
			component: Home
		},
	]
});

Vue.config.productionTip = false
new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
