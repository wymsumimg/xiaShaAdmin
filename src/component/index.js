/*
 * @Desc: 注册所有组件 
 */
import Vue from 'vue'

import lPagination from './pagination/index.vue'
import lUpload from './upload/index.vue'
import lDialog from './dialog/index.vue'
import lProduct from './product/index.vue'
import textTips from './textTips/index.vue'

// component
Vue.component('lPagination', lPagination)
Vue.component('lUpload', lUpload)
Vue.component('lDialog', lDialog)
Vue.component('lProduct', lProduct)
Vue.component('textTips', textTips)
