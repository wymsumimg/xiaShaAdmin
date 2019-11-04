<template>
  <div class="detail">
    <div class="detail-title">{{type==1 ? '待审核详情' : '审核详情'}}</div>

    <div class="detail-item" flex>
      <div class="detail-item-left">订单编号：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">服务类型：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="type != 3">
      <div class="detail-item-left">商品名称：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    <div class="detail-item" flex v-if="type != 3">
      <div class="detail-item-left">商品规格：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    <div class="detail-item" flex v-if="type != 3">
      <div class="detail-item-left">商品价格：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    <div class="detail-item" flex>
      <div class="detail-item-left">有无光猫：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户下单时间：</div>
      <div class="detail-item-right">
        <p>{{item.createTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">期望服务时间：</div>
      <div class="detail-item-right">
        <p>{{item.expectStartTime | getTime}} - {{item.expectEndTime | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">客户姓名：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">身份证号：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">身份证附件：</div>
      <div class="detail-item-right">
        <div v-if='customerImage.length != 0'>
          <img v-for="(data, index) in customerImage" :key="index" :src="data" style="width: 124px; height: 124px; margin-right: 10px;" />
        </div>
      </div>
    </div>
    <div class="detail-item" flex v-if="state !=3">
      <div class="detail-item-left">{{state == 1 ? '安装地址：' : '服务地址：'}}}</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    <div class="detail-item" flex v-if="state ==3">
      <div class="detail-item-left">原地址：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    <div class="detail-item" flex v-if="state ==3">
      <div class="detail-item-left">现地址：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">联系电话：</div>
      <div class="detail-item-right">
        <p>{{item.faultMsg}}</p>
        <img :src="data" style="width: 124px;height: 124px;margin-right: 10px;" v-for="(data, index) in finishImage" />
      </div>
    </div>
    <div class="detail-item" flex v-if="state !=3">
      <div class="detail-item-left">优惠券：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="state !=3">
      <div class="detail-item-left">支付方式：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="type != 1">
      <div class="detail-item-left">审核人员：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="type != 1">
      <div class="detail-item-left">审核结果：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="type != 1">
      <div class="detail-item-left">审核时间：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>

    <div class="detail-item" flex v-if="type != 1 && state == 3">
      <div class="detail-item-left">拒绝原因：</div>
      <div class="detail-item-right">
        <p></p>
      </div>
    </div>
    
    <div class="detail-item add" flex v-if="type == 1">
      <div flex="main:right cross:center" style="padding: 20px 0;">
        <div class="add-btn" btn @click='confirm()'>同意</div>
        <div class="add-btn2" btn @click='cancel()'>拒绝</div>
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
      type: 1,
      state: 1,
      customerImage: [],
      finishImage: []
    };
  },
  mounted() {
    console.log(this.$route.query)
    // this.details(this.$route.query.id)
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
.add-btn {
  width: 100px;
  height: 40px;
  background: rgba(255, 110, 57, 1);
  border-radius: 12px;
  font-size: 14px;
  color: #ffffff;
  margin-top: 48px;
  text-align: center;
  line-height: 40px;
}
.add-btn2 {
  width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(227, 95, 37, 1);
  font-size: 14px;
  color: #ff6e39;
  box-sizing: border-box;
  margin-left: 16px;
  margin-top: 48px;
  text-align: center;
  line-height: 40px;
}
</style>