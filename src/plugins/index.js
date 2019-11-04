import Vue from 'vue'
// import NisuComponents from '@position/nisu-components'
import VueAxios from './axios'
//import VueLoading from './loading'
import VueToast from './toast'
//import VueDialog from './dialog'
import VueCheck from './check'

// Vue.use(NisuComponents)
Vue.use(VueAxios)
Vue.use(VueCheck)
//Vue.use(VueDialog, {
//container: '#app',
//})
//Vue.use(VueLoading, {
//container: '#app',
//})
Vue.use(VueToast, {
container: '#app',
})
