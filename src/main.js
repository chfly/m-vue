import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './registerServiceWorker'
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
console.log('config', Vue.config)
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
