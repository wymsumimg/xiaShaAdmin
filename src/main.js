import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './common/style/element.css';
import './common/style/flex.scss'
import './common/style/common.scss'
import './common/style/iconfont.css'
import {
  TokenKeys
} from './common/js/variable'
import {
  getSessionToken
} from './common/js/auth'
require('./index')
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import common from './mixins/common'
import md5 from 'js-md5'
Vue.mixin(common)
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  if (to.fullPath == '/login') {
    localStorage.removeItem(TokenKeys.ACCESS_TOKEN);
  }
  if (to.fullPath != '/login' && !getSessionToken()) {
    // token过期跳转到登录页（做登录之后把下面放开）
    // next({ path: '/login' })
    next()
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');