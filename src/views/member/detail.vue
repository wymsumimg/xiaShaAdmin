<template>
  <div class="detail">
    <div flex="cross:center main:justify">
      <div class="detail-title">
        成员详情
      </div>
      <div flex>
        <router-link tag="div" :to="{name:'memberData'}" class="detail-btn" btn v-if="type" style="margin-right: 20px;">
          <i class="iconfont iconxiangxixinxi"></i>
          新增成员
        </router-link>
        <div btn @click='type=false' class="detail-btn">
          <i class="iconfont iconbianji"></i>编辑信息
        </div>
      </div>

    </div>
    <div class="detail-item" flex :style="[!imgUrl ? 'padding: 7px 11px 40px' : 'padding: 7px 11px']">
      <div class="detail-item-left">头像：</div>
      <div class="detail-item-right" style="line-height: 0;">
        <img :src="imgUrl" style="width: 124px;height: 124px;" v-if='type' />
        <div class="hint" v-if="imgUrl && !type">点击更换头像</div>
        <l-upload width='124' height='124' :imgUrl.sync='imgUrl' :spec='spec' v-if='!type'></l-upload>
        <!-- <text-tips :spec='spec' v-if='!imgUrl'></text-tips> -->
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">姓名：</div>
      <div class="detail-item-right">
        <span v-if='type'>{{model.userName}}</span>
        <el-input v-model="model.userName" style='width: 270px;' :maxlength='5' v-else></el-input>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">职位：</div>
      <div class="detail-item-right">
        <span v-if='type'>{{model.position}}</span>
        <el-input v-model="model.position" style='width: 270px;' :maxlength='20' v-else></el-input>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">电话：</div>
      <div class="detail-item-right">
        <span v-if='type'>{{model.mobile}}</span>
        <el-input v-model="model.mobile" style='width: 270px;' :maxlength='11' v-else></el-input>
      </div>
    </div>
    <div :class="btnClass" btn @click="update" v-if="!type" disabled>保存</div>
  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      model: {},
      imgUrl: '',
      type: true,
      spec: {
        width: 112,
        height: 112,
        size: '500K',
      },
      regionList: [],
      isDisabled: false,
      acceptOrderNum: 0,
      highOpinionNum: 0,
      badNum: 0
    };
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    btnClass() {
      return this.imgUrl && this.model.userName && this.model.position && this.model.mobile ?
        'detail-item-btn' : 'detail-item-disabled-btn'
    }
  },
  created() {
    // if (this.id) {
    //   this.info(this.id)
    // } else {
    //   this.type = false
    // }
  },
  methods: {
    info(id) {
      this.$http.get(`${this.$apis.member.detail}?id=${id}`).then(res => {
        if (res.code == '200') {
          this.model = res.data.userDTO;
          this.imgUrl = res.data.userDTO.photoUrl;
          this.regionList = res.data.regionList;
          this.acceptOrderNum = res.data.acceptOrderNum;
          this.highOpinionNum = res.data.highOpinionNum;
          this.badNum = res.data.badNum;
        }
      })
    },
    update() {
      if (this.imgUrl == "") {
        this.$toast("请添加头像");
        return;
      }
      if (this.model.userName == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (this.model.position == "") {
        this.$toast("请输入职位");
        return;
      }
      if (this.model.mobile == "" || this.model.mobile.length != 11) {
        this.$toast("请添加正确的联系方式");
        return;
      }
      if (this.isDisabled) {
        this.$toast("请勿重复点击");
        return;
      }
      this.isDisabled = true;

      this.$http.post(this.$apis.member.update, {
        ...this.model,
        state: 2,
        photoUrl: this.imgUrl,
      }).then(res => {
        if (res.code == '200') {
          this.info(res.data)
          this.type = true
        }
        this.$toast(res.msg)
        this.isDisabled = false;
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  &-item {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 7px 11px;
    &-btn {
      width: 360px;
      height: 52px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      font-size: 18px;
      margin-top: 95px;
      background: rgba(255, 110, 57, 1);
      border-radius: 10px;
      border: 1px solid rgba(227, 95, 37, 1);
    }
    &-disabled-btn {
      width: 360px;
      height: 52px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      margin-top: 95px;
      border-radius: 10px;
      background: rgba(235, 237, 241, 1);
      border: 1px solid rgba(225, 225, 225, 1);
      color: #e1e1e1;
    }
    &-left {
      min-width: 102px;
      line-height: 40px;
    }
    &-right {
      font-size: 14px;
      color: #52575a;
      line-height: 40px;
      position: relative;
      .hint {
        width: 124px;
        color: #fff;
        position: absolute;
        line-height: 20px;
        top: 57px;
        text-align: center;
        z-index: 20;
      }
      .house {
        width: 300px;
      }
      .tips {
        bottom: -35px;
      }
    }
  }
  &-paddingBottom {
    padding-bottom: 50px;
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding-top: 30px;
    padding-bottom: 5px;
    text-indent: 9px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  &-btn {
    width: 120px;
    height: 40px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 110, 57, 1);
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ff6e39;
    i {
      margin-right: 5px;
    }
  }
  &-btn2 {
    width: 120px;
    height: 40px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 110, 57, 1);
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ff6e39;
    i {
      margin-right: 5px;
    }
  }
}
</style>
