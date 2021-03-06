/**
 * @file Axios的Vue插件（添加全局请求/响应拦截器）
 */
// https://github.com/mzabriskie/axios
// import Vues from 'vue'
import axios from 'axios'
import qs from 'qs'
// import sesstionStorage from 'utils/session-storage'
import router from '../router'
import store from '../store'
import Vue from 'vue'
// 依据根目录为请求点
axios.defaults.baseURL = '/'
axios.interceptors.request.use((config, model) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  let accessToken = window.sessionStorage.getItem('accessToken')
  if (config.url != 'weiGuan/crm/login') {
    config.headers['accessToken'] = accessToken
  }
  // 上传文件时的编码
  // config.headers['Content-Type'] = 'multipart/form-data'
  // 的默认form表单格式
  //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //// 将json数据处理成传统的formdata格式，否则后台接收不到
  //config.transformRequest = [(data) => {
  //  return qs.stringify(data)
  //}]
  return config
})

axios.interceptors.response.use((response) => {
  const routeUrl = response.request.responseURL || response.config.url
  const {
    data
  } = response
  const statusCode = data.code ? data.code : data.success
  switch (statusCode) {
    case 'success':
    case 'false':
    case 2001:
    case 2002:
      return data
    case 1003:
    case 200:
    case 500:
      return data
    case 10000:
    case false:
    case true:
    case 'true':
      return data
    case 4010:
      return data
      // router.push({
      //   path: '/error/no-net',
      //   query: { redirect: data.message },
      // })
    case 20001:
      router.push({
        path: '/error/no-product',
        query: {
          redirect: router.currentRoute.fullPath
        },
      })
      break
    case 50004:
      // 不需要登录才能查看的，要用 nologin 字段控制

      if (!/nologin/ig.test(routeUrl)) {
        router.push({
          path: '/login',
        })
      }
      break
    case 4011:
      // 不需要登录才能查看的，要用 nologin 字段控制
      if (!/nologin/ig.test(routeUrl)) {
        router.push({
          path: '/login',
        })
      }
      break

    default:
      if (data.msg && data.msg != '') {
        Vue.prototype.$toast(data.msg)
      }
  }
  throw data.msg
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break
      case 20001:
        err.message = '该商品不存在'
        router.push({
          path: '/error/no-product',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break
      case 408:
        err.message = '请求超时'
        break

        // case 500:
        //   err.message = '服务器内部错误'
        //   router.push({
        //     path: '/error/no-net',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     },
        //   })
        //   break

      case 501:
        err.message = '服务未实现'
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break

      case 502:
        err.message = '网关错误'
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break

      case 503:
        err.message = '服务不可用'
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break

      case 504:
        err.message = '网关超时'
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        router.push({
          path: '/error/no-net',
          query: {
            redirect: router.currentRoute.fullPath
          },
        })
        break

      default:
    }
  }
  return Promise.reject(err)
})
axios.install = (Vue) => {
  Vue.prototype.$http = axios
}

export default axios