<template lang="html">
    <div class="headerContainer" flex="cross:center main:justify">
        <div class="title" flex-box="0">腾宇通信小程序管理后台</div>
        <div class="right" flex="cross:center" flex-box="0">
            <div class="userPhoto">
                <img :src="photo" alt="">
            </div>
            <div class="font16">{{user.name}}</div>
            <div class="line"></div>
            <div flex-box="0" flex="cross:center" @click="logout">
                <div class="icon2" flex-box="0"></div>
                <div class="font14" flex-box="0">退出</div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
import { TokenKeys } from "../../common/js/variable";

export default {
  data() {
    return {
      photo: TokenKeys.DEFAULT_USER_PHOTO,
      user: {},
    };
  },
  mounted() {
    this.info()

  },
  methods: {
    info() {
      this.$http.get(this.$apis.user.info).then(res => {
        if (res.code == '200') {
          this.user = res.data
        }
      })
    },
    logout2() {
      this.$http.get(this.$apis.user.logout).then(res => {
        if (res.code == '200') {
          this.$router.push({
            name: 'Login'
          })
        }
        this.$toast(res.msg)
      })
    },
    logout() {
      this.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout2()
      }).catch(() => {

      });
    }
  }
};
</script>

<style lang="scss" scoped>
.headerContainer {
  height: 64px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 9;
  padding: 0 22px 0;
}
.title {
  color: #ff6e39;
  font-size: 24px;
  font-family: FZQKBYSJW--GB1-0;
}
.font16 {
  font-size: 16px;
  color: #1b253a;
  margin-left: 7px;
  cursor: pointer;
}
.font14 {
  color: #52575a;
  font-size: 14px;
  margin-left: 4px;
  cursor: pointer;
}
.userPhoto {
  margin-left: 45px;
  border-radius: 100%;
  @include imgBox(34px, 34px);
}
.line {
  width: 1px;
  height: 16px;
  background: #f0f1f2;
  margin: 0 7px 0 10px;
}
@mixin icon($url) {
  width: 18px;
  height: 18px;
  background: url("./images/#{$url}.png") no-repeat center center/contain;
  cursor: pointer;
}
.icon1 {
  @include icon("setting");
}
.icon2 {
  @include icon("close");
}
/*.setting{*/
/*width:16px;*/
/*height: 16px;*/
/*background: url(".");*/
/*}*/
/*.logout{*/

/*}*/
</style>
