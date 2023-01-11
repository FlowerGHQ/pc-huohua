import Vue from 'vue'
import App from './App.vue'
import routers from './router'
import store from './store'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import './fonts/font.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible'
import Toast from 'toast-component11'
import './public-path';
Vue.use(ElementUI)
Vue.use(Toast)
Vue.config.productionTip = false
// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app')
let router = null;
let instance = null;
// 提交一次
// 提交两次
// 提交三次

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routers,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
