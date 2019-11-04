<template>
  <div class="memberDetail">
    <!-- <div class="memberDetail-tittle" flex="cross:center"> -->
    <!-- <p>{{$route.query.userName}}</p> <i class="el-icon-arrow-down"></i> -->
    <el-select v-model="userName" class="selectInput">
      <el-option v-for="(item, index) in userList" :key="index" :label="item.userName" :value="item.id"></el-option>
    </el-select>
    <!-- </div>  -->
    <div flex="main:justify">
      <div class="memberDetail-item">
        <span>接单总数</span>
        <p>{{dataItem.acceptOrderNum}}</p>
        <div ref='allSales' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>好评数</span>
        <p>{{dataItem.highOpinionNum}}</p>
        <div ref='currentBrokerage' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>未按时上门次数</span>
        <p>{{dataItem.notReachTime}}</p>
        <div ref='dateOrderNum' class="memberDetail-echarts"></div>
      </div>
      <div class="memberDetail-item">
        <span>被投诉、差评次数</span>
        <p>{{dataItem.badNum}}</p>
        <div ref='dateShareNum' class="memberDetail-echarts"></div>
      </div>
    </div>
    <div class="memberDetail-body">
      <div class="memberDetail-body-title" flex="cross:center main:justify">
        <p>该员工宽带业务接单数据汇总</p>
        <el-date-picker v-model="dataTime" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" size='mini' style='width: 256px;margin-right: 30px;' value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;">
        <el-table :data="dataList" style="width: 100%;" header-cell-class-name='rowClass'>
          <el-table-column prop="serviceNo" label="订单号" align="center">
          </el-table-column>
          <el-table-column prop="serverTypeMsg" label="服务类型" align="center">
            <slot slot-scope="scope">
              <span v-if='scope.row.serverType=="1"' style="color: #738BFF;">新装</span>
              <span v-if='scope.row.serverType=="2"' style="color: #6AE05F">报修</span>
              <span v-if='scope.row.serverType=="3"' style="color: #80158C">移机</span>
              <span v-if='scope.row.serverType=="4"' style="color: #FB7400">续费</span>
            </slot>
          </el-table-column>
          <el-table-column prop="acceptTime	" label="接单时间">
            <slot slot-scope="scope">
              {{ scope.row.acceptTime | getTime }}
            </slot>
          </el-table-column>
          <el-table-column prop="expectStartTime" label="客户预约上门时间" align="center">
            <slot slot-scope="scope">
              <p>{{ scope.row.expectStartReachTime | getTime }}</p>
              -
              <p>{{ scope.row.expectEndReachTime | getTime }}</p>
            </slot>
          </el-table-column>
          <el-table-column prop="regionAddress" label="服务地址" align="center">
          </el-table-column>
          <el-table-column prop="reachTime" label="实际上门时间" align="center">
            <slot slot-scope="scope">
              {{ scope.row.reachTime | getTime }}
            </slot>
          </el-table-column>
          <el-table-column prop="serviceState" label="订单进度" align="center" width="180">
            <slot slot-scope="scope">
              <span v-if='scope.row.serviceState =="1"' style="color: #738BFF;">未接单</span>
              <span v-if='scope.row.serviceState =="2"' style="color: #738BFF;">已接单</span>
              <span v-if='scope.row.serviceState =="3"' style="color: #FB7400;">已到达</span>
              <span v-if='scope.row.serviceState =="4"' style="color: #80158C;">已完成</span>
              <span v-if='scope.row.serviceState =="5"' style="color: #1DE025;">已评价</span>
              <span v-if='scope.row.serviceState =="-1"' style="color: #1DE025;">已取消</span>
            </slot>
          </el-table-column>
          <el-table-column prop="contactFlag" label="客户评价">
            <slot slot-scope="scope">
              <span>
                {{scope.row.commentFlag == 1 ? '差评' :
                  scope.row.commentFlag == 2 ? '一般' : 
                  scope.row.commentFlag == 3 ? '好评' : 
                  ''}}
              </span>
            </slot>
          </el-table-column>
          <el-table-column prop="historyTime" label="操作" align="center" width="150">
            <slot slot-scope="scope">
              <div flex="cross:center main:center" style="color:#FF6E39">
                <router-link tag="div" :to="{name:'fixedDetail', query:{id:scope.row.id}}" class="fixed-edit" btn>详情</router-link>
              </div>
            </slot>
          </el-table-column>
        </el-table>
        <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson' requestMethod='get'></l-pagination>
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
          serverId: this.userId,
          ...this.message,
        },
        url: this.$apis.fixed.info,
      }
    }
  },
  created() {
    this.userName = this.$route.query.userName;
    this.userId = this.$route.query.userId;
    this.getUser();
  },
  mounted() {

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
      this.$http.get(this.$apis.fixed.statistics, {
        params: {
          serverId: this.userId
        }
      }).then(res => {
        if (res.code == '200') {
          this.dataItem = res.data
          // return

          // 接单总数
          let salesList = res.data.dateAcceptOrderNum
          let salesAxis = []
          let salesSeries = []
          for (let i in salesList) {
            salesAxis.push(i)
            salesSeries.push(salesList[i])
          }
          this.oneEcharts(salesAxis, salesSeries, '#FF6A6A', 'allSales', '接单数')
          // 好评数
          let orderNumList = res.data.dateHighOpinionNum
          let orderNumAxis = []
          let orderNumSeries = []
          for (let i in orderNumList) {
            orderNumAxis.push(i)
            orderNumSeries.push(orderNumList[i])
          }
          this.oneEcharts(orderNumAxis, orderNumSeries, '#1890FF', 'dateOrderNum', ' 好评数')

          // 未按时上门次数
          let brokerageList = res.data.dateNotReachTimeNum
          let brokerageAxis = []
          let brokerageSeries = []
          for (let i in brokerageList) {
            brokerageAxis.push(i)
            brokerageSeries.push(brokerageList[i])
          }
          this.twoEcharts(brokerageAxis, brokerageSeries, '#FF6A6A', 'currentBrokerage', '次数')

          // 被投诉、差评次数
          let shareList = res.data.dateBadNum
          let shareAxis = []
          let shareSeries = []
          for (let i in shareList) {
            shareAxis.push(i)
            shareSeries.push(shareList[i])
          }
          this.twoEcharts(shareAxis, shareSeries, '#6AE7CB', 'dateShareNum', '次数')
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

