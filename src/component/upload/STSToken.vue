<template>
  <div class="container">
    <input type="file" id="fileUpload" @change="fileChange($event)" style="display: block;">

  </div>
</template>

<script>
import OSS from 'ali-oss';

export default {
  data() {
    return {
      oss: {},
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    fileChange(e) {
      var file = e.target.files[0];
      var storeAs = 'upload-file';
      this.oss.put(storeAs, file).then(function (result) {
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
    }
  }
}
</script>