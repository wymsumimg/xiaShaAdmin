import axios from './config'
import {
  getType
} from '@/common/js/object'
import {
  getApiSign
} from '@/common/js/apiSign'
import {
  TokenKeys
} from '@/common/js/variable'
import {
  Loading,
  Message
} from 'element-ui';
let loadingInstance = null;
// 请求拦截
axios.interceptors.request.use(function (config) {

  config.params = config.params ? config.params : {};
  if (config.loading) {
    loadingInstance = Loading.service({
      fullscreen: true
    });
  }
  return continueDone();

  function continueDone() {
    let accessToken = localStorage.getItem(TokenKeys.ACCESS_TOKEN);
    if (config.method === 'get') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let apiSign = getApiSign(config.params);
      config.params = Object.assign({}, config.params, {
        apiSign
      })
    } else if (config.method === 'post') {
      if (config.headers['Content-Type'] != 'multipart/form-data') {
        let apiSign = getApiSign(config.data);
        config.data = Object.assign({}, config.data, {
          apiSign
        })
      }
    }
    config.headers[TokenKeys.ACCESS_TOKEN] = accessToken;
    return config
  }
}, function (error) {
  return Promise.reject(error)
});
// 响应拦截
axios.interceptors.response.use(function (response) {
  if (getType(response) == 'object') {
    response = response.data;
    if (response.code != 10000) {
      if ([50004, 50005, 50006, 50007, 20021].indexOf(response.code) < 0 && response.msg) {
        Message.error(response.msg);
      }
    }
  }
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
  return response

}, function (error) {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
  return Promise.reject(error)
});
axios.install = (Vue) => {
  Vue.prototype.$http = axios
}
export default axios