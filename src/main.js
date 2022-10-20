import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './fonts/font.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible'
import Toast from 'toast-component11'
Vue.use(ElementUI)
Vue.use(Toast)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
