<template>
    <div class="top" flex="cross:center">
      <div class="item" flex-box="1" v-if="totalObj.objOne">
        <div flex="cross:center main:justify">
          <div class="dataName">{{totalObj.objOne.title}}</div>
          <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
        </div>
        <div class="des" flex="main:right">今日:73232</div>
        <div id="saleNum" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
      </div>
      <div class="item" flex-box="1" v-if="totalObj.objTwo">
        <div flex="cross:center main:justify">
          <div class="dataName">{{totalObj.objTwo.title}}</div>
          <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
        </div>
        <div class="des" flex="main:right">今日:73232</div>
        <div id="orderNum" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
      </div>
      <div class="item" flex-box="1" v-if="totalObj.objThree">
        <div flex="cross:center main:justify">
          <div class="dataName">{{totalObj.objThree.title}}</div>
          <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
        </div>
        <div class="des" flex="main:right">今日:73232</div>
        <div id="cutSale" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
      </div>
      <div class="item" flex-box="1" v-if="totalObj.objFour">
        <div flex="cross:center main:justify">
          <div class="dataName">{{totalObj.objFour.title}}</div>
          <div class="title blueTitle">{{topData.salesToday || 0 | getMoney}}</div>
        </div>
        <div class="des" flex="main:right">今日:73232</div>
        <div id="productSale" :style="{width:'100%',height:'150px',marginTop:'-50px'}"></div>
      </div>
    </div>
</template>
<script type="text/babel">
export default {
  props: {
    totalObj:{}
  },
  data() {
    return {
      topData:{}
    }
  },
  mounted() {
      this.initEcharts()
  },
  methods: {
    initEcharts(){
      this.drawBar()
      this.drawLine()
      this.drawBar2()
      this.drawLine2()
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
  },
}
</script>
<style lang="scss" scoped>
.item {
  width: 0;
  // height: 128px;
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
</style>