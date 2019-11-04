<template lang="html">
  <div class="login-container">
    <div class="bg">
      <img src="../../assets/images/login-bj.png" class="bg-img" />
    </div>
    <div class="wrapper">
      <div class="title">登录</div>
      <div class="inputWrapper" flex="cross:center">
        <i class="iconfont iconyonghu"></i>
        <input class="input" flex-box="1" maxlength="11" placeholder="请输入账号" type="text" v-model="mobile">
      </div>
      <div class="inputWrapper" flex="cross:center">
        <i class="iconfont iconmima"></i>
        <input class="input" flex-box="1" maxlength="20" placeholder="请输入密码" type="password" v-model="password">
      </div>
      <div class="error">{{errFont}}</div>
      <div class="btn" flex="main:center cross:center" @click="login">登录</div>
    </div>
  </div>
</template>

<script type="text/babel">
import { checkMobile } from '../../common/js/util'
const codeTest = /^d{4}$/;
export default {
  data () {
    return {
      mobile: '18268109191',
      password: '123456',
      font: '获取验证码',
      times: 60,
      intervalId: null,
      errFont: ''
    };
  },
  mounted () {
  },
  beforeDestroy () {
    this.initTimes();
  },
  methods: {
    initTimes () {
      clearInterval(this.intervalId);
      this.times = 60;
    },
    setTimes () {
      if (this.times < 60) return;
      this.initTimes();
      this.times = 59;
      this.intervalId = setInterval(() => {
        if (this.times <= 1) {
          this.initTimes();
          return;
        }
        this.times--;
      }, 1000)
    },
    checkLogin () {
      let str = '';
      if (!checkMobile(this.mobile)) {
        str = '请输入正确的手机号'
      } else if (this.code.trim() == '') {
        str = '请输入正确的密码'
      }
      this.errFont = str;
      return !str;
    },
    login () {
      this.$http.post(this.$apis.user.login, {
        'mobile': this.mobile,
        'password': this.$md5(this.password),
      }).then(res => {
        if (res.code == '200') {
          window.sessionStorage.setItem('accessToken', res.data)
          this.$router.push({
            name: 'data'
          })

        }
        this.$toast(res.msg)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
}

.bg {
  height: 50%;
  background: black;
  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  margin: auto;
  width: 540px;
  height: 396px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 0px rgba(161, 173, 187, 0.49);
  border-radius: 20px;
  background: #ffffff;
}
.title {
  color: #52575a;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 43px 0 10px;
}
.inputWrapper {
  height: 44px;
  width: 420px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  margin: 20px auto 0;
}
.input {
  width: 0;
  height: 100%;
  color: #333;
  font-size: 16px;
  padding: 0 20px;
  box-sizing: border-box;
}
.getCode {
  color: #ff6e39;
  font-size: 16px;
  margin-left: 20px;
  cursor: pointer;
}
.btn {
  width: 360px;
  height: 52px;
  background: #ff6e39;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  margin: 10px auto 0;
  cursor: pointer;
}
.error {
  color: #e11011;
  font-size: 14px;
  text-align: center;
  padding: 50px 0 0;
  height: 70px;
  box-sizing: border-box;
}
</style>
