<template>
  <div class="add">
    <div class="add-title" flex='cross:center'>小区设置＞
      <span>{{$route.query.type == 'edit' ? $route.meta.editTitle : $route.meta.addTitle}}</span>
    </div>
    <div class="add-body">
      <div class="add-body-item" flex>
        <p class="add-body-text">小区名称：</p>
        <el-input v-model="model.regionName" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='20'></el-input>
      </div>

      <div class="add-body-item" flex>
        <p class="add-body-text">业务员：</p>
        <el-input v-model="model.salesUserName" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='10'></el-input>
      </div>
      <div class="add-body-item" flex>
        <p class="add-body-text">业务员电话：</p>
        <el-input v-model="model.salesUserMobile" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='20'></el-input>
      </div>
      <div class="add-body-item" flex>
        <p class="add-body-text">物业公司名称：</p>
        <el-input v-model="model.wyUserUnit" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='20'></el-input>
      </div>
      <div class="add-body-item" flex>
        <p class="add-body-text">物业负责人：</p>
        <el-input v-model="model.wyUserName" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='10'></el-input>
      </div>
      <div class="add-body-item" flex>
        <p class="add-body-text">物业负责人电话：</p>
        <el-input v-model="model.wyUserMobile" placeholder='请输入' class="add-item-input" style='flex: 1;max-width: 600px;' :maxlength='20'></el-input>
      </div>

      <div class="add-body-item" flex>
        <p class="add-body-text">详细地址：</p>
        <el-input v-model="model.address" class="add-item-input" placeholder="请输入" type='textarea' :rows="4" style='flex: 1;max-width: 600px;'
          :maxlength='30'></el-input>
      </div>
      <div class="add-body-btn" @click="region" btn>{{$route.query.type == 'edit' ? '修改' : '添加'}}</div>
    </div>
    <l-dialog :dialogVisible.sync='dialogVisible' title='当前小区业务员名片码' width='540px'>
      <div class="dialogBox">
        <img :src="img" class="img" id="images" />
        <div class="btnBox">
          <div :class="['btn',img ? 'save-btn' : 'gray-btn']" style="margin-right: 16px;" @click="save" btn>保存并下载</div>
          <div class="btn cancel-btn" @click="cancel" btn>取消</div>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      model: {
        address: "",
        regionName: "",
        salesUserName: "",
        salesUserMobile: "",
        wyUserName: "",
        wyUserMobile: "",
        isDisabled: false,
      },
      dialogVisible: false,
      loading: true,
      img: ""
    };
  },
  created() {
    if (this.$route.query.item) {
      this.model = JSON.parse(this.$route.query.item);
    }
  },
  methods: {
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
      this.dialogVisible = false
    },
    update() {
      this.$http
        .post(this.$apis.shop.update, {
          ...this.model
        })
        .then(res => {
          this.isDisabled = false;
          this.$toast(res.msg);
          this.$router.push({ path: '/shop', query: { type: 'house' } })
        });
    },
    region() {

      if (this.model.regionName == "") {
        this.$toast("请输入小区名称");
        return;
      }
      if (this.model.salesUserName == "") {
        this.$toast("请输入业务员姓名");
        return;
      }
      if (this.model.salesUserMobile == "") {
        this.$toast("请输入业务人员电话");
        return;
      }
      if (this.model.wyUserName == "") {
        this.$toast("请输入物业负责人姓名");
        return;
      }
      if (this.model.wyUserMobile == "") {
        this.$toast("请输入物业负责人电话");
        return;
      }
      if (this.model.address == "") {
        this.$toast("请输入详细地址");
        return;
      }
      if (this.isDisabled) {
        this.$toast("请勿重复点击");
        return;
      }
      this.isDisabled = true;

      // 修改小区
      if (this.$route.query.item) {
        this.update();
        return;
      }
      // 新增小区
      this.$http
        .post(this.$apis.shop.region, {
          ...this.model
        })
        .then(res => {
          this.isDisabled = false;
          this.$toast(res.msg);
          this.img = res.data.qrUrl;
          this.dialogVisible = true;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.add {
  &-body {
    margin-top: 20px;
    margin-left: 190px;
    &-btn {
      width: 360px;
      height: 52px;
      background: rgba(255, 110, 57, 1);
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      font-size: 18px;
      margin-top: 60px;
    }
    &-text {
      font-size: 14px;
      line-height: 40px;
      margin-right: 11px;
      width: 120px;
      text-align: right;
    }
    &-item {
      margin-bottom: 30px;
    }
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
    span {
      font-size: 26px;
      color: #666666;
    }
  }
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
</style>
