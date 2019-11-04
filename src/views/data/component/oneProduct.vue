<template lang="html">
  <div class="one">
  	<div class="one-title">
  		<span btn @click='activeType = 1' :class="activeType == '1'? 'one-title-spanAct' : ''">员工销售数据报表</span>
  		<span btn @click='activeType = 2' :class="activeType == '2'? 'one-title-spanAct' : ''">分销数据报表</span>
  	</div>
  	<div>
  		<div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '1'">
        <el-table
          :data="productList"
          style="width: 100%;"
          header-cell-class-name='rowClass'>
          <el-table-column prop="sort" align="center" header-align="center" width='70' label="排名">
	          <slot slot-scope="scope">
	            {{getIndex(scope.$index, productSize, productNum)}}
	          </slot>
	        </el-table-column>
          <el-table-column
            prop="userName"
            label="员工"
            align="center">
          </el-table-column>
          <el-table-column
          	align="center"
            prop="orderNum"
            label="订单数">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="销售额"
            align="center">
            <slot slot-scope="scope">
              {{ scope.row.sales | getMoney(2)}}
            </slot>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="TA带来的查看次数"
            align="center">
            <slot slot-scope="scope">
              {{ scope.row.bringBrowse | getMoney(2)}}
            </slot>
          </el-table-column>
         	<el-table-column
         		align="center"
            prop="shareNum"
            label="分享次数">
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
      </div>
      <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '2'">
        <el-table
          :data="memberList"
          style="width: 100%;"
          header-cell-class-name='rowClass'>
          <el-table-column
            prop="cardUserName"
            label="员工"
            align="center">
          </el-table-column>
          <el-table-column
          	align="center"
            prop="shareUserName"
            label="分享人">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="成交人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="payTime"
            label="成交时间"
            align="center">
            <slot slot-scope="scope">
              {{ scope.row.payTime | getTime}}
            </slot>
          </el-table-column>
         	<el-table-column
         		align="center"
            prop="amount"
            label="成交额">
            <slot slot-scope="scope">
              {{ scope.row.amount | getMoney(2)}}
            </slot>
          </el-table-column>
          <el-table-column
         		align="center"
            prop="shareNum"
            label="员工获得佣金">
            <slot slot-scope="scope">
              {{ scope.row.cardUserBrokerage | getMoney(2)}}
            </slot>
          </el-table-column>
          <el-table-column
         		align="center"
            prop="shareNum"
            label="分享人获得佣金">
            <slot slot-scope="scope">
              {{ scope.row.shareUserBrokerage | getMoney(2)}}
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post'></l-pagination>
      </div>
  	</div>
  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      activeType: 1,
      productList: [],
      memberList: [],
      productSize: 10,
      productNum: 1,
    };
  },
  computed: {
    productJson() {
      return {
        model: {
          productId: this.$route.query.productId,
        },
        url: this.$apis.main.productSalesReport,
      }
    },
    memberJson() {
      return {
        model: {
          productId: this.$route.query.productId,
        },
        url: this.$apis.main.productDistributionReport,
      }
    }
  },
  methods: {
    getProductPage(val) {
      this.memberSize = val.pageSize
      this.membertNum = val.pageNum
    },
    getIndex(index, size, num) {
      return index + 1 + (num - 1) * size
    },
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.one {
  &-title {
    height: 55px;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    box-sizing: border-box;
    span {
      margin: 0 16px;
      display: inline-block;
      line-height: 51px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
    &-spanAct {
      color: rgba(0, 0, 0, 0.85) !important;
      font-size: 18px !important;
      font-weight: bold;
      border-bottom: 4px solid #ff6e39;
    }
  }
}
</style>
