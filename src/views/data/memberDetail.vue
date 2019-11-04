<template>
  <div class="memberDetail">
    <!-- <div class="memberDetail-tittle" flex="cross:center"> -->
    <!-- <p>{{$route.query.userName}}</p> <i class="el-icon-arrow-down"></i> -->
    <el-select v-model="userName" placeholder="666" class="selectInput">
      <el-option v-for="(item, index) in userList" :key="index" :label="item.userName" :value="item.id"></el-option>
    </el-select>
    <!-- </div>  -->
    <div flex="main:justify">
      <div class="memberDetail-item">
        <span>销售额</span>
        <p>{{dataItem.allSales | getMoney(2)}}</p>
        <div ref='allSales' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>当前佣金</span>
        <p>{{dataItem.currentBrokerage | getMoney(2)}}</p>
        <div ref='currentBrokerage' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>订单数</span>
        <p>{{dataItem.allOrderNum}}</p>
        <div ref='dateOrderNum' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>分享次数</span>
        <p>{{dataItem.allShareNum}}</p>
        <div ref='dateShareNum' class="memberDetail-echarts"></div>
      </div>
    </div>
    <div class="memberDetail-body">
      <div class="memberDetail-body-title" flex="cross:center main:justify">
        <p>员工分享、成交数据</p>
        <el-date-picker v-model="dataTime" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" size='mini' style='width: 256px;margin-right: 30px;' value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;">
        <el-table :data="dataList" style="width: 100%;" header-cell-class-name='rowClass'>
          <el-table-column prop="shareUserName" label="分享人" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="成交人" align="center">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号">
          </el-table-column>
          <el-table-column prop="realFee" label="成交额" align="center">
            <slot slot-scope="scope">
              {{ scope.row.realFee | getMoney(2)}}
            </slot>
          </el-table-column>
          <el-table-column prop="amount" label="员工获得佣金" align="center">
            <slot slot-scope="scope">
              {{ scope.row.cardUserBrokerage | getMoney(2)}}
            </slot>
          </el-table-column>
          <el-table-column prop="amount" label="分享人获得佣金" align="center">
            <slot slot-scope="scope">
              {{ scope.row.shareUserBrokerage | getMoney(2)}}
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson' requestMethod='post'></l-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import echarts from 'echarts'
export default {
  components: {},
  data() {
    return {
      dataItem: {},
      dataTime: [],
      dataList: [],
      message: {},
      userName: '',
      userId: '',
      userList: []
    };
  },
  watch: {
    dataTime(val) {
      let model = {
        startDate: val[0],
        endDate: val[1],
      }
      this.message = model
    },
    userName() {
      this.userTop();
    }
  },
  computed: {
    dataJson() {
      return {
        model: {
          userId: this.userId,
          ...this.message,
        },
        url: this.$apis.main.userReport,
      }
    }
  },
  created() {
    this.userName = this.$route.query.userName;
    this.userId = this.$route.query.userId;
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http.get(this.$apis.member.list, {
        params: {
          userState: 2,
          pageNum: 1,
          pageSize: 100
        }
      }).then(res => {
        if (res.code == '200') {
          this.userList = res.data.data
        }
      })
    },
    oneEcharts(Axis, Series, color, refName, seriesName) {
      if (this.$refs[refName] == undefined) {
        return
      }
      let echart = echarts.init(this.$refs[refName])
      // 绘制图表
      echart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
        },
        xAxis: [
          {
            type: 'category',
            data: Axis,
            axisTick: {
              alignWithLabel: true
            },
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: seriesName,
            type: 'bar',
            itemStyle: {
              color: color,
              borderColor: color
            },
            barWidth: '50%',
            data: Series,
          }
        ]
      });
    },
    twoEcharts(Axis, Series, color, refName, seriesName) {
      if (this.$refs[refName] == undefined) {
        return
      }
      let echart = echarts.init(this.$refs[refName])
      // 绘制图表
      echart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: Axis,
            show: false,
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: seriesName,
            type: 'line',
            itemStyle: {
              color: color,
              borderColor: color
            },
            areaStyle: {
              color: color,
              borderColor: color
            },
            data: Series,
          }
        ]
      });
    },
    userTop() {
      this.$http.get(this.$apis.main.userTop, {
        params: {
          userId: this.userId
        }
      }).then(res => {
        if (res.code == '200') {
          this.dataItem = res.data
          // 销售额
          let salesList = res.data.dateSales
          let salesAxis = []
          let salesSeries = []
          for (let i in salesList) {
            salesAxis.push(i)
            salesSeries.push(salesList[i])
          }
          this.oneEcharts(salesAxis, salesSeries, '#FF6A6A', 'allSales', '销售额')
          // 订单数
          let orderNumList = res.data.dateOrderNum
          let orderNumAxis = []
          let orderNumSeries = []
          for (let i in orderNumList) {
            orderNumAxis.push(i)
            orderNumSeries.push(orderNumList[i])
          }
          this.oneEcharts(orderNumAxis, orderNumSeries, '#1890FF', 'dateOrderNum', '订单数')

          // 佣金
          let brokerageList = res.data.dateBrokerage
          let brokerageAxis = []
          let brokerageSeries = []
          for (let i in brokerageList) {
            brokerageAxis.push(i)
            brokerageSeries.push(brokerageList[i])
          }
          this.twoEcharts(brokerageAxis, brokerageSeries, '#FF6A6A', 'currentBrokerage', '佣金')

          // 分享
          let shareList = res.data.dateShareNum
          let shareAxis = []
          let shareSeries = []
          for (let i in shareList) {
            shareAxis.push(i)
            shareSeries.push(shareList[i])
          }
          this.twoEcharts(shareAxis, shareSeries, '#6AE7CB', 'dateShareNum', '分享数')
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.selectInput {
  width: 210px;
  margin-bottom: 24px;
}
.rowClass {
  background: #fafafa !important;
}
.memberDetail {
  background: transparent !important;
  padding: 0 !important;
  &-body {
    margin-top: 24px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding-bottom: 24px;
    &-title {
      border-bottom: 1px solid #e9e9e9;
      height: 55px;
      p {
        font-size: 16px;
        text-indent: 22px;
      }
    }
  }
  &-echarts {
    width: 100%;
    height: 70px;
  }
  &-item {
    width: 23%;
    box-sizing: border-box;
    height: 188px;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px 24px;
    span {
      display: block;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
    p {
      font-size: 30px;
      color: rgba(255, 81, 81, 0.85);
    }
  }
  &-tittle {
    width: 210px;
    height: 40px;
    background: #ffffff;
    padding: 0 10px;
    margin-bottom: 24px;
    p {
      font-size: 16px;
      color: #333333;
      @include ellipsis(1);
      flex: 1;
    }
    i {
      color: rgba(0, 0, 0, 0.25);
      font-size: 14px;
    }
  }
}
</style>

