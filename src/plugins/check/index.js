export default {
  install(Vue, options){
    Vue.prototype.checkValue = (val, callback) => {
      let ret = true
      for(let i in val) {
        if(!val[i][0] || val[i][0] == '') {
          Vue.prototype.$toast(`${val[i][1]}不能为空`)
          return false
        }
        if (val[i][2] == '1') {
          let list = val[i][3] || []
          ret = list.every(item => {
            return val[i][0] != (val[i][4] ? item[val[i][4]].id : item.id)
          })
          if (!ret) {
            Vue.prototype.$toast(`${val[i][1]}已存在,请重新选择`)
            return false
          }
        }
      }
      if(ret) {
        callback()
      }
    };
    // 数组去重
    Vue.prototype.unique = (arr, name) => {
      const res = new Map();
      return arr.filter((a) => !res.has(a[name]) && res.set(a[name], 1))
    }
  }
}
