import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
Vue.use(Router);

const route = new Router({
  // mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0,
    }
  },
})
export default route