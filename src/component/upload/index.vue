<template>
  <div class="newCard-item-upload" btn flex="cross:center main:center" :style="{'width':width + 'px', 'height':height + 'px'}" @click="imgClick">
    <img src="./images/puls.png" v-if="imgUrl==''" />
    <p v-if="imgUrl==''">{{name}}</p>
    <img :src='imgUrl' :style="{'width':width + 'px', 'height':height + 'px'}" style="object-fit: cover" v-else-if="type=='1'" />
    <video :src="imgUrl" :style="{'width':width + 'px', 'height':height + 'px'}" v-else></video>
    <input type="file" style="display: none;" ref="up_input" @change="upload" v-if="type=='1'" />
    <input type="file" ref="up_input" @change="fileChange($event)" style="display: none;" v-else>
    <div v-if="router=='shop' &&imgUrl != ''" class="newCard-item-btn" flex="cross:center main:center">点击更换</div>
  </div>
</template>


<script>
import OSS from 'ali-oss';
import Hash from 'hash.js';
import Vue from 'vue'
Vue.use(Hash)

export default {
  watch: {
  },
  props: {
    router: {
      type: String,
      default: '',
    },
    spec: {
      type: Object,
      default: () => {
        return {}
      },
    },
    name: {
      type: String,
      default: '上传图片',
    },
    width: {
      type: String,
      default: '80',
    },
    height: {
      type: String,
      default: '80',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '1',
    }
  },
  data() {
    return {
      oss: {},
    }
  },
  mounted() {
    if (this.type == '2') {
      this.getToken()
    }
  },
  methods: {
    fileChange(e) {
      let file = e.target.files[0];
      let storeAs = `oss/video/weiguan/product/${this.gethashcode()}`
      this.oss.put(storeAs, file).then((result) => {
        let url = result.url
        url = url.replace('https://best-hzjl.oss-cn-hangzhou.aliyuncs.com', "https://cdn.i31.com")
        this.$emit('update:imgUrl', url)
      }).catch(function (err) {
      });
    },
    getToken() {
      this.$http.get(`${this.$apis.common.getToken}?filePath=/oss/video/weiguan/product`).then(res => {
        this.oss = new OSS({
          'accessKeyId': res.data.accessKeyId,
          'accessKeySecret': res.data.accessKeySecret,
          'stsToken': res.data.accessToken,
          'bucket': res.data.bucket,
          'endpoint': res.data.endpoint,
          'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        });

      })
    },
    imgClick() {
      this.$refs.up_input.click()
    },
    upload(val) {
      let file = val.path[0].files[0];
      let formData = new FormData();
      formData.append('file', file)
      let _this = this
      _this.$http.post(_this.$apis.common.imgUpload, formData).then(res => {
        if (res.code == '200') {
          _this.$emit('update:imgUrl', res.data)
        }
      })
      return
      //    if (parseInt(file.size / 1024) > _this.spec.size) {
      //      _this.$toast(`请上传小于${_this.spec.size}的图片`)
      //      return
      //    }
      //    let reader = new FileReader();
      //    reader.onload = function (e) {
      //      let data = e.target.result;
      //      //加载图片获取图片真实宽度和高度
      //      let image = new Image();
      //      image.onload=function(){
      //          var width = image.width;
      //          var height = image.height;
      //          if (parseFloat(_this.spec.width / _this.spec.height) != parseFloat(width / height)) {
      //            _this.$toast(`请上传尺寸为${_this.spec.width}*${_this.spec.height}的图片`)
      //          } else {
      //            _this.$http.post(_this.$apis.common.imgUpload, formData).then(res => {
      //              if (res.code == '200') {
      //                _this.$emit('update:imgUrl', res.data)
      //              }
      //            })
      //          }
      //       };
      //      image.src= data;
      //    }
      //    reader.readAsDataURL(file);
    },
    hashCode(str) {
      let h = 0;
      let len = str.length;
      let t = 2147483648;
      for (let i = 0; i < len; i++) {
        h = 31 * h + str.charCodeAt(i);
        if (h > 2147483647) h %= t; //java int溢出则取模
      }
      /*let t = -2147483648 * 2;
       while (h > 2147483647) {
       h += t
       }*/
      return h;
    },
    randomWord(randomFlag, min, max) {
      let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    //获取hashcode
    gethashcode() {
      //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
      let timestamp = (new Date()).valueOf();
      let myRandom = this.randomWord(false, 30);
      let hashcode = this.hashCode(myRandom + timestamp.toString());
      return myRandom;
    }
  },
}
</script>
<style lang="scss" scoped>
.newCard-item-btn {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #ffffff;
}
.newCard-item-upload {
  background: #e1e1e1;
  width: 80px;
  position: relative;
  height: 80px;
  border: 1px solid rgba(225, 225, 225, 1);
  flex-direction: column;
  border-radius: 4px;
  margin-right: 20px;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
  p {
    font-size: 12px;
    color: #c0c3cf;
  }
}
</style>
