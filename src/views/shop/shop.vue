<template>
  <div class="shop" v-if="productS">
    <div class="shop-title">商城配置</div>
    <div style="flex: 1" flex='dir:top'>
      <el-tabs v-model="activeName" style="flex: 1; margin: 0 40px;" flex='dir:top' value="second">
        <div class="shop-item1-title">
          <el-radio v-model="type" label="1">智能家具</el-radio>
          <el-radio v-model="type" label="2">宽带业务</el-radio>
        </div>
        <div class="shop-item1-add" v-for="(item, index) in bannerList" :key="index">
          <div class="shop-item1-addTitle" flex='cross:center'>
            <span></span>
            <p>banner - 0{{index + 1}}</p>
          </div>
          <l-upload width='316' height='136' :imgUrl.sync='item.imgUrl' router='shop' :spec='spec'></l-upload>
          <p class="shop-item1-addTips">建议尺寸：690X390,图片小于≤2M</p>
          <div class="shop-item1-addRadio" flex='cross:center'>
            <span>图片链接</span>
            <el-radio v-model="item.bannerType" :label="1">产品</el-radio>
            <el-radio v-model="item.bannerType" :label="0">无链接</el-radio>
          </div>
          <div class="shop-item1-addRadio" flex='cross:center' @click='productActive(item, index)' v-if="item.bannerType == '1'">
            <span></span>
            <div class="shop-item1-addBtn" btn v-if='item.productImg' flex='cross:center'>
              <img :src='item.productImg' />
              <p>{{item.productName}}</p>
            </div>
            <div class="shop-item1-addBtn" btn v-else>选择产品</div>
          </div>
          <div class="shop-item1-detBtn" btn @click='detBanner(key)'>删除</div>
        </div>
        <div class="shop-item1-btn" btn @click='setBanner'>保存</div>
      </el-tabs>
    </div>
    <l-dialog :dialogVisible.sync='dialogImg' title='当前小区业务员名片码' width='540px'>
      <div class="dialogBox">
        <img :src="img" class="img" id="images" />
        <div class="btnBox">
          <div :class="['btn',img ? 'save-btn' : 'gray-btn']" style="margin-right: 16px;" @click="save" btn>保存并下载</div>
          <div class="btn cancel-btn" @click="cancel" btn>取消</div>
        </div>
      </div>
    </l-dialog>
  </div>

  <div v-else style="padding: 0;">
    <l-product @upActive='upActive' :activeId='activeData.productId'></l-product>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      spec: {
        width: 690,
        height: 390,
        size: 2048,
      },
      dataList: [],
      productS: true,
      activeName: 'first',
      activeData: {},
      type: '1',
      dialogVisible: false,
      dialogImg: false,
      img: "",
      bannerList: [],
      bannerData: {},
      dialog: {
        title: '选择产品',
        width: '636px',
        center: false,
      },
      total: 0,
      listShow: false,
    };
  },
  watch: {
    type(val) {
      let list = val == '1' ? this.bannerData.furnishing : this.bannerData.broadband
      for (let i = 0; i < 3; i++) {
        if (!list[i]) {
          list.push({
            imgUrl: '',
            bannerType: 0,
            productId: '',
          })
        }
      }
      this.bannerList = list
    },
    bannerList: {
      handler(newVal) {
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    dataJson() {
      return {
        url: this.$apis.shop.list,
        listShow: this.listShow,
      }
    }
  },
  created() {
    this.$route.matched[1].query = 'house';
    this.activeName = this.$route.query.type == 'house' ? 'second' : 'first';
    this.banner();
  },
  methods: {
    setProductS() {
      this.productS = true
    },
    clickImg(url) {
      this.img = url;
      this.dialogImg = true;
    },
    save() {
      if (!this.img) {
        return
      }
      const image = new Image();
      // 解决跨域 canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        const event = new MouseEvent("click");
        a.download = name || "二维码";
        a.href = url;
        a.dispatchEvent(event);
      };
      image.src = document.getElementById("images").src
    },
    cancel() {
      this.dialogImg = false
    },
    detBanner(key) {
      this.$set(this.bannerList, key, { imgUrl: '', bannerType: 0, productId: '', })
    },
    delRegion(id) {
      this.$confirm('您确定要删除该小区吗？（删除后不可恢复）', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apis.shop.delRegion, {
          params: {
            id
          }
        }).then(res => {
          if (res.code == '200') {
            this.listShow = !this.listShow
          }
          this.$toast(res.msg)
          this.banner()
        })
      }).catch(() => {
      });
    },
    getTotal(val) {
      this.total = val
    },
    productActive(item, key) {
      item.key = key
      this.activeData = item
      this.productS = false
    },
    upActive(item) {
      let list = JSON.parse(JSON.stringify(this.bannerList))
      let key = this.activeData.key
      list[key].productId = item.id
      list[key].productImg = item.productImg
      list[key].productName = item.productName
      this.bannerList = list
      this.productS = true
    },
    setBanner() {
      for (let i in this.bannerList) {
        if (this.bannerList[i].bannerType == '1' && (!this.bannerList[i].productId || this.bannerList[i].productId == '')) {
          this.$toast('请选择产品')
          return
        }
      }
      let list = JSON.parse(JSON.stringify(this.bannerList))
      list = list.filter((item) => {
        return item.imgUrl != ''
      })
      if (list.length == 0) {
        this.$toast('请至少上传一个banner')
        return
      }
      this.$http.post(this.$apis.shop.setBanner, {
        type: this.type,
        bannerList: list
      }).then(res => {
        if (res.code == '200') {
          this.banner()
        }
        this.$toast(res.msg)
      })
    },
    banner() {
      this.$http.get(this.$apis.shop.banner).then(res => {
        if (res.code == '200') {
          if (res.data.furnishing.length == 3) {
            this.bannerList = this.type == '1' ? res.data.furnishing : res.data.broadband
          } else {
            let list = this.type == '1' ? res.data.furnishing : res.data.broadband
            for (let i = 0; i < 3; i++) {
              if (!list[i]) {
                list.push({
                  imgUrl: '',
                  bannerType: 0,
                  productId: '',
                })
              }
            }
            this.bannerList = list
          }
          this.bannerData = res.data
        }
      })
    }

  }
};
</script>
<style lang="scss" scoped>
.shop .el-tabs__content {
  flex: 1;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.shop .el-tabs__header {
  margin: 0;
}
.shop .el-tabs__nav-scroll {
  padding: 0 60px;
}

.dialogBox {
  .img {
    width: 262px;
    height: 262px;
    display: block;
    margin: 0 auto;
  }
  .btnBox {
    display: flex;
    justify-content: center;
    .btn {
      width: 200px;
      height: 52px;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      margin-top: 60px;
    }
    .gray-btn {
      background: rgba(163, 163, 163, 1);
      color: #ffffff;
    }
    .cancel-btn {
      background: #ffffff;
      color: #a3a3a3;
      border: 1px solid rgba(163, 163, 163, 1);
    }
    .save-btn {
      background: rgba(255, 110, 57, 1);
      color: #ffffff;
    }
  }
}
.shop {
  background: #fbfbfb !important;
  display: flex;
  padding: 0 !important;
  flex-direction: column;
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 40px;
  }
  &-item1 {
    flex: 1;
    padding: 0 60px;
    padding-bottom: 30px;
    &-btn {
      width: 100px;
      height: 40px;
      background: rgba(255, 110, 57, 1);
      border-radius: 12px;
      border: 1px solid rgba(227, 95, 37, 1);
      text-align: center;
      line-height: 38px;
      font-size: 14px;
      color: #ffffff;
      margin: 50px 0;
    }
    &-detBtn {
      width: 329px;
      height: 40px;
      border-radius: 12px;
      text-align: center;
      line-height: 38px;
      font-size: 14px;
      color: #999999;
      margin-top: 30px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
    &-addBtn {
      width: 234px;
      height: 52px;
      border-radius: 8px;
      border: 1px solid rgba(241, 241, 241, 1);
      text-align: center;
      line-height: 52px;
      font-size: 16px;
      color: #52575a;
      img {
        width: 50px;
        border-radius: 8px;
        display: block;
        margin-right: 10px;
        height: 50px;
      }
      p {
        font-size: 12px;
        color: #52575a;
        @include ellipsis(2);
      }
    }
    &-addRadio {
      margin-bottom: 11px;
      span {
        display: inline-block;
        width: 84px;
        font-size: 16px;
        color: #52575a;
      }
    }
    &-title {
      margin-bottom: 30px;
    }
    &-add {
      margin-bottom: 24px;
    }
    &-addTips {
      font-size: 12px;
      color: #c0c3cf;
      margin: 8px 0 24px 0;
    }
    &-addTitle {
      margin-bottom: 20px;
      span {
        width: 6px;
        height: 18px;
        background: rgba(255, 110, 57, 1);
        border-radius: 4px;
        margin-right: 6px;
      }
      p {
        font-size: 18px;
        color: #1b253a;
      }
    }
  }
}
</style>
