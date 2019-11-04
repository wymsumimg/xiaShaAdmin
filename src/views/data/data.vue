<template>
  <div class="container">
    <TopItem :totalObj="totalObj"/>
    <div class="centerPart">
      <div class="analysisTitle" flex="cross:center main:justify">
        <div class="analysisTxt">销售分析</div>
        <div flex="cross:center">
          <ul flex="cross:center">
            <li @click="chooseTime(0)" :style="timeModel==0?'color:#3AA0FF':''">日</li>
            <li @click="chooseTime(1)" :style="timeModel==1?'color:#3AA0FF':''">月</li>
            <li @click="chooseTime(2)" :style="timeModel==2?'color:#3AA0FF':''">年</li>
          </ul>  
          <div style="margin-left:40px;">
            <el-date-picker v-model="value" type="month" placeholder="选择月" v-if="timeModel==0"></el-date-picker>
            <el-date-picker v-model="value2" type="year" placeholder="选择年" v-if="timeModel==1"></el-date-picker>
          </div>
        </div>
        

      </div>
      <div id="saleAnalysis" :style="{width:'100%',height:'400px'}"></div>
    </div>
    <div flex="main:justify" flex-wrap>
      <!--一级分销排行-->
      <div class="wrapper" style="width:49.4%;">
        <div class="wrapper-title">
          <div class="commonTitle">一级分销排行</div>
          
        </div>
        <el-table @sort-change='productSortChange' ref="productTable" :data="productList" style="width: 100%;padding: 0 10px;" highlight-current-row @current-change="handleCurrentProduct">
          <el-table-column prop="sort" align="center" header-align="center" label="排名" width='70'>
            <slot slot-scope="scope">
              <div class="font">{{getIndex(scope.$index, productSize, productNum)}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="姓名" prop="date" >
            <slot slot-scope="scope">
              <div class="orFont">{{scope.row.productName}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="销售额" prop="productSales" sortable='custom'>
            <slot slot-scope="scope">
              <div class="font">￥{{scope.row.productSales | getMoney}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="佣金" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font">{{scope.row.productOrderNum}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="详情" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font detailFont" @click="toDetail(1)">详情</div>
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
      </div>
      <!--二级分销排行-->
      <div class="wrapper" style="width:49.4%;">
        <div class="wrapper-title">
          <div class="commonTitle">二级分销排行</div>
          
        </div>
        <el-table @sort-change='productSortChange' ref="productTable" :data="productList" style="width: 100%;padding: 0 10px;" highlight-current-row @current-change="handleCurrentProduct">
          <el-table-column prop="sort" align="center" header-align="center" label="排名" width='70'>
            <slot slot-scope="scope">
              <div class="font">{{getIndex(scope.$index, productSize, productNum)}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="姓名" prop="date" >
            <slot slot-scope="scope">
              <div class="orFont">{{scope.row.productName}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="销售额" prop="productSales" sortable='custom'>
            <slot slot-scope="scope">
              <div class="font">￥{{scope.row.productSales | getMoney}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="佣金" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font">{{scope.row.productOrderNum}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="详情" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font detailFont" @click="toDetail(2)">详情</div>
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post' @update:page = 'getMemberPage'></l-pagination>
      </div> 
      <!--宽带销量排行-->
      <div class="wrapper" style="width:49.4%;">
        <div class="wrapper-title">
          <div class="commonTitle">宽带销量排行</div>
          
        </div>
        <el-table @sort-change='productSortChange' ref="productTable" :data="productList" style="width: 100%;padding: 0 10px;" highlight-current-row @current-change="handleCurrentProduct">
          <el-table-column prop="sort" align="center" header-align="center" label="排名" width='70'>
            <slot slot-scope="scope">
              <div class="font">{{getIndex(scope.$index, productSize, productNum)}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="名称" prop="date" >
            <slot slot-scope="scope">
              <div class="orFont">{{scope.row.productName}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="订单数" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font">{{scope.row.productOrderNum}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="销售额" prop="productSales" sortable='custom'>
            <slot slot-scope="scope">
              <div class="font">￥{{scope.row.productSales | getMoney}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="详情" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font detailFont" @click="toDetail(3)">详情</div>
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
      </div>
      <!--商品销量排行-->
      <div class="wrapper" style="width:49.4%;">
        <div class="wrapper-title">
          <div class="commonTitle">商品销量排行</div>
          
        </div>
        <el-table @sort-change='productSortChange' ref="productTable" :data="productList" style="width: 100%;padding: 0 10px;" highlight-current-row @current-change="handleCurrentProduct">
          <el-table-column prop="sort" align="center" header-align="center" label="排名" width='70'>
            <slot slot-scope="scope">
              <div class="font">{{getIndex(scope.$index, productSize, productNum)}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="名称" prop="date" >
            <slot slot-scope="scope">
              <div class="orFont">{{scope.row.productName}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="订单数" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font">{{scope.row.productOrderNum}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="销售额" prop="productSales" sortable='custom'>
            <slot slot-scope="scope">
              <div class="font">￥{{scope.row.productSales | getMoney}}</div>
            </slot>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="详情" prop="productOrderNum" sortable='custom' >
            <slot slot-scope="scope">
              <div class="font detailFont" @click="toDetail(4)">详情</div>
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post' @update:page = 'getMemberPage'></l-pagination>
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
      yearDataX:[2012,2013,2014,2015,2016],
      monthDataX:[1,2,3,4,5,6,7,8,9,10,11,12],
      dayDataX:[],
      value:'',
      value2:'',
      totalObj:{objOne:{title:'销售额'},objTwo:{title:'订单数'},objThree:{title:'宽带销售'},objFour:{title:'商品销售'}},
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
    toDetail(num){
      if(num==1){
        this.$router.push('/data/oneLevelDetail')
      }else if(num==2){
        this.$router.push('/data/secondLevelDetail')
      }else if(num==3){
        this.$router.push('/data/proSaleDetail')
      }else if(num==4){
        this.$router.push('/data/proSaleDetail')
        // this.$router.push('/data/productDetail')
      }
      
    },
    chooseTime(num){
      this.timeModel = num
      if(num==0){
        this.drawBar3(this.dayDataX)
      }else if(num==1){
        this.drawBar3(this.monthDataX)
      }else if(num==2){
        this.drawBar3(this.yearDataX)
      }
    },
    initEcharts(){
      this.drawBar()
      this.drawLine()
      this.drawBar2()
      this.drawLine2()
      this.drawBar3(this.yearDataX)
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
    drawBar2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('cutSale'))
        // 绘制图表
        myChart.setOption({
          color: ['#1890FF'],
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
    drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('productSale'))
        // 绘制图表
        myChart.setOption({
          color: ['#6AE7CB'],
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
    drawBar3(dataX){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('saleAnalysis'))
        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }]
                });
            }
        };

        var labelOption = {
            normal: {
                show: false,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };

        // 绘制图表
        myChart.setOption({
          color: ['#3AA0FF', '#91D942', '#F6B344', '#E357FF'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['商品销售', '宽带销售', '一级分销', '二级分销']
          },
          calculable: true,
          xAxis: [
              {
                  type: 'category',
                  axisTick: {show: false},
                  data: dataX
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '商品销售',
                  type: 'bar',
                  barGap: 0,
                  label: labelOption,
                  data: [320, 332, 301, 334, 390]
              },
              {
                  name: '宽带销售',
                  type: 'bar',
                  label: labelOption,
                  data: [220, 182, 191, 234, 290]
              },
              {
                  name: '一级分销',
                  type: 'bar',
                  label: labelOption,
                  data: [150, 232, 201, 154, 190]
              },
              {
                  name: '二级分销',
                  type: 'bar',
                  label: labelOption,
                  data: [98, 77, 101, 99, 40]
              }
          ]
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
</style>