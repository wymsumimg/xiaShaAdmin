import moment from 'moment'
export default {
  
  /**
   * 格式化金额
   * @param {number} amount - 金额
   * @param {number} [digits] - 小数位数
   * @return {string} 格式化后的数字，默认两位小数
   */
  currency(amount, digits = 2) {
    // const num = Math.pow(10, digits)
    const num = 10 ** digits
    const result = Math.round(amount * num) / num
    return `${result.toFixed(digits)}`
  },
  // 整数不保留小数
  currency1(amount, digits = 2) {
    // const num = Math.pow(10, digits)
    const num = 10 ** digits
    const result = Math.round(amount * num) / num
    if (result % 1 === 0) {
      return `${result}`
    }
    return `${result.toFixed(digits)}`
  },
  // 保留一位小数
  floatNum(amount) {
    const reg = /^(.*\..{2}).*$/
    const num = String(amount).replace(reg, '$1')
    return num
  },
  timeStr(str) {
    const arr = str.split(' ')
    return arr[0]
  },
  phoneHide(str) {
    const arr = str.split('')
    arr.splice(3, 6, '****')
    return arr.join('')
  },
  getTime(time) {
    if(!time) {
      return '暂无数据'
    }
    return moment(time).format('YYYY-MM-DD HH:mm')
  },
  getMoney(num, type) {
    num = parseFloat(num / 100)
    let IntNum = parseInt(num)
    var result = [ ], counter = 0;
    IntNum = (IntNum || 0).toString().split('');
    for (var i = IntNum.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(IntNum[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    num = (num || 0).toString().split('.')
    num = (num[1] || 0).toString().split('')
    result.push('.')
    for (let i = 0; i<2; i++){
      if(!num[i]){
        result.push('0')
      } else {
        result.push(num[i])
      }
    }
    return result.join('');
  },
  GMTToHour(time) {
    const date = new Date(time * 1000)
    const Str = `${(date.getHours() < 10 ? `0${(date.getHours())}` : date.getHours())}:${(date.getMinutes() < 10 ? `0${(date.getMinutes())}` : date.getMinutes())}`
    return Str
  },
}
