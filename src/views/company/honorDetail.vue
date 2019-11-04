<template lang="html">
  <div class="message">
    <div class="message-item" flex="cross:center">
  		<div class="message-item-left">荣誉照片：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
          <l-upload :imgUrl.sync='imgUrl' :spec='spec'></l-upload>
        </div>
        <text-tips :spec='spec'></text-tips>
  		</div>
  	</div>
  	<div class="message-item">
  		<div class="message-item-left">荣誉标题：</div>
  		<div class="message-item-right">
  			<div class="message-item-input" flex="cross:center">
  				<el-input v-model="dataMessage.honorTitle" placeholder="请输入" class="message-item-inputValue" :maxlength='12'></el-input>
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
      imgUrl: '',
      btnTrue: true,
      dataMessage: {},
      spec: {
        width: 334,
        height: 300,
        size: '1M',
      }
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
        imgUrl: [this.imgUrl, '荣誉照片'],
        honorTitle: [this.dataMessage.honorTitle, '荣誉标题']
      }, () => {
        if (!this.btnTrue) {
          return
        }
        this.btnTrue = false
        this.$http.post(this.$apis.company.saveHonor, {
          ...this.dataMessage,
          honorContent: this.imgUrl
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
      this.$http.get(`${this.$apis.company.honorDetail}?id=${id}`).then(res => {
        if (res.code == '200') {
          this.dataMessage = res.data
          this.imgUrl = res.data.honorContent
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

