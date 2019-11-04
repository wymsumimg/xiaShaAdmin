import Vue from 'vue'

const prefix = 'https://test.i31.com/weiGuan'

const apis = {
  common: {},
  user: {
    login: `${prefix}/crm/login`, // 登录
  },
}

Vue.prototype.$apis = apis