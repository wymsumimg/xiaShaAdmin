<template lang="html">
  <div class="newCard">
    <div class="newCard-title">员工基础名片列表</div>
    <div class="newCard-item" flex>
  		<div class="newCard-item-left">头像：</div>
  		<div class="newCard-item-right">
  			<l-upload  :imgUrl.sync='model.photoUrl' :spec='spec'></l-upload>
  			<text-tips :spec='spec'></text-tips>
  		</div>
  	</div>
  	<div class="newCard-item">
  		<div class="newCard-item-left">个人资料：</div>
  		<div class="newCard-item-right">
  			<div class="newCard-item-input" flex="cross:center">
  				<p class="newCard-item-inputName">姓名</p>
  				<el-input v-model="model.userName" class="newCard-item-inputValue" :maxlength='4'></el-input>
  			</div>
  			<div class="newCard-item-input" flex="cross:center">
  				<p class="newCard-item-inputName">职位</p>
  				<el-input v-model="model.position" class="newCard-item-inputValue" :maxlength='12'></el-input>
  			</div>
  			<div class="newCard-item-input" flex="cross:center">
  				<p class="newCard-item-inputName">电话</p>
  				<el-input v-model="model.mobile" class="newCard-item-inputValue" :maxlength='11'></el-input>
  			</div>
  			<div class="newCard-item-input" flex="cross:center">
  				<p class="newCard-item-inputName">公司</p>
  				<el-input v-model="model.companyName" class="newCard-item-inputValue" :maxlength='18'></el-input>
  			</div>
  		</div>
  	</div>
  	<div class="newCard-btn" btn flex="cross:center main:center" @click="update">
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
      model: {},
      type: true,
      spec: {
        width: 500,
        height: 500,
        size: '1M',
      }
    };
  },
  computed: {
    id() {
      return this.$route.query.id
    },
  },
  mounted() {
    if (this.id) {
      this.info(this.id)
    } else {
      this.type = false
    }
  },
  methods: {
    info(id) {
      this.$http.get(`${this.$apis.member.detail}?id=${id}`).then(res => {
        if (res.code == '200') {
          this.model = res.data
        }
      })
    },
    update() {
      this.$http.post(this.$apis.member.update, {
        ...this.model,
        state: 1,
      }).then(res => {
        if (res.code == '200') {
          this.info(res.data)
          this.type = true
        }
        this.$toast(res.msg)
      })
    }
  }
};
</script>
<style scoped lang="scss">
.newCard {
  &-btn {
    width: 360px;
    height: 52px;
    background: rgba(255, 110, 57, 1);
    border-radius: 10px;
    margin-left: 225px;
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
    margin-bottom: 70px;
    display: flex;
    &-input {
      margin-bottom: 24px;
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

