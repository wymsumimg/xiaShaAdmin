<template>
  <div class="detail">
    <div class="detail-title">报修详情</div>

    <div class="detail-item" flex>
      <div class="detail-item-left">订单编号：</div>
      <div class="detail-item-right">
        <p>{{item.serviceNo}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">服务类型：</div>
      <div class="detail-item-right">
        <p>{{item.serverTypeMsg}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户下单时间：</div>
      <div class="detail-item-right">
        <p>{{item.createTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户预约时间：</div>
      <div class="detail-item-right">
        <p>{{item.expectStartTime | getTime}} - {{item.expectEndTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">师傅接单时间：</div>
      <div class="detail-item-right">
        <p>{{item.acceptTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">实际上门时间：</div>
      <div class="detail-item-right">
        <p>{{item.reachTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">师傅按时上门：</div>
      <div class="detail-item-right">
        <p v-if='!item.reachTime'>还未上门</p>
        <p v-else-if='item.reachTime <= item.expectStartReachTime' style="color: #52575A;">是</p>
        <p v-else-if='item.reachTime > item.expectEndReachTime' style="color: #FF5151;">否</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">申请地址：</div>
      <div class="detail-item-right">
        <p>{{item.customerAddr}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">受理人：</div>
      <div class="detail-item-right">
        <p>{{item.serverName}}</p>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">故障图片/视频：</div>
      <div class="detail-item-right">
        <div v-if='customerImage.length != 0'>
          <img :src="data" style="width: 124px;height: 124px;margin-right: 10px;" v-for="(data, index) in customerImage" />
        </div>
        <video v-if="item.customerVideo" :src="item.customerVideo" style="width: 300px;height: 200px;" controls="controls" v-else></video>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">宽带信息：</div>
      <div class="detail-item-right">
        <p>SN:{{item.thirdSn}}</p>
        <p>PON:{{item.thirdPno}}</p>
        <p>井道位置:{{item.thirdWell}}</p>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">员工推测故障：</div>
      <div class="detail-item-right">
        <p>{{item.faultMsg}}</p>
        <img :src="data" style="width: 124px;height: 124px;margin-right: 10px;" v-for="(data, index) in finishImage" />
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">当前订单进度：</div>
      <div class="detail-item-right">
        <p v-if='item.serviceState =="1"' style="color: #738BFF;">待受理</p>
        <p v-if='item.serviceState =="2"' style="color: #FB7400;">待完成</p>
        <p v-if='item.serviceState =="3"' style="color: #FB0000;">已到达</p>
        <p v-if='item.serviceState =="4"' style="color: #80158C;">已完成</p>
        <p v-if='item.serviceState =="5"' style="color: #1DE025;">已评价</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户评价：</div>
      <div class="detail-item-right">
        <p v-if="item.commentList && item.commentList.length > 0">
          {{item.commentList[0].commentFlag == 1 ? '差评' : item.commentList[0].commentFlag == 2 ? '一般' : '好评'}}
        </p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">评价内容：</div>
      <div class="detail-item-right">
        <p v-if="item.commentList && item.commentList.length > 0">
          {{item.commentList[0].content}}
        </p>
        <img :src="item.commentList[0].imgUrl" style="width: 124px;height: 124px;margin-right: 10px;" v-if="item.commentList && item.commentList.length > 0"
        />
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户姓名：</div>
      <div class="detail-item-right">
        <p>{{item.customerName}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">联系方式：</div>
      <div class="detail-item-right">
        <p>{{item.customerPhone}}</p>
      </div>
    </div>

  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      item: {},
      customerImage: [],
      finishImage: []
    };
  },
  mounted() {
    this.details(this.$route.query.id)
  },
  methods: {
    details(id) {
      this.$http.get(this.$apis.fixed.details, {
        params: {
          id
        }
      }).then(res => {
        if (res.code == '200') {
          this.item = res.data;
          this.customerImage = res.data.customerImage ? res.data.customerImage.split(',').filter((data) => {
            return data != ''
          }) : '';
          this.finishImage = res.data.finishImage ? res.data.finishImage.split(',').filter((data) => {
            return data != ''
          }) : '';
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  &-item {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 11px;
    &-left {
      width: 150px;
      line-height: 40px;
    }
    &-right {
      font-size: 14px;
      color: #52575a;
      line-height: 40px;
    }
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding-top: 30px;
    padding-bottom: 5px;
    text-indent: 9px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 40px;
  }
}
</style>