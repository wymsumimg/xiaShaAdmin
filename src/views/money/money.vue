<template>
  <div class="money" flex='dir:top'>
    <div class="money-top">
      <div class="money-top-title">佣金管理</div>
      <div class="money-top-content" flex='main:justify'>
        <div class="money-top-item" flex='main:center dir:top'>
          <p>
            <em>¥</em>{{orderMessage.allObtain || 0 | getMoney}}</p>
          <span>平台已产出的总佣金</span>
        </div>
        <div class="money-top-item" flex='main:center dir:top'>
          <p>
            <em>¥</em>{{orderMessage.allWithdraw || 0 | getMoney}}</p>
          <span>平台已提现佣金</span>
        </div>
        <div class="money-top-item" flex='main:center dir:top'>
          <p style="color: #FF6E39;">
            <em>¥</em>{{orderMessage.currentBrokerage || 0 | getMoney}}</p>
          <span>平台现有佣金</span>
        </div>
      </div>
    </div>
    <div class="money-bottom">
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;margin-top: 32px;">
        <el-table-column prop="userName" label="提现人" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" sortable align="center">
          <slot slot-scope="scope">
            {{ scope.row.createTime | getTime}}
          </slot>
        </el-table-column>
        <el-table-column prop="cardPhone" label="手机号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="提现金额" align="center">
          <slot slot-scope="scope">
            ¥{{ scope.row.amount | getMoney}}
          </slot>
        </el-table-column>
        <el-table-column prop="historyTime" label="操作" align="center" width="180">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify">
              <div class="money-pass" btn @click='showDailog(scope.row.id,2,scope.row.amount)' style="color: #1DE025;" v-if="scope.row.status == '1'">通过</div>
              <div class="money-pass" btn @click='showDailog(scope.row.id,3,scope.row.amount)' style="color: #FF6E39;" v-if="scope.row.status == '1'">拒绝</div>
              <div class="money-pass" style="color: #CCCCCC; padding-left: 60px;" v-if="scope.row.status == '2'">已通过</div>
              <div class="money-pass" style="color: #CCCCCC; padding-left: 60px;" v-if="scope.row.status == '3'">已拒绝</div>
              <router-link tag="div" :to="{name:'moneyDetail', query:{id:scope.row.id}}" class="money-edit" btn style="color: #3A84FF">详情
              </router-link>
            </div>
          </slot>
        </el-table-column>
      </el-table>
      <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
    </div>
    <!-- <my-dialog v-if="dialogShow" :dialogShow="dialogShow" :dialog="dialog" :product="product" :changeDialog="changeDialog" :type="type"
      :listShow="listShowFun"></my-dialog> -->
    <l-dialog :dialogVisible.sync='agreeDialog' title='同意提现' width='540px' :center="true">
      <div class="hintFrame">提现人： 张三</div>
      <div class="hintFrame">申请提现金额：
        <span style="color: #FF6E39">¥360 </span>
      </div>
      <div class="hintFrame">操作人：王莉莉</div>
      <div class="hintFrame">联系方式：15596780988</div>
      <el-input type="textarea" :rows="6" v-model="product.remark" placeholder='请在此处添加备注（备注中请注明给付方式，和用途）' class="add-item-inputValue"
        style="margin-bottom: 54px;">
      </el-input>
      <div class="orderDetail-dialog-btn" flex="main:center cross:center" btn @click='updateWithdraw'>确定</div>
    </l-dialog>

    <l-dialog :dialogVisible.sync='rejectDialog' title='拒绝提现' width='540px' :center="true">
      <el-input type="textarea" :rows="6" v-model="product.remark" placeholder='请填写本次拒绝原因…' class="add-item-inputValue" style="margin-bottom: 47px;">
      </el-input>
      <div class="orderDetail-dialog-btn" flex="main:center cross:center" btn @click='updateWithdraw'>确定</div>
    </l-dialog>

    <l-dialog :dialogVisible.sync='brokerageDialog' title='拒绝提现' width='540px' :center="true">
      <div class="brokerage">
        <div class="brokerage-left">提现门槛</div>
        <div>
          满
          <input class="brokerage-input" type="number">元可提现
        </div>
      </div>
      <div class="brokerage">
        <div class="brokerage-left">单笔提现</div>
        <div>
          ≤
          <input class="brokerage-input" type="number">元
        </div>
      </div>
      <div flex="main:center">
        <div class="orderDetail-dialog-btn" flex="main:center cross:center" style="width: 200px; margin: 0 16px 0 0;" btn @click='updateWithdraw'>确定</div>
        <div class="orderDetail-dialog-btn2" flex="main:center cross:center" btn @click='updateWithdraw'>取消</div>
      </div>
    </l-dialog>
  </div>
</template>
<script type="text/babel">
import myDialog from './dialog';
export default {
  components: {
    myDialog
  },
  data() {
    return {
      orderMessage: {}, //顶部数据
      dataList: [], //请求数据
      listShow: false,
      dialogShow: false,
      product: {
        payType: 1,
        remark: '',
        remarkShow: false,
        productPrice: 0,
        type: 2,
        productId: 0
      },
      type: 'list',
      agreeDialog: false,
      rejectDialog: false,
      brokerageDialog: false
    };
  },
  created() {
    this.moneyTop()
  },
  computed: {
    dataJson() {
      return {
        url: this.$apis.money.pageWithdrawByGroup,
        listShow: this.listShow
      }
    }
  },
  mounted() {
    this.dialogShow = true
  },
  methods: {
    updateWithdraw(item, status) {
      this.$http.get(this.$apis.money.updateWithdraw, {
        params: {
          id: item.id,
          status: status
        }
      }).then(res => {
        if (res.code == '200') {
          this.listShow = !this.listShow
        }
        this.$toast(res.msg)
      })
    },
    moneyTop() {
      this.$http.get(this.$apis.money.top).then(res => {
        if (res.code == '200') {
          this.orderMessage = res.data
        }
      })
    },
    showDailog(id, type, amount) {
      this.product.productId = id;
      this.product.type = type;
      this.product.productPrice = amount;
      this.changeDialog();
      if (type === 3) {
        this.dialog.title = "拒绝原因";
      } else {
        this.dialog.title = "支付佣金";
      }
    },
    changeDialog() {
      this.dialogShow = !this.dialogShow;
    },
    listShowFun() {
      this.listShow = !this.listShow
    }
  }
};
</script>
<style lang="scss" scoped>
.money {
  background: #f0f1f2 !important;
  padding: 0 !important;
  &-pass {
    font-size: 14px;
    color: #ff6e39;
  }
  &-edit {
    font-size: 14px;
    color: #ff6e39;
  }
  &-bottom {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
    border-radius: 10px;
    flex: 1;
    padding: 0 32px;
    box-sizing: border-box;
    &-btn1 {
      width: 100px;
      height: 40px;
      background: rgba(255, 110, 57, 1);
      border-radius: 12px;
      text-align: center;
      line-height: 40px;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      margin-right: 16px;
    }
    &-btn2 {
      width: 100px;
      height: 40px;
      border-radius: 12px;
      border: 1px solid rgba(227, 95, 37, 1);
      text-align: center;
      line-height: 38px;
      color: #ff6e39;
      font-size: 14px;
      box-sizing: border-box;
    }
    &-input {
      margin-top: 32px;
    }
    &-title {
      color: #52575a;
      font-weight: bold;
      font-size: 14px;
      height: 47px;
      line-height: 47px;
      padding-left: 48px;
      border-bottom: 1px solid rgba(240, 240, 240, 1);
    }
  }
  &-top {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
    border-radius: 10px;
    margin-bottom: 18px;
    &-item {
      padding-bottom: 48px;
      min-width: 150px;
      flex: 1;
      position: relative;
      :after {
        content: "";
        width: 1px;
        height: 60px;
        background: rgba(240, 240, 240, 1);
        position: absolute;
        top: 0;
        right: 0;
      }
      &:nth-last-child(1) :after {
        width: 0;
      }
      p {
        font-size: 24px;
        font-weight: bold;
        color: rgba(58, 132, 255, 1);
        margin-bottom: 10px;
        text-align: center;
        em {
          font-style: normal;
        }
      }
      span {
        font-size: 16px;
        color: rgba(82, 87, 90, 1);
        text-align: center;
      }
    }
    &-content {
      flex-wrap: wrap;
      padding-top: 20px;
    }
    &-title {
      font-size: 32px;
      color: #52575a;
      padding: 24px 40px;
    }
  }
}
.orderDetail-dialog-btn {
  width: 360px;
  height: 52px;
  background: rgba(255, 110, 57, 1);
  border-radius: 10px;
  border: 1px solid rgba(227, 95, 37, 1);
  box-sizing: border-box;
  font-size: 18px;
  margin: 20px auto;
  color: #ffffff;
  text-align: center;
  line-height: 52px;
}
.orderDetail-dialog-btn2 {
  width: 200px;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(255, 110, 57, 1);
  color: rgba(255, 110, 57, 1);
  font-size: 18px;
  text-align: center;
  line-height: 52px;
}
.hintFrame {
  width: 100%;
  height: 52px;
  border-radius: 10px;
  border: 1px solid rgba(225, 225, 225, 1);
  padding: 0 22px;
  color: rgba(153, 153, 153, 1);
  line-height: 52px;
  margin-bottom: 24px;
}
.brokerage {
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  &-left {
    padding: 0 21px 0 65px;
  }
  &-input {
    width: 138px;
    height: 52px;
    border-radius: 10px;
    border: 1px solid rgba(225, 225, 225, 1);
    margin: 0 20px;
    padding: 0 20px;
  }
}
</style>