<template lang="html">
  <div class="message">
    <div class="message-item" flex="cross:center">
  		<div class="message-item-left">联系电话：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
          <el-input v-model="dataMessage.mobile" placeholder="请输入" class="message-item-inputValue" :maxlength='12'></el-input>
        </div>
  		</div>
  	</div>
  	<div class="message-item">
  		<div class="message-item-left">微信：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
  				<el-input v-model="dataMessage.wechat" placeholder="请输入" class="message-item-inputValue" :maxlength='20'></el-input>
  			</div>
  		</div>
  	</div>
  	<div class="message-item">
      <div class="message-item-left">公司地址：</div>
      <div class="message-item-right">
        <div class="message-item-input" flex="cross:center">
          <el-input v-model="dataMessage.address" class="message-item-inputValue" placeholder="请输入" type='textarea' :rows="3" :maxlength='50'></el-input>
        </div>
      </div>
    </div>
  	<div class="message-btn" btn flex="cross:center main:center" @click="saveInfo">
  		保存
  	</div>
  </div>
</template>

<script type="text/babel">
export default {
  components: {
  },
  data() {
    return {
      input: '',
      dataMessage: {},
    };
  },
  created() {
    this.info()
  },
  methods: {
    saveInfo() {
      this.$http.post(this.$apis.company.saveInfo, {
        ...this.dataMessage
      }).then(res => {
        if (res.code == '200') {
          this.$toast(res.msg)
          this.$router.go(-1)
        }
      })
    },
    info() {
      this.$http.get(this.$apis.company.info).then(res => {
        if (res.code == '200') {
          this.dataMessage = res.data
        }
      })
    },
  }
};
</script>
<style scoped lang="scss">
.message {
  &-btn {
    width: 360px;
    height: 52px;
    background: rgba(255, 110, 57, 1);
    border-radius: 10px;
    margin-left: 181px;
    margin-top: 115px;
    font-size: 18px;
    color: #ffffff;
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
    margin-bottom: 50px;
  }
  &-item {
    display: flex;
    margin-bottom: 46px;
    &-input {
    }
    &-inputName {
      font-size: 16px;
      color: #52575a;
      margin-right: 20px;
    }
    &-inputValue {
      width: 360px;
    }
  }
  &-item-left {
    width: 160px;
    text-align: right;
    font-size: 16px;
    color: #52575a;
    line-height: 40px;
  }
  &-item-right {
    margin-left: 21px;
  }
  &-item-upload {
    background: #e1e1e1;
    width: 80px;
    height: 80px;
    flex-direction: column;

    img {
      width: 12px;
      height: 12px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
      color: #c0c3cf;
    }
  }
}
</style>

