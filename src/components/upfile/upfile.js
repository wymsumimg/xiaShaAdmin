import {
  getOssToken
} from '@/api/apis/oss'
import {
  TokenKeys
} from '@/utils/variable'
// import browserMD5File from 'browser-md5-file';
import {
  handleKey
} from '@/utils'
import co from 'co';
import OSS from 'ali-oss';

// const BMF = new browserMD5File();
export default {
  data() {
    return {
      increment: 0,
      fileIndex: {},
      hashIndex: {},
      percent: 0,
      filePath: '/',
      host: TokenKeys.OSS_DOMAIN
    };
  },
  props: {
    font: {
      default: "上传图片"
    },
    reUploadTimes: {
      default: 5
    },
    scale: {
      default: 1
    },
    ifMultiple: {
      default: false
    },
    acceptStr: {
      default: 'image/png,image/jpg,image/jpeg'
      // default: 'image/png,image/jpg,image/jpeg'
      // default: 'image/png,image/jpg,image/jpeg,\n' +
      //   '              video/mp4,audio/mp3,\n' +
      //   '              application/vnd.openxmlformats-officedocument.presentationml.presentation,\n' +
      //   '              application/vnd.ms-powerpoint,\n' +
      //   '              application/vnd.ms-excel,\n' +
      //   '              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,\n' +
      //   '              application/msword,\n' +
      //   '              application/vnd.openxmlformats-officedocument.wordprocessingml.document,\n' +
      //   '              application/pdf,\n' +
      //   '              text/plain'
    },
    ifPieces: {
      default: false
    },
    styleObj: {
      default () {
        return {};
      }
    },
    maxNum: {
      default: null
    },
    fileSize: {
      default: null
    },
    ifShowPercent: {
      default: false
    }
  },
  components: {},
  mounted() {
    this.dropInit();
  },
  computed: {},
  methods: {
    //添加到本地回调
    toLocal(item) {
      this.$emit("toLocalFuc", item, handleKey(item).type);
    },
    //上传成功回调
    uploadSuccess(file, result) {
      result.name = this.host + result.name;
      this.$emit("uploadSuccessFuc", file, result, handleKey(file).type);
    },
    uploadClick() {
      this.$refs.upload.click();
    },
    //上传中回调
    uploading(boolean) {
      this.$emit("uploadingFuc", boolean);
    },
    //上传失败回调
    uploadError(file, result) {
      this.$emit("uploadErrorFuc", file, result, handleKey(file).type);
    },
    initialize(file, id) {
      let video = document.createElement("video");
      video.onloadeddata = this.captureImage(video, id + ".jpeg");
      video.src = window.URL.createObjectURL(file);
    },
    captureImage(video, id) {
      video.onloadeddata = null;
      return () => {
        let canvas = document.createElement("canvas");
        canvas.width = video.videoWidth * this.scale;
        canvas.height = video.videoHeight * this.scale;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        let base64Url = canvas.toDataURL("image/png");
        window.URL.revokeObjectURL(video.src);
        let blobUrl = this.toBlobUrl(base64Url);
        this.toArrayBuffer(blobUrl, id);
      };
    },
    toArrayBuffer(blob, id) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = event => {
        let buffer = new OSS.Buffer(event.target.result);
        this.initOss(buffer, this.increment, id, true);
      };
    },
    toBlobUrl(base64Url) {
      var bytes = window.atob(base64Url.split(",")[1]); //去掉url的头，并转换为byte

      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: "image/png"
      });
    },
    /**
     * @describe 上传文件
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    upFile(obj) {
      if (!obj.files.length) return;
      this.increment++;
      this.fileIndex[this.increment] = 0;
      let files = Array.prototype.slice.call(obj.files);
      obj.value = null;
      this.initOss(files, this.increment);
    },
    /**
     * @describe 上传之前判断限制数目，并且返回带有文件id的files
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    fileAdded(files, increment) {
      if (files.length > this.maxNum && this.maxNum !== null) {
        this.$message({
          message: "上传个数超出限制",
          type: "info"
        });
        return;
      }
      this.hashIndex[increment] = 0;
      return new Promise((resolve, reject) => {
        this.getFileHash(files, increment, resolve, reject);
      });
    },
    checkLength(files, increment, resolve, reject) {
      if (this.hashIndex[increment] >= files.length) {
        resolve(files);
        return false;
      }
      return true;
    },
    checkSize(files, increment, resolve, reject) {
      if (this.fileSize !== null) {
        if (files[this.hashIndex[increment]].size > this.fileSize * 1024 * 1024) {
          this.$message.error(`上传文件的大小需小于${this.fileSize}M`);
          let newFiles = [];
          for (let val of files) {
            if (val.id) {
              newFiles.push(val);
            } else {
              break;
            }
          }
          resolve(newFiles);
          return false;
        }
      }
      return true;
    },
    //获取文件hash
    getFileHash(files, increment, resolve, reject) {
      if (!this.checkLength(files, increment, resolve, reject)) {
        return;
      }
      if (!this.checkSize(files, increment, resolve, reject)) {
        return;
      }
      files[this.hashIndex[increment]].id =
        this.filePath +
        new Date().getTime() +
        Math.floor(9000 * Math.random() + 1000) +
        "." +
        handleKey(files[this.hashIndex[increment]]).endType;
      this.toLocal(files[this.hashIndex[increment]]);
      this.hashIndex[increment]++;
      this.getFileHash(files, increment, resolve, reject);
    },
    /**
     * @describe 初始化oss
     *
     * @param    files 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    initOss(files, increment, id, cover) {
      let that = this;
      co(function* () {
        let res = yield getOssToken();
        let {
          code,
          data
        } = res;
        that.filePath = data.filePath;
        if (code != 200) return;
        let client = new OSS({
          secure: true,
          accessKeyId: data.accessKeyId,
          //OSSAccessKeyId: `${new Date().getTime()+Math.floor(9000*Math.random()+1000)}.${ext}`,
          accessKeySecret: data.accessKeySecret,
          stsToken: data.accessToken,
          bucket: data.bucket
        });
        if (cover) {
          that.ossPut(client, files, id);
        } else {
          that.uploading(true);
          let keyFiles = yield that.fileAdded(files, increment);
          if (keyFiles && keyFiles.length > 0) {
            that.ossSend(client, keyFiles, increment);
          }
        }
      }).catch(err => {});
    },
    ossPut(client, file, id) {
      co(function* () {
        let result = yield client.put(id, file);
      }).catch(function (err) {});
    },
    clearIndexFuc(increment) {
      this.$delete(this.fileIndex, increment);
      this.$delete(this.hashIndex, increment);
      sessionStorage.removeItem("checkpoint" + increment);
    },
    ossSend(client, files, increment) {
      if (this.fileIndex[increment] >= files.length) {
        this.clearIndexFuc(increment);
        this.uploading(false);
        return;
      }
      let that = this;
      co(function* () {
        sessionStorage.setItem("checkpoint" + increment, "");
        // retry 5 times
        let upFile = files[that.fileIndex[increment]];
        if (handleKey(upFile).type == 3) {
          that.initialize(upFile, upFile.id);
        }
        for (let i = 0; i < that.reUploadTimes; i++) {
          let result = yield client.multipartUpload(upFile.id, upFile, {
            checkpoint: sessionStorage.getItem("checkpoint" + increment) ?
              sessionStorage.getItem("checkpoint" + increment) :
              null,
            progress: function* (percentage, cpt) {
              that.percent = Math.floor(percentage * 100);
              that.$emit("uploadProcess", percentage);
              sessionStorage.setItem("checkpoint" + increment, cpt);
            }
          });
          if (result.res.status == 200 && result.res.statusCode == 200) {
            that.uploadSuccess(upFile, result);
            that.fileIndex[increment]++;
            that.ossSend(client, files, increment);
            if (that.fileIndex[increment] + 1 >= files.length) {
              that.uploading(false);
            }
            break; // break if success
          } else {
            if (i >= that.reUploadTimes - 1) {
              that.uploading(false);
              that.uploadError(upFile, result);
              that.$message.error("上传失败");
            }
          }
        }
      }).catch(err => {
        that.uploading(false);
        that.uploadError(files[that.fileIndex[increment]], err);
      });
    },

    //阻止drop默认事件
    dropInit() {
      document.addEventListener("drop", function (event) {
        let e = event || window.event;
        e.preventDefault();
      });
      document.addEventListener("dragleave", function (event) {
        let e = event || window.event;
        e.preventDefault();
      });
      document.addEventListener("dragenter", function (event) {
        let e = event || window.event;
        e.preventDefault();
      });
      document.addEventListener("dragover", function (event) {
        let e = event || window.event;
        e.preventDefault();
      });
    }
    /**
     * @describe 拖拽上传
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    // dragFile(event){
    //   let e=event|| window.event;
    //   let obj = e.dataTransfer.files;
    //   if (!obj.length)
    //     return;
    //   this.fileIndex[increment]=0;
    //   let files = Array.prototype.slice.call(obj.files);
    //   obj.value=null;
    //   this.initOss(files);
    // },
  }
};