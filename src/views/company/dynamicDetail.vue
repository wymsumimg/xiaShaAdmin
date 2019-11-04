<template lang="html">
  <div class="message">
    <div class="message-item" flex="cross:center">
  		<div class="message-item-left">企业动态封面：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
          <l-upload :imgUrl.sync='imgUrl' :spec='spec'></l-upload>
        </div>
        <text-tips :spec='spec'></text-tips>
  		</div>
  	</div>
  	<div class="message-item">
  		<div class="message-item-left">企业动态标题：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
  				<el-input v-model="dataMessage.dynamicTitle" placeholder="请输入" class="message-item-inputValue" :maxlength='18'></el-input>
  			</div>
  		</div>
  	</div>
  	<div class="message-item">
      <div class="message-item-left">企业动态简介：</div>
      <div class="message-item-right">
        <div class="message-item-input" flex="cross:center">
          <el-input v-model="dataMessage.dynamicContent" class="message-item-inputValue" placeholder="请输入" type='textarea' :rows="3" :maxlength='80'></el-input>
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
      spec: {
        width: 160,
        height: 160,
        size: '500K',
      },
      btnTrue: true,
      imgUrl: '',
      dataMessage: {},
    };
  },
  created() {
    if (this.$route.query.id) {
      this.info(this.$route.query.id)
    }
  },
  methods: {
    saveInfo() {
      this.checkValue({
        imgUrl: [this.imgUrl, '企业动态封面'],
        dynamicTitle: [this.dataMessage.dynamicTitle, '企业动态标题'],
        dynamicContent: [this.dataMessage.dynamicContent, '企业动态简介'],
      }, () => {
        if (!this.btnTrue) {
          return
        }
        this.btnTrue = false
        this.$http.post(this.$apis.company.saveDynamic, {
          ...this.dataMessage,
          dynamicCover: this.imgUrl,
        }).then(res => {
          if (res.code == '200') {
            this.$toast(res.msg)
            this.$router.go(-1)
          }
          this.btnTrue = true
        })
      })
    },
    info(id) {
      this.$http.get(`${this.$apis.company.dynamicDetail}?id=${id}`).then(res => {
        if (res.code == '200') {
          this.dataMessage = res.data
          this.imgUrl = res.data.dynamicCover
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
    position: relative;
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

