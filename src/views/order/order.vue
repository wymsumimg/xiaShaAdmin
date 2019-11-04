<template>
  <div class="order" flex='dir:top'>
    <div class="order-top">
      <el-tabs v-model="activeName" style="flex: 1" flex='dir:top'>
        <el-tab-pane label="商品订单" name="1"></el-tab-pane>
        <el-tab-pane label="宽带订单" name="2"></el-tab-pane>
      </el-tabs>
      <div class="order-top-content" flex='main:justify'>
        <div class="order-top-item" flex='main:center dir:top'>
          <p>{{orderMessage.todayTotalOrderNum || 0}}</p>
          <span>今日下单数</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p>{{orderMessage.totalOrderNum || 0}}</p>
          <span>订单总数</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p>{{orderMessage.finishOrderNum || 0}}</p>
          <span>已完成</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p>{{-1 || 0}}</p>
          <span>{{activeName == 1 ? '待发货' : '待处理'}}</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p v-if="orderMessage.totalOrderNum !='0'">{{(100 * parseFloat(orderMessage.finishOrderNum/orderMessage.totalOrderNum).toFixed(4)).toFixed(2)+'%'}}</p>
          <p v-else>0%</p>
          <span>完成比例</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p style="color: #FF6E39;">¥{{orderMessage.todayTotalFee || 0 | getMoney}}</p>
          <span>今日交易额</span>
        </div>
        <div class="order-top-item" flex='main:center dir:top'>
          <p style="color: #FF6E39;">¥{{orderMessage.totalFee || 0 | getMoney}}</p>
          <span>总交易额</span>
        </div>
      </div>
    </div>
    <div class="order-bottom">
      <div class="order-bottom-title">{{orderListName}}</div>
      <div class="order-bottom-input" flex>
        <el-input v-model="model.orderNo" placeholder='订单编号' style='width: 200px;margin-right: 60px;'></el-input>
        <el-input v-model="model.userName" placeholder='成交人' style='width: 200px;margin-right: 60px;'></el-input>
        <el-date-picker v-model="model.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          style='width: 400px' value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="order-bottom-input" flex='main:justify' style="margin-top: 17px;">
        <div flex='cross:center'>
          <el-select v-model="model.state" placeholder="订单状态" style='width: 200px;margin-right: 60px;' v-if="activeName == 1">
            <el-option label="待受理" value="2"></el-option>
            <el-option label="已受理" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
          </el-select>
          <el-select v-model="model.state" placeholder="订单状态" style='width: 200px;margin-right: 60px;' v-if="activeName == 2">
            <el-option label="待受理" value="2"></el-option>
            <el-option label="待完成" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
            <el-option label="已评价" value="5"></el-option>
          </el-select>
          <!-- <el-select v-model="model.orderType" placeholder="服务类型" style='width: 200px;margin-right: 60px;' v-if="activeName == 2">
				    <el-option label="新装" value="1"></el-option>
				    <el-option label="报修" value="2"></el-option>
				    <el-option label="移机" value="3"></el-option>
				    <el-option label="换猫" value="4"></el-option>
				  </el-select> -->
          <div class="order-bottom-btn1" btn @click='chaxun'>查询</div>
          <div class="order-bottom-btn2" btn @click='model = {};chaxun()'>重置</div>
        </div>
        <a class="order-bottom-btn2" :href="excelExport" target="_blank">导出excle</a>
      </div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;margin-top: 32px;">
        <el-table-column prop="orderNo" label="订单号" align="center">
        </el-table-column>
        <el-table-column prop="orderType" label="服务类型" align="center" v-if="activeName == 2">
          <slot slot-scope="scope">
            <span v-if='scope.row.orderType =="1"' style="color: #6AE05F;">普通商品</span>
            <span v-if='scope.row.orderType =="2"' style="color: #738BFF;">宽带新装</span>
            <span v-if='scope.row.orderType =="3"' style="color: #80158C;">宽带续费</span>
          </slot>
        </el-table-column>
        <el-table-column prop="totalNum" label="数量" align="center" width="100">
        </el-table-column>
        <el-table-column prop="totalFee" label="成交价" align="center" width="150">
          <slot slot-scope="scope">
            ¥{{ scope.row.totalFee | getMoney}}
          </slot>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" align="center">
          <slot slot-scope="scope">
            {{ scope.row.createTime | getTime}}
          </slot>
        </el-table-column>
        <el-table-column prop="userName" label="成交人" align="center" width="180">
        </el-table-column>
        <el-table-column prop="shareUserName" label="分享人" align="center" width="180">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" align="center" width="180">
          <slot slot-scope="scope">
            <div v-if="activeName == 1">
              <span v-if='scope.row.state =="2"' style="color: #FF5151;">待受理</span>
              <span v-if='scope.row.state =="3"' style="color: #6AE05F;">已受理</span>
              <span v-if='scope.row.state =="4"' style="color: #52575A;">已完成</span>
            </div>
            <div v-if="activeName == 2">
              <span v-if='scope.row.state =="2"' style="color: #738BFF;">待受理</span>
              <span v-if='scope.row.state =="3"' style="color: #FB7400;">待完成</span>
              <span v-if='scope.row.state =="4"' style="color: #80158C;">已完成</span>
              <span v-if='scope.row.state =="5"' style="color: #1DE025;">已评价</span>
            </div>
          </slot>
        </el-table-column>
        <el-table-column prop="historyTime" label="操作" align="center" width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <router-link tag="div" :to="{name:'orderDetail', query:{orderNo:scope.row.orderNo,type:activeName}}" class="order-edit" btn>详情</router-link>
            </div>
          </slot>
        </el-table-column>
      </el-table>
      <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
    </div>

  </div>
</template>


<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      model: {},
      message: {},
      orderMessage: {}, //顶部数据
      dataList: [], //请求数据
      activeName: '1',
      orderType: 1,
      orderListName: '商品订单列表',
    };
  },
  computed: {
    excelExport() {
      let Str = ''
      let Obj = JSON.parse(JSON.stringify(this.model))
      delete Obj.time
      for (let i in Obj) {
        Str += `${i}=${Obj[i]}&`
      }
      Str = Str.substring(0, Str.length - 1)

      if (this.model.time) {
        if (Str.length > 0) {
          Str += `&startTime=${this.model.time[0]}&endTime=${this.model.time[1]} 23:59:59`
        }
        Str += `startTime=${this.model.time[0]}&endTime=${this.model.time[1]} 23:59:59`
      }
      if (Str.length > 0) {
        return `${this.$apis.order.export}?${Str}&orderType=${this.orderType}`
      } else {
        return `${this.$apis.order.export}?orderType=${this.orderType}`
      }
    },
    dataJson() {
      return {
        model: {
          ...this.message,
          orderType: this.orderType,
        },
        url: this.$apis.order.list,
      }
    }
  },
  created() {
    this.count()
  },
  watch: {
    'activeName': function (val) {
      if (val === '1') {
        this.orderListName = "商品订单列表";
      } else {
        this.orderListName = "宽带订单列表";
      }
      this.model = {};
      this.orderType = val;
      this.count();

    }
  },
  methods: {
    chaxun() {
      let Obj = JSON.parse(JSON.stringify(this.model))
      delete Obj.time
      if (this.model.time) {
        Obj.startTime = this.model.time[0]
        Obj.endTime = this.model.time[1] + ' ' + '23:59:59'
      }
      this.message = Obj
    },
    count() {
      this.$http.get(this.$apis.order.count, {
        params: {
          orderType: this.orderType,
        }
      }).then(res => {
        this.orderMessage = res.data
      })
    }

  }
};
</script>
<style>
.order .el-tabs__content {
  flex: 1;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 20px;
}
.order .el-tabs__header {
  margin: 0;
}
.order .el-tabs__nav-scroll {
  padding: 20px 40px;
}
.order .el-tabs__item.is-active {
  font-size: 32px;
}
.order .el-tabs__item {
  font-size: 22px;
}
</style>
<style lang="scss" scoped>
.order {
  background: #f0f1f2 !important;
  padding: 0 !important;
  &-edit {
    width: 48px;
    height: 28px;
    border-radius: 16px;
    border: 1px solid rgba(255, 110, 57, 1);
    text-align: center;
    line-height: 26px;
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
      font-size: 28px;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
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
      width: 14%;
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
.el-tabs__nav-wrap::after {
  background: #fff;
}
</style>