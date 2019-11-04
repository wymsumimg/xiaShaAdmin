<template>
    <div class="container">
        <div class="detailName" flex="cross:center">
            <div flex-box="0" class="detailImg">
                <img src="" alt="">
            </div>
            <div flex-box="1">
                <div class="detailTitle">智能门锁</div>
                <div class="detailPrice">¥200-¥260</div>
            </div>
        </div>
        <TopItem :totalObj="totalObj"/>
        <div class="one">
            <div flex="cross:center main:justify">
                <div class="one-title">
                    <span btn @click='activeType = 1' :class="activeType == '1'? 'one-title-spanAct' : ''">销售数据明细</span>
                    <span btn @click='activeType = 2' :class="activeType == '2'? 'one-title-spanAct' : ''">被查看明细</span>
                </div>
                <div>
                    <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </div>   
            </div>
            
            <div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '1'">
                    <el-table
                    :data="productList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="序号">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="订单号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderNum"
                            label="下单时间">
                        </el-table-column>
                        <el-table-column
                            prop="orderNo"
                            label="成交人"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.sales | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="成交人地址"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.bringBrowse | getMoney(2)}}
                            </slot>
                        </el-table-column>
                            <el-table-column
                                align="center"
                            prop="shareNum"
                            label="成交额">
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
                </div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '2'">
                    <el-table
                    :data="memberList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="序号">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="cardUserName"
                            label="查看人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="shareUserName"
                            label="查看次数">
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="最后一次查看时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="payTime"
                            label="地址"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.payTime | getTime}}
                            </slot>
                        </el-table-column>
                            <el-table-column
                                align="center"
                            prop="amount"
                            label="联系方式">
                            <slot slot-scope="scope">
                            {{ scope.row.amount | getMoney(2)}}
                            </slot>
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post'></l-pagination>
                </div>
            </div>
        </div>   
    </div>
</template>

<script type="text/babel">
import TopItem from '../../component/topItem'
export default {
  components: {
    TopItem
  },
  data() {
    return {
      topData: {},
      productOption: 1,
      productOrderColumn: '',
      productOrderRule: '',
      memberOption: 1,
      productList: [],
      memberList: [],
      memberSize: 10,
      membertNum: 1,
      productSize: 10,
      productNum: 1,
      timeModel:2,
      value:'',
      totalObj:{objOne:{title:'销售总额'},objTwo:{title:'产品查看数'},objThree:{title:'一级人员卖出'},objFour:{title:'二级人员卖出'}},
      activeType: 1,
    };
  },
  created() {
    this.getTop()
  },
  computed: {
    productJson() {
      return {
        model: {
          dateOption: this.productOption,
          orderColumn: this.productOrderColumn,
          orderRule: this.productOrderRule,
        },
        url: this.$apis.main.productRank,
      }
    },
    memberJson() {
      return {
        model: {
          dateOption: this.memberOption,
          orderColumn: this.memberOrderColumn,
          orderRule: this.memberOrderRule,
        },
        url: this.$apis.main.memberRank,
      }
    }
  },
  mounted(){
  },
  methods: {
    productSortChange(column) {
      this.productOrderColumn = column.prop
      this.productOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    memberSortChange(column) {
      this.memberOrderColumn = column.prop
      this.memberOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    getMemberPage(val) {
      this.productSize = val.pageSize
      this.productNum = val.pageNum
    },
    getProductPage(val) {
      this.memberSize = val.pageSize
      this.membertNum = val.pageNum
    },
    getIndex(index, size, num) {
      return index + 1 + (num - 1) * size
    },
    handleCurrentProduct(val) {
      this.$router.push({
        name: 'dataProduct',
        query: {
          dataItem: JSON.stringify(val),
          productId: val.id,
        }
      })
    },
    handleCurrentMember(val) {
      this.$router.push({
        name: 'dataMember',
        query: {
          userName: val.userName,
          userId: val.id,
        }
      })
    },
    getTop() {
      this.$http.get(this.$apis.main.getTop).then(res => {
        if (res.code == '200') {
          this.topData = res.data
        }
      })
    },
  }
};
</script>
<style>
.wrapper .el-table th > .cell {
  font-size: 16px !important;
  color: #94979b !important;
  font-weight: normal !important;
}
</style>
<style lang="scss" scoped>
.container {
  overflow: auto;
  height: 100%;
  padding: 0 !important;
  background: #f0f1f2 !important;
}
.detailName{
    max-width: 380px;
    background: white;
    padding: 8px 12px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.15);
    margin-bottom: 25px;
    .detailImg{
        width: 50px;
        height: 50px;
        margin-right: 10px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .detailTitle{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(0,0,0,0.65);
        min-width: 300px;
    }
    .detailPrice{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(208,2,27,1);
    }
}

.top {
}
.centerPart{
  margin-top: 20px;
  background: white;
  .analysisTitle{
    padding: 25px;
    border-bottom: 1px solid #E8E8E8;
    .analysisTxt{
      font-size:32px;
      font-family:PingFang-SC;
      font-weight:400;
      color:rgba(82,87,90,1);
    }
    ul >li{
      margin-left: 40px;
      cursor: pointer;
    }
  }
}



.wrapper {
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
}

.font {
  color: #52575a;
  font-size: 16px;
}
.detailFont{
  color: #485CFF;
}
.orFont {
  color: #ff6e39;
  font-size: 16px;
}

.imgWrapper {
  border-radius: 10px;
  background: red;
  @include imgBox(54px, 54px);
}

.pagination {
  padding: 20px 20px 0;
}

.wrapper-title {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}

.commonTitle-right {
  width: 240px;
  height: 30px;
  background: #ebedf1;
  border-radius: 30px;
  padding: 2px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.commonTitle-item {
  width: 56px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 26px;
  font-size: 14px;
  color: #404065;
}

.commonTitle-itemAct {
  color: #ff6e39;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(77, 115, 201, 0.28);
}
.one {
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-top: 25px;
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