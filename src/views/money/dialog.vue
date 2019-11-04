<template lang="html">
  <l-dialog :dialogVisible.sync='dialogVisible' :title='dialog.title' :width='dialog.width' :center="dialog.center">
    <div class="detail-dialog" flex='dir:top cross:center' v-if="product.type==2">
      <div class="dialog-item" flex="cross:center main:center">
        <el-radio v-model="product.payType" :label="1">微信支付</el-radio>
        <el-radio v-model="product.payType" :label="2">其他支付</el-radio>
      </div>
      <div class="dialog-item" flex="main:center cross:center">
        <span>本次支付金额</span>
        <p style="color:rgba(255,110,57,1);size: 24px;">¥{{product.productPrice | getMoney}}</p>
      </div>
      <div class="dialog-item" flex="main:center cross:center" v-show="product.payType == 2">
        <el-input type="textarea" :rows="6" v-model="product.remark" placeholder='请在此输入备注' class="add-item-inputValue" style="width: 400px;"></el-input>
      </div>
      <el-input type="hidden" v-model="product.productId"></el-input>
    </div>
    <div class="detail-dialog" flex='dir:top cross:center' v-if="product.type==3">
      <div class="dialog-item" flex="main:center cross:center">
        <el-input type="textarea" :rows="6" v-model="product.remark" placeholder='请在此输入拒绝原因' class="add-item-inputValue" style="width: 400px;"></el-input>
      </div>
    </div>
    <div class="orderDetail-dialog-btn" flex="main:center cross:center" btn @click='updateWithdraw' style="margin-left: 80px;">确定</div>
  </l-dialog>
</template>
<script type="text/babel">
export default {
  name: 'my-dialog',
  data() {
    return {
      dialogVisible: true
    }
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Object,
      default: {}
    },
    product: {
      type: Object,
      default: {}
    },
    changeDialog: {
      type: Function,
      default: null
    },
    listShow: {
      type: Function,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  watch: {
    dialogVisible() {
      this.product.remark = "";
      this.changeDialog();
    }
  },
  methods: {
    updateWithdraw() {
      if (this.product.payType == 2 && this.product.remark === '') {
        this.$toast('其他支付必须写明原因')
        return
      }
      if (this.product.type == 3 && this.product.remark === '') {
        this.$toast('请写明原因')
        return
      }
      this.$http.get(this.$apis.money.updateWithdraw, {
        params: {
          id: this.product.productId,
          payType: this.product.payType,
          status: this.product.type,
          remark: this.product.remark,
        }
      }).then(res => {
        this.dialogVisible = false;
        this.$toast(res.msg);
        if (this.type == 'list') {
          this.listShow();
        } else {
          this.$router.push({ path: '/money' })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-item {
  margin-bottom: 40px;
  span {
    display: inline-block;
    width: 110px;
    color: #52575a;
    font-size: 16px;
    margin-right: 50px;
  }
  p {
    display: inline-block;
    color: #52575a;
    font-size: 16px;
  }
}
.orderDetail-dialog-btn {
  width: 360px;
  height: 42px;
  background: rgba(255, 110, 57, 1);
  border-radius: 10px;
  border: 1px solid rgba(227, 95, 37, 1);
  box-sizing: border-box;
  font-size: 16px;
  margin-top: 20px;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
}
.detail {
  &-title {
    font-size: 32px;
    color: #52575a;
    padding-top: 30px;
    padding-bottom: 5px;
    text-indent: 9px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 40px;
  }
  &-item {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 23px 0 11px;
    line-height: 22px;
    &-left {
      padding-right: 20px;
    }
    &-right {
      font-size: 14px;
      color: #52575a;
    }
  }
  &-btnBox {
    margin-top: 70px;
    &-btn {
      width: 100px;
      height: 40px;
      border-radius: 12px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
    &-pass {
      border: 1px solid rgba(255, 110, 57, 1);
      background: rgba(255, 110, 57, 1);
      color: #fff;
      margin-right: 12px;
    }
    &-refuse {
      border: 1px solid #ff6e39;
      color: #ff6e39;
    }
  }
  &-add {
    &-btn {
      width: 100px;
      height: 40px;
      background: rgba(255, 110, 57, 1);
      border-radius: 12px;
      font-size: 14px;
      color: #ffffff;
      margin-top: 90px;
    }
    &-btn2 {
      width: 100px;
      height: 40px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px solid rgba(227, 95, 37, 1);
      font-size: 14px;
      color: #ff6e39;
      box-sizing: border-box;
      margin-left: 16px;
      margin-top: 90px;
    }
    &-title {
      font-size: 32px;
      color: #52575a;
      padding: 24px 0;
      margin-bottom: 50px;
    }
    &-item {
      margin-bottom: 15px;
      display: flex;
      &-assoc {
        height: 50px;
        max-width: 660px;
        border-radius: 8px;
        border: 1px solid rgba(225, 225, 225, 1);
        margin-bottom: 15px;
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          margin: 5px;
          display: block;
        }
        p {
          font-size: 12px;
          padding: 0 10px;
          flex: 1;
          color: #52575a;
          border-right: 1px solid #e1e1e1;
          display: block;
          @include ellipsis(2);
        }
        i {
          font-size: 14px;
          padding: 0 5px;
        }
      }
      &-addPrice {
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgba(225, 225, 225, 1);
        margin-bottom: 15px;
        span {
          font-size: 16px;
          padding: 0 15px;
          line-height: 38px;
          border-right: 1px solid #e1e1e1;
          display: block;
        }
        p {
          font-size: 16px;
          padding: 0 10px;
          flex: 1;
          text-align: center;
          line-height: 38px;
          border-right: 1px solid #e1e1e1;
          display: block;
        }
        i {
          font-size: 14px;
          padding: 0 5px;
        }
      }
      &-rightD {
        margin-bottom: 24px;
        p {
          font-size: 16px;
          color: #52575a;
          margin-right: 20px;
        }
      }
      &-add {
        width: 120px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(255, 110, 57, 1);
        color: #e35f25;
        font-size: 14px;
        i {
          margin-right: 5px;
          font-size: 14px;
        }
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
    &-item-rightImg {
      width: 22px;
      height: 22px;
      position: absolute;
      right: 10px;
      top: -10px;
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
}
</style>


