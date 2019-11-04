import Vue from "vue";
import { div,mul } from "../../common/js/util"

/**
 * @author: langwenqi
 * @describe: accurate division
 * @param {Number} cent | dividend
 * @param {Number} per | divisor
 * @return {Number} the result of accurate division
 */

export function accDiv(cent = 0,per = 100) {
  return div(cent, per)
}

/**
 * @author: langwenqi
 * @describe: accurate multiplication
 * @param {Number} cent | multiplier
 * @param {Number} per | multiplier
 * @return {Number} the result of accurate multiplication
 */

export function accMul(cent = 0,per = 100) {
  return mul(cent, per)
}
const filters = {
  accDiv,
  accMul
};

/**
 * @author: langwenqi
 * @describe: set Vue filters
 * @param {Object} filters | the filters's callBack
 */

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
