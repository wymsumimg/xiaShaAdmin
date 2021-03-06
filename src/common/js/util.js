import EXIF from 'exif-js'
/**
 * @author: langwenqi
 * @describe: get width for start a newline with canvas
 * @param {String} text | the text will draw on canvas
 * @param {Number} maxWidth | to start a newline more than maxWidth
 * @param {Number} fontSize
 * @return {Array} the lines split by maxWidth
 */

export function measureCanvasFont(text, maxWidth, fontSize) {
  let measureCanvas = document.createElement("canvas");
  let measureCtx = measureCanvas.getContext("2d");
  if (!text) {
    return [];
  }
  let chr = text.split("");
  let temp = "";
  let row = [];
  for (var a = 0; a < chr.length; a++) {
    if (measureCtx.measureText(temp).width < maxWidth - 2 * fontSize) {
      temp += chr[a];
    } else {
      a--;
      row.push(temp);
      temp = "";
    }
  }
  row.push(temp);
  measureCtx = null;
  measureCanvas - null;
  return row
}

/**
 * @author: langwenqi
 * @describe: make utf16 to utf8
 * @param {String} str | utf16
 * @return {String} utf8
 */

export function utf16toEntities(str) {
  if (!str) {
    return str
  }
  let patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    let H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
      // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}

/**
 * @author: langwenqi
 * @describe: make utf8 to utf16
 * @param {String} str | utf8
 * @return {String} utf16
 */

export function entitiestoUtf16(str) {
  if (!str) {
    return ''
  }
  // 检测出形如&#12345;形式的字符串
  let strObj = utf16toEntities(str);
  let patt = /&#\d+;/g;
  let H, L, code;
  let arr = strObj.match(patt) || [];
  for (let i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    // 低位
    L = (code - 0x10000) % 0x400 + 0xDC00;
    code = "&#" + code + ";";
    let s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
}

/**
 * @author: langwenqi
 * @describe: make form string to html string
 * @param {String} str | form string
 * @return {String} html string
 */

export function getHtmlData(str) {
  if (!str) {
    return '';
  }
  const newStr = entitiestoUtf16(str).replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
  return newStr;
}

/**
 * @author: langwenqi
 * @describe: check form submit of phone
 * @param {String} phone | form string
 * @return {Boolean} result
 */

export function checkPhone(phone) {
  const reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/;
  return reg.test(phone)
}

/**
 * @author: langwenqi
 * @describe: check form submit of string exclude emoji or '' or ! or string.trim() === ''
 * @param {String} str
 * @return {Boolean} result
 */

export function checkExpression(str) {
  const emoji = /[\ud800-\udbff][\udc00-\udfff]/;
  //   let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if ((!str) || emoji.test(str) || (str.trim() === '')) {
    return false;
  }
  return true;
}

/**
 * @author: langwenqi
 * @describe: check form submit of mobile
 * @param {String} mobile | form string
 * @return {Boolean} result
 */

export function checkMobile(mobile) {
  let reg = /^1[0-9]{10}$/;
  return reg.test(mobile)
}

/**
 * @author: langwenqi
 * @describe: get img's src in rich text
 * @param {String} strs | rich text
 * @return {Array} img's src
 */

export function getHtmlImg(strs) {
  let imgReg = /<img.*?(?:>|\/>)/gi;
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  let arr = [];
  if (strs && strs.trim()) {
    arr = strs.match(imgReg);
  }
  let arr_src = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg);
      //获取图片地址
      if (src[1]) {
        arr_src.push(src[1])
      }
    }
  }
  return arr_src;
}

/**
 * @author: langwenqi
 * @describe: get BytesLength of string
 * @param {String} strs
 * @return {Number} BytesLength
 */

export function getBytesLength(str) {
  // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
  return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

/**
 * @author: langwenqi
 * @describe: judge if integer and positive number
 * @param {String} strs
 * @return {Boolean} result
 */

export function isInteger(str) {
  var reg = /^\+?[1-9]\d*$/;
  return reg.test(str)
}

/**
 * @author: langwenqi
 * @describe: judge if positive number
 * @param {String} strs
 * @return {Boolean} result
 */

export function isPositiveNumber(str) {
  var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  return reg.test(str)

}

/**
 * @author: langwenqi
 * @describe: accurate multiplication
 * @param {Number} cent | multiplier
 * @param {Number} per | multiplier
 * @return {Number} the result of accurate multiplication
 */

export function mul(arg1 = 0, arg2 = 0) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * @author: langwenqi
 * @describe: accurate division
 * @param {Number} cent | dividend
 * @param {Number} per | divisor
 * @return {Number} the result of accurate division
 */

export function div(arg1 = 0, arg2 = 1) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * @author: langwenqi
 * @describe: rotate img
 * @param {ImageObject} image
 * @return {ImageObject} newImage
 */

export function rotateImage(image) {
  var width = image.width;
  var height = image.height;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');

  var newImage = new Image();
  let imageDate;
  //旋转图片操作
  EXIF.getData(image, function () {
    var orientation = EXIF.getTag(this, 'Orientation');
    // orientation = 6;//测试数据
    switch (orientation) {
      //正常状态
      case 1:
        // canvas.height = height;
        // canvas.width = width;
        newImage = image;
        break;
        //旋转90度
      case 6:
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, -height);

        ctx.drawImage(image, 0, 0)
        imageDate = canvas.toDataURL('Image/jpeg', 1)
        newImage.src = imageDate;
        break;
        //旋转180°
      case 3:
        canvas.height = height;
        canvas.width = width;
        ctx.rotate(Math.PI);
        ctx.translate(-width, -height);

        ctx.drawImage(image, 0, 0)
        imageDate = canvas.toDataURL('Image/jpeg', 1)
        newImage.src = imageDate;
        break;
        //旋转270°
      case 8:
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(-Math.PI / 2);
        ctx.translate(-height, 0);

        ctx.drawImage(image, 0, 0)
        imageDate = canvas.toDataURL('Image/jpeg', 1)
        newImage.src = imageDate;
        break;
        //undefined时不旋转
      case undefined:
        newImage = image;
        break;
      case 0:
        newImage = image;
        break;
      default:
        newImage = image;
        break;
    }
  });
  return newImage;
}

/**
 * @author: langwenqi
 * @describe: change txt to '' exclude Chinese,English and Number
 * @param {ImageObject} image
 * @return {ImageObject} newImage
 */

export function changeTxt(txt) {
  return txt.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
}

/**
 * @author: langwenqi
 * @describe: draw img
 * @param {Object} obj
 * @return {String} base64
 */

export const drawImg = (obj = {
  img: '',
  top: '',
  left: '',
  width: '',
  height: '',
  orgWidth: '',
  orgHeight: '',
  canvasWidth: '',
  canvasHeight: '',
  ifFit: false
}) => {
  let top = obj.top;
  let left = obj.left;
  let width = obj.width;
  let height = obj.height;

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  let initOne = () => {
    height = obj.height;
    width = obj.orgWidth * obj.height / obj.orgHeight;
    top = obj.top;
  };
  let initTwo = () => {
    width = obj.width;
    height = obj.orgHeight * obj.width / obj.orgWidth;
    left = obj.left;
  };
  if (obj.ifFit) {
    if (obj.orgWidth / obj.orgHeight > obj.width / obj.height) {
      initTwo();
      top = obj.top + (obj.height - height) / 2;
    } else {
      initOne();
      left = obj.left + (obj.width - width) / 2;
    }
  } else {
    if (obj.orgWidth / obj.orgHeight > obj.width / obj.height) {
      initOne();
      left = obj.left - (width - obj.width) / 2;
    } else {
      initTwo();
      top = obj.top - (height - obj.height) / 2;
    }
  }
  canvas.height = obj.canvasHeight;
  canvas.width = obj.canvasWidth;
  ctx.drawImage(obj.img, left, top, width, height);
  let url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  return url;
}

/**
 * @author: langwenqi
 * @describe: make data for handleKey
 * @param {Number} type | the type for file
 * @param {FileObject} file
 * @param {String} endType | the end of the file's name after .
 * @return {String} base64
 */

export function makeFileObj(type, file, endType) {
  let content = {};
  content.type = type;
  content.fileName = file.name;
  content.endType = endType;
  return content;
}

/**
 * @author: langwenqi
 * @describe: make data for file to upload to oss
 * @param {FileObject} file
 * @return {Object} result
 */

export function handleKey(file) {
  if (!file) {
    return {}
  }
  if (file.type.split('/')[0] == 'image') {
    return makeFileObj(1, file, file.type.split('/')[1]);
  } else if (file.type.split('/')[0] == 'video') {
    return makeFileObj(3, file, file.type.split('/')[1]);
  } else if (file.type.split('/')[1] == 'msword') {
    return makeFileObj(5, file, 'doc');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return makeFileObj(5, file, 'docx');
  } else if (file.type.split('/')[1] == 'vnd.ms-excel') {
    return makeFileObj(7, file, 'xls');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return makeFileObj(7, file, 'xlsx');
  } else if (file.type.split('/')[1] == 'vnd.ms-powerpoint') {
    return makeFileObj(8, file, 'ppt');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.presentationml.presentation') {
    return makeFileObj(8, file, 'pptx');
  } else if (file.type.split('/')[1] == 'pdf') {
    return makeFileObj(6, file, 'pdf');
  } else if (file.type.split('/')[1] == 'plain') {
    return makeFileObj(4, file, 'txt')
  } else if (file.type.split('/')[0] == 'audio') {
    return makeFileObj(9, file, file.type.split('/')[1]);
  } else {
    return makeFileObj(127, file, file.type.split('/')[1]);
  }
}

/**
 * @author: langwenqi
 * @describe: handle oss filePath
 * @param {FileObject} file
 * @return {Object} result
 */

export function comPressFile(url) {
  return `${url}?x-oss-process=image/format,jpg/resize,w_400/auto-orient,1`
}

/**
 * @author: langwenqi
 * @describe: dateFormat
 * @param {DateObject} dateObj
 * @return {String} dateFormat
 */

export function dateFormat(dateObj, format) {
  if (!dateObj) return '';
  let date = dateObj;
  if (typeof dateObj != 'number') {
    date = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
    date = date.slice(0, dateObj.indexOf("."));
  }
  var o = {
    "y+": new Date(date).getFullYear(),
    "M+": new Date(date).getMonth() + 1,
    "d+": new Date(date).getDate(),
    "h+": new Date(date).getHours(),
    "m+": new Date(date).getMinutes(),
    "s+": new Date(date).getSeconds(),
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (new Date(date).getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}