<template lang="html">
  <div class="productDetail">
    <div flex="cross:center" style="margin-bottom: 24px;">
      <div class="productDetail-tittle" flex="cross:center">
        <div flex="cross:center" style='flex: 1;'>
          <img :src="product.productImg" />
          <div style='flex: 1;'>
            <p style="font-size: 22px">{{product.productName}}</p>
          </div>
        </div>
        <i class="el-icon-arrow-down"></i>
      </div>
      <div btn @click="tabType = 1" class="productDetail-tab" flex='dir:top main:center cross:center' :style="{'border-color': tabType == '1' ? '#FF6E39' : '#D9D9D9'}">
        <img src="./images/tab1_2.png" style="width: 16px;height: 19px;" v-if="tabType == '1'"  />
        <img src="./images/tab1_1.png" style="width: 16px;height: 19px;" v-else  />
        <p :style="{'color': tabType == '1' ? '#FF6E39' : 'rgba(0,0,0,0.65)'}">基础数据</p>
      </div>
      <div btn @click="tabType = 2" class="productDetail-tab"  flex='dir:top main:center cross:center' :style="{'border-color': tabType == '2' ? '#007AFF' : '#D9D9D9'}">
        <img src="./images/tab2_2.png" style="width: 24px;height: 18px;" v-if="tabType == '2'"  />
        <img src="./images/tab2_1.png" style="width: 24px;height: 18px;" v-else  />
        <p :style="{'color': tabType == '2' ? '#007AFF' : 'rgba(0,0,0,0.65)'}">人物关系</p>
      </div>
    </div>
    <div flex="main:justify">
      <div class="productDetail-item">
        <span>销售额</span>
        <p>{{dataItem.allSales | getMoney(2)}}</p>
        <div ref='allSales' class="productDetail-echarts"></div>
      </div>
      <div class="productDetail-item">
        <span>产品被查看数</span>
        <p>{{dataItem.allBrowse}}</p>
        <div ref='allBrowse' class="productDetail-echarts"></div>
      </div>
    </div>
    <div class="productDetail-body">
    	<one-product v-if='tabType == "1"'></one-product>
    	<two-product v-else></two-product>
    </div>
  </div>
</template>

<script type="text/babel">
import echarts from 'echarts'
import oneProduct from './component/oneProduct'
import twoProduct from './component/twoProduct'

export default {
  components: {
    oneProduct, twoProduct
  },
  data() {
    return {
      tabType: 1,
      dataItem: {},
      product: {},
    };
  },
  mounted() {
    this.productTop()
    this.product = JSON.parse(this.$route.query.dataItem)
  },
  methods: {
    oneEcharts(Axis, Series, color, refName) {
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
            name: '直接访问',
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
    twoEcharts(Axis, Series, color, refName) {
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
            name: '直接访问',
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
    productTop() {
      this.$http.get(this.$apis.main.productTop, {
        params: {
          productId: this.$route.query.productId
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
          this.$nextTick(() => {
            this.oneEcharts(salesAxis, salesSeries, '#FF6A6A', 'allSales')
          })
          // 查看数
          let browseList = res.data.dateBrowse
          let browseAxis = []
          let browseSeries = []
          for (let i in browseList) {
            browseAxis.push(i)
            browseSeries.push(browseList[i])
          }
          this.$nextTick(() => {
            this.twoEcharts(browseAxis, browseSeries, '#50E3C2', 'allBrowse')
          })
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.productDetail {
  &-tab {
    width: 102px;
    height: 76px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-left: 27px;
    border: 1px solid rgba(217, 217, 217, 1);
    img {
      margin-bottom: 11px;
      display: block;
    }
    p {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss" scoped>
.rowClass {
  background: #fafafa !important;
}
.productDetail {
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
    width: 48%;
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
    width: 365px;
    height: 74px;
    border-radius: 10px;
    background: #ffffff;
    padding: 0 10px;
    img {
      width: 46px;
      height: 46px;
      object-fit: cover;
      margin-right: 11px;
    }
    p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 30px;
      @include ellipsis(1);
      flex: 1;
    }
    span {
      color: #d0021b;
      font-size: 14px;
    }
    i {
      color: rgba(0, 0, 0, 0.25);
      font-size: 14px;
    }
  }
}
</style>

