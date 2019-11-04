<template>
  <div class="orderDetail" flex='dir:top'>
    <div class="orderDetail-top">
      <div class="orderDetail-top-title">订单管理</div>
      <div class="orderDetail-top-content">
        <div class="orderDetail-top-item">
          <img src="./images/order1_2.png" v-if="item.state > 1" />
          <img src="./images/order1_1.png" v-else />
          <p>{{item.state > 1 ? '下单':'待付款'}}</p>
        </div>
        <div class="orderDetail-top-border"></div>
        <div class="orderDetail-top-item">
          <img src="./images/order2_2.png" v-if="item.state > 2" />
          <img src="./images/order2_1.png" v-else />
          <p>{{item.state > 2 ? '已受理':'待受理'}}</p>
        </div>
        <div class="orderDetail-top-border"></div>
        <div class="orderDetail-top-item">
          <img src="./images/order3_2.png" v-if="item.state > 3" />
          <img src="./images/order3_1.png" v-else />
          <p>{{item.state > 3 ? '完成':'未完成'}}</p>
        </div>
        <div class="orderDetail-top-border" v-if="type == 2"></div>
        <div class="orderDetail-top-item" v-if="type == 2">
          <img src="./images/order4_2.png" v-if="item.state > 3 && item.serveCommentList && item.serveCommentList.length > 0" />
          <img src="./images/order4_1.png" v-else />
          <p>{{item.state > 3 && item.serveCommentList && item.serveCommentList.length > 0 ? '已评价':'未评价'}}</p>
        </div>
      </div>
      <div class="orderDetail-top-content2" flex='cross:center main:justify '>
        <div class="orderDetail-top-time" style="flex: 1; width: 220px;">时 间：{{item.createTime | getTime}}</div>
        <div class="orderDetail-top-btn" btn v-if='item.state == "2"' @click="operation()">{{type == 1 ? '发货' : '派单'}}</div>
        <div class="orderDetail-top-time" style="flex: 1;text-align: center;" v-if='item.state > 2'>时 间：{{item.deliverTime | getTime}}</div>
        <div class="orderDetail-top-time" style="flex: 1;text-align: center;" v-if='item.state > 3'>时 间：{{item.confirmTime | getTime}}</div>
        <div class="orderDetail-top-time" style="flex: 1;text-align: right;" v-if="item.state > 4 && type == '2'">
          {{item.serveCommentList[0].commentFlag == 1 ? '差评' : item.serveCommentList[0].commentFlag == 2 ? '一般' : '好评'}}
        </div>
        <div class="orderDetail-top-time" v-if="(type == '1' && item.state < '3') || (type == '2' && item.state < '5')" :style="{'flex': (type == '1' && item.state < 3) || (type == '2' && item.state > 3) ? '1' : '2','textAlign': 'right','height': '21px'}"></div>
        <!-- <div class="orderDetail-top-time" :style="{'flex': type == '1' && item.state > 3 ? '0' : type == '1' && item.state <= 3 ? '1':'2','textAlign': 'right','height': '21px'}" v-else></div> -->
      </div>
    </div>
    <div class="orderDetail-bottom">
      <div flex="main:justify">
        <div class="orderDetail-top-title">订单基本信息</div>
        <div class="orderDetail-top-btn2" @click="dialogVisible2=true" v-if="item.state < 4">修改订单</div>
      </div>

      <div style="padding: 0 40px;">
        <div class="orderDetail-bottom-name" flex='cross:center'>
          <span></span>
          <div>商品信息</div>
        </div>
        <!-- <div flex=' main:justify box:mean' class="orderDetail-bottom-item" style="margin-top: 33px;">
          <div flex>
            <p>订单编号：</p>
            <p style="flex: 1;">{{item.orderNo}}</p>
          </div>
          <div flex>
            <p>创建时间：</p>
            <p style="flex: 1;">{{item.createTime | getTime}}</p>
          </div>
          <div flex>
            <p>付款时间：</p>
            <p style="flex: 1;">{{item.payTime | getTime}}</p>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item">
          <div flex v-if="type == 1">
            <p>运单号：</p>
            <p style="flex: 1;">{{item.courierNum}}</p>
          </div>
          <div flex v-if="type == 2">
            <p>分享人：</p>
            <p style="flex: 1;">{{item.courierNum}}</p>
          </div>
          <div flex>
            <p>员工获得的佣金 ：</p>
            <p style="flex: 1;">￥{{item.staffPrice | getMoney}}</p>
          </div>
          <div flex>
            <p>分享人获得的佣金：</p>
            <p style="flex: 1;">￥{{item.sharePrice | getMoney}}</p>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" v-if="item.state > 3">
          <div flex>
            <p>评价：</p>
            <p style="flex: 1; color: #1DE025;" v-if="item.serveCommentList && item.serveCommentList.length > 0">
              {{item.serveCommentList[0].commentFlag == 1 ? '差评' : item.serveCommentList[0].commentFlag == 2 ? '一般' : '好评'}}
            </p>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" v-if="item.state > 3">
          <div flex>
            <p>评价内容：</p>
            <p style="flex: 1;" v-if="item.serveCommentList && item.serveCommentList.length > 0">
              {{item.serveCommentList[0].content}}
            </p>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" v-if="item.state > 3">
          <div flex v-if="item.serveCommentList && item.serveCommentList.length > 0">
            <img v-for="url in item.serveCommentList[0].imgUrl" :src="url" />
          </div>
        </div> -->
      </div>
      <div style="padding: 25px 40px 0;">
        <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
          <el-table-column prop="date" label="商品名称" align="left">
            <slot slot-scope="scope">
              <div class="orderDetail-table-item" flex='cross:center'>
                <img :src='scope.row.skuImg' />
                <p>{{scope.row.skuName}}</p>
              </div>
            </slot>
          </el-table-column>
          <el-table-column prop="skuName" label="规格" align="center" width="100">
          </el-table-column>
          <el-table-column prop="skuNum" label="数量" align="center" width="100">
          </el-table-column>
          <el-table-column prop="skuName" label="单价" align="center" width="100">
            <slot slot-scope="scope">¥{{ scope.row.skuPayPrice | getMoney}}</slot>
          </el-table-column>
          <el-table-column prop="skuName" label="优惠券" align="center" width="100">
            <slot slot-scope="scope">¥{{ scope.row.skuPayPrice | getMoney}}</slot>
          </el-table-column>
          <el-table-column prop="skuName" label="实际总价" align="center" width="100">
            <slot slot-scope="scope">¥{{ scope.row.skuPayPrice * scope.row.skuNum | getMoney}}</slot>
          </el-table-column>
          <el-table-column prop="" label="支付方式" align="center" width="100">
          </el-table-column>
          <el-table-column prop="" label="支付状态" align="center" width="100">
          </el-table-column>
        </el-table>
      </div>
      <div style="padding: 0 40px;">
        <div class="orderDetail-bottom-name" flex='cross:center' style="margin-top: 45px;">
          <span></span>
          <div>
            买家信息
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" style="margin-top: 23px;">
          <div flex>
            <p>姓名：</p>
            <p style="flex: 1;">{{item.receiverName}}</p>
          </div>
          <div flex>
            <p>联系电话：</p>
            <p style="flex: 1;">{{item.receiverMobile}}</p>
          </div>
          <div flex>
            <p>收货地址：</p>
            <p style="flex: 1;">{{item.receiverAddress}}</p>
          </div>
        </div>
      </div>

      <div style="padding: 0 40px;">
        <div class="orderDetail-bottom-name" flex='cross:center' style="margin-top: 45px;">
          <span></span>
          <div>佣金信息
            <span>（佣金一律订单完成后结算）</span>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" style="margin-top: 23px;">
          <div flex>
            <p>一级人员:</p>
            <p style="flex: 1;"></p>
          </div>
          <div flex>
            <p>佣金：</p>
            <p style="flex: 1;"></p>
          </div>
          <div flex>
            <p>状态：</p>
            <p style="flex: 1;"></p>
          </div>
        </div>
        <div flex=' main:justify box:mean' class="orderDetail-bottom-item" style="margin-top: 23px;">
          <div flex>
            <p>二级人员:</p>
            <p style="flex: 1;"></p>
          </div>
          <div flex>
            <p>佣金：</p>
            <p style="flex: 1;"></p>
          </div>
          <div flex>
            <p>状态：</p>
            <p style="flex: 1;"></p>
          </div>
        </div>
      </div>

      <!-- <div class="orderDetail-bottom-price" flex='main:right cross:center'>
        <p>{{item.state > 1 ? '实际支付':'实际待支付'}}：</p>
        <span>¥{{item.realFee | getMoney}}</span>
      </div> -->
    </div>
    <l-dialog :dialogVisible.sync='dialogVisible' :title='dialog.title' :width='dialog.width' :center="dialog.center">
      <div class="orderDetail-dialog" flex='dir:top cross:center'>
        <el-input v-model="courierNum" placeholder='请输入快递单号' style='width: 360px;'></el-input>
        <div class="orderDetail-dialog-btn" btn @click='send'>确定</div>
      </div>
    </l-dialog>
    <l-dialog :dialogVisible.sync='dialogVisible2' :title='dialog2.title' :width='dialog2.width' :center="dialog2.center">
      <div class="add">
        <div class="add-item">
          <div class="add-item-left">姓名</div>
          <div class="add-item-right">
            <el-input v-model="account.receiverName" placeholder='请输入姓名' style='width: 300px;' class="dialog-item"></el-input>
          </div>
        </div>
        <div class="add-item">
          <div class="add-item-left">电话</div>
          <div class="add-item-right">
            <el-input v-model="account.receiverMobile" placeholder='请输入电话' style='width: 300px;' class="dialog-item"></el-input>
          </div>
        </div>
        <div class="add-item">
          <div class="add-item-left">地址</div>
          <div class="add-item-right">
            <el-input v-model="account.receiverAddress" placeholder='请输入地址' style='width: 300px;' class="dialog-item"></el-input>
          </div>
        </div>
        <div class="add-btnBox" flex="main:center">
          <div class="add-btnBox-pass add-btnBox-btn" btn @click='confirm()'>确定</div>
          <div class="add-btnBox-refuse add-btnBox-btn" btn @click='cancel()'>取消</div>
        </div>
      </div>
    </l-dialog>
    <send-orders v-if="dialogShow" :dialogShow="dialogShow" :changeDialog="changeDialog" :serviceNo="serviceNo" :type="toOrdersType"></send-orders>
  </div>
</template>


<script type="text/babel">
import sendOrders from '../../components/sendOrders/send-orders.vue';
export default {
  components: {
    sendOrders
  },
  data() {
    return {
      account: {
        receiverName: '',
        receiverMobile: '',
        receiverAddress: ''
      },
      item: {},
      courierNum: '',
      dataList: [], //请求数据
      dialogVisible: false,
      dialogVisible2: false,
      dialogShow: false,
      dialog: {
        title: '请输入快递单号',
        width: '540px',
        center: true,
      },
      dialog2: {
        title: '修改订单',
        width: '540px',
        center: true,
      },
      type: 0,
      serviceNo: '',
      toOrdersType: '2'
    };
  },
  created() {
    this.detail(this.$route.query.orderNo);
    this.account.orderNo = this.$route.query.orderNo;
  },
  mounted() {
    this.type = this.$route.query.type
  },
  methods: {
    confirm() {
      // account: {
      //   receiverName: '',
      //   receiverMobile: '',
      //   receiverAddress: ''
      // },
      if (this.account.receiverName == '') {
        this.$toast('请输入姓名')
        return
      }
      if (this.account.receiverMobile == '') {
        this.$toast('请输入电话')
        return
      }
      if (this.account.receiverAddress == '') {
        this.$toast('请输入地址')
        return
      }
      // let params = this.account;
      this.$http.post(this.$apis.order.receiverInfo, {
        orderNo: this.$route.query.orderNo,
        receiverName: this.account.receiverName,
        receiverMobile: this.account.receiverMobile,
        receiverAddress: this.account.receiverAddress
      }).then(res => {
        if (res.code == '200') {
          this.dialogVisible2 = false
          this.detail(this.$route.query.orderNo)
        }
        this.$toast(res.msg)
      })
    },
    cancel() {
      this.dialogVisible2 = false
    },
    operation() {
      if (this.type == 1) {
        this.dialogVisible = true;
      } else {
        this.serviceNo = this.$route.query.orderNo;
        this.dialogShow = true;
      }
    },
    send() {
      this.$http.get(this.$apis.order.sendGoods, {
        params: {
          orderNo: this.$route.query.orderNo,
          courierNum: this.courierNum,
        }
      }).then(res => {
        if (res.code == '200') {
          this.dialogVisible = false
          this.detail(this.$route.query.orderNo)
        }
        this.$toast(res.msg)
      })
    },
    detail(orderNo) {
      this.$http.get(this.$apis.order.detail, {
        params: {
          orderNo,
        }
      }).then(res => {
        this.dataList = res.data.detailList;
        if (res.data.serveCommentList && res.data.serveCommentList.length > 0) {

          res.data.serveCommentList[0].imgUrl = res.data.serveCommentList[0].imgUrl ?
            res.data.serveCommentList[0].imgUrl.split(',') : ''
        }
        this.item = res.data;
      })
    },
    changeDialog() {
      this.dialogShow = !this.dialogShow;
    }
  }
};
</script>
<style lang="scss" scoped>
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
.orderDetail {
  background: #f0f1f2 !important;
  padding: 0 !important;
  &-table-item {
    img {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }
    p {
      @include ellipsis(2);
    }
  }
  &-bottom {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
    border-radius: 10px;
    flex: 1;
    box-sizing: border-box;
    &-price {
      margin: 21px 40px 65px;
      p {
        font-size: 14px;
        color: #52575a;
      }
      span {
        color: #ff5151;
        font-weight: bold;
        font-size: 14px;
      }
    }
    &-item {
      line-height: 20px;
      margin-bottom: 32px;
      p:nth-child(2) {
        padding-right: 15px;
      }
      img {
        width: 106px;
        height: 106px;
        margin: 0 66px 18px 0;
      }
    }
    &-name {
      div {
        font-size: 18px;
        color: #1b253a;
        margin-left: 7px;
        span {
          font-size: 18px;
          color: #A1A1A1;
        }
      }
    }
    &-name > span {
      display: inline-block;
      width: 6px;
      height: 18px;
      background: rgba(255, 110, 57, 1);
      border-radius: 4px;
    }
  }
  &-top {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
    border-radius: 10px;
    margin-bottom: 18px;
    &-btn {
      width: 100px;
      height: 40px;
      background: rgba(255, 110, 57, 1);
      border-radius: 12px;
      border: 1px solid rgba(227, 95, 37, 1);
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 38px;
    }
    &-border {
      flex: 1;
      height: 1px;
      background: #8e93a2;
      margin: 0 8px;
      margin-top: 30px;
    }
    &-item {
      width: 60px;
      img {
        display: block;
        width: 60px;
        height: 60px;
      }
      p {
        font-size: 20px;
        color: #8e93a2;
        text-align: center;
        margin-top: 10px;
      }
    }
    &-content {
      margin: 0 40px;
      display: flex;
    }
    &-content2 {
      margin: 0 40px;
      display: flex;
      margin-top: 27px;
      color: #94979b;
      font-size: 14px;
      margin-bottom: 75px;
    }

    &-title {
      font-size: 32px;
      color: #52575a;
      padding: 24px 40px 30px;
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
      margin: 24px 24px;
    }
  }
}
.add {
  &-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    &-left {
      min-width: 100px;
      text-align: right;
      font-size: 16px;
      color: #52575a;
      line-height: 40px;
    }
    &-right {
      margin-left: 21px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
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
    &-add {
      width: 200px;
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
  }
  &-btnBox {
    margin-top: 50px;
    &-btn {
      width: 200px;
      height: 52px;
      border-radius: 12px;
      font-size: 18px;
      text-align: center;
      line-height: 52px;
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
}
</style>