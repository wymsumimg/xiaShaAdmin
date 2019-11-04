<template>
    <div class="container">
      <div class="top" flex="cross:center">
        <div class="item" flex-box="1">
          <div flex="cross:center main:justify">
            <div class="dataName">{{totalObj.objOne.title}}</div>
            <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
          </div>
          <div class="des" flex="main:right">今日:73232</div>
          <div id="saleNum" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
        </div>
        <div class="item" flex-box="1">
          <div flex="cross:center main:justify">
            <div class="dataName">{{totalObj.objTwo.title}}</div>
            <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
          </div>
          <div class="des" flex="main:right">今日:73232</div>
          <div id="orderNum" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
        </div>
        <div class="item" flex-box="1" style="height:100%;">
          <div>
            <div class="dataName">一级人员</div>
            <div class="dataNum">27</div>
            <div class="dataName" style="text-align:center;margin-top:10px;padding-bottom:60px;border-bottom:3px solid #D9D9D9;">（人）</div>
          </div>
        </div>
        <div class="item" flex-box="1">
          <div>
            <div class="dataName">二级人员</div>
            <div class="dataNum" style="color:#FF6E39">27</div>
            <div class="dataName" style="text-align:center;margin-top:10px;padding-bottom:60px;border-bottom:3px solid #D9D9D9;">（人）</div>
          </div>
        </div>
      </div>
        <div class="one">
            <div class="rankTitle">分销排行</div>
            <div flex="cross:center main:justify">
                <div class="one-title">
                  <span btn @click='activeType = 1' :class="activeType == '1'? 'one-title-spanAct' : ''">一级人员</span>
                  <span btn @click='activeType = 2' :class="activeType == '2'? 'one-title-spanAct' : ''">二级人员</span>
                </div>
                <div>
                    <el-button @click="toAddRole()">+ 新增成员</el-button>
                </div>   
            </div>
            <div flex="cross:center">
              <div style="margin-right:40px;margin-top:35px;margin-bottom:30px;" flex-box="1">
                <el-input placeholder="输入姓名、手机搜索"></el-input>
              </div>
              <div flex-box="0"  flex="cross:center">
                <div style="margin-left:20px;">
                  <el-button>查询</el-button>
                </div>
                <div style="margin-left:20px;">
                  <el-button>导出excle</el-button>
                </div>
              </div>
            </div>
            <div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '1'">
                    <el-table
                    :data="productList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="排行">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="姓名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderNum"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="orderNo"
                            label="成交订单数"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.sales | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="成交额"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.bringBrowse | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                                align="center"
                            prop="shareNum"
                            label="二级人员数">
                        </el-table-column>
                        <el-table-column
                                align="center"
                            prop="shareNum"
                            label="所获佣金">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="操作"
                            align="center">
                            <slot slot-scope="scope">
                              <el-button @click="toOneDetail()">详情</el-button>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
                </div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '2'">
                    <el-table
                    :data="memberList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="排行">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="cardUserName"
                            label="姓名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="shareUserName"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="成交订单数"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="payTime"
                            label="成交额"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.payTime | getTime}}
                            </slot>
                        </el-table-column>
                            <el-table-column
                                align="center"
                            prop="amount"
                            label="所获佣金">
                            <slot slot-scope="scope">
                            {{ scope.row.amount | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="操作"
                            align="center">
                            <slot slot-scope="scope">
                              <el-button @click="toOneDetail()">详情</el-button>
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
export default {
  components: {
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
    this.initEcharts()
  },
  methods: {
    toAddRole(){
      this.$router.push('/distribution/addRole')
    },
    toOneDetail(){
      this.$router.push('/distribution/oneSaleDetail')
    },
    initEcharts(){
      this.drawBar()
      this.drawLine()
    },
    drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('saleNum'))
        // 绘制图表
        myChart.setOption({
          color: ['#FF6A6A'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: '{c}<br/>{a}:{b}',
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  show:false,
                  data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  show:false,
              }
          ],
          series : [
              {
                  name:'时间',
                  type:'bar',
                  barWidth: '60%',
                  data:[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]
              }
          ]
        });
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('orderNum'))
        // 绘制图表
        myChart.setOption({
          color: ['#FF6A6A'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: '{c}<br/>{a}:{b}',
          },
          grid:{
            y2:25,
          },
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show:false
          },
          yAxis: {
              type: 'value',
              show:false
          },
          series: [{
              name:'时间',
              data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              areaStyle: {}
          }]
        });
    },



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


.top {
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
.item {
  width: 0;
  min-height: 215px;
  background: #fff;
  box-shadow: 0px 0px 19px 0px rgba(179, 190, 219, 0.42);
  border-radius: 20px;
  margin-right: 20px;
  padding: 20px 28px;
  &:nth-last-child(1) {
    margin-right: 0;
  }
}
.dataName{
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(0,0,0,0.45);
}
.dataNum{
  font-size:24px;
  font-family:PingFang-SC-Heavy,PingFang-SC;
  font-weight:800;
  color:rgba(58,132,255,1);
  margin-top: 20px;
  text-align: center;
}
.title {
  // padding: 29px 10px 10px;
  font-size: 32px;
  color: black;
  // height: 81px;
  box-sizing: border-box;
  text-align: center;
  @include ellipsis(1);
}

.blueTitle {
  @extend .title;
  color: #FF5151;
}

.des {
  font-size:16px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(102,102,102,0.85);
  margin-top: 10px;
}
.one {
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-top: 25px;
    padding: 20px 40px;
    .rankTitle{
      font-size:32px;
      font-family:PingFang-SC-Regular,PingFang-SC;
      font-weight:400;
      color:rgba(82,87,90,1);
    }
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