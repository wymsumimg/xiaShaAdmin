<template>
  <div flex='dir:left'>
    <div class="card detail">
      <div class="detail-title">用户详情</div>
      <div class="detail-item" flex>
        <div class="detail-item-left">用户名：</div>
        <div class="detail-item-right">
          <span v-if='type'>{{model.userName}}</span>
          <el-input v-model="model.userName" style='width:  270px;' :maxlength='5' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">注册时间：</div>
        <div class="detail-item-right">
          <span v-if='type'>{{model.createTime | getTime}}</span>

          <el-input v-model="model.createTime" style='' :maxlength='20' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">消费金额：</div>
        <div class="detail-item-right" style="color: #ff5151;">
          <span v-if='type'>{{userSales ? userSales : '0'}}</span>
          <el-input v-model="userSales" style='width: 270px;' :maxlength='11' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">地址：</div>
        <div class="detail-item-right">
          <span v-if='type'>{{model.regionAddress ? model.regionAddress : '暂无详细地址'}}</span>
          <el-input v-model="model.regionAddress" style='width: 270px;' :maxlength='11' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">成交订单：</div>
        <div class="detail-item-right">
          <span v-if='type'>{{model.companyName ? model.companyName : '0'}}</span>
          <el-input v-model="model.companyName" style='width: 270px;' :maxlength='20' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">佣金：</div>
        <div class="detail-item-right">
          <span v-if='type'>¥{{model.brokerage ? model.brokerage : '0.00'}}</span>
          <el-input v-model="model.brokerage" style='width: 270px;' :maxlength='20' v-else></el-input>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">身份证号：</div>
        <div class="detail-item-right">
          <span v-if='type'>{{model.cardNo}}</span>
          <!-- <el-input v-model="model.cardNo" style='width: 270px;' :maxlength='20' v-else></el-input> -->
          <span v-else>暂无身份信息</span>
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">身份正面：</div>
        <div class="detail-item-right">
          <img :src='model.cardFrontUrl' style="width: 176px; height: 113px;" v-if="type && model.cardFrontUrl" />
          <span v-else>暂无身份信息</span>
          <!-- <div v-else class="imgReserve"></div> -->
          <!-- <el-input v-model="model.companyName" style='width: 270px;' :maxlength='20' v-else></el-input> -->
        </div>
      </div>
      <div class="detail-item" flex>
        <div class="detail-item-left">身份反面：</div>
        <div class="detail-item-right">
          <img :src='model.cardBackUrl' style="width: 176px; height: 113px;" v-if="type && model.cardBackUrl" />
          <span v-else>暂无身份信息</span>
        </div>
      </div>
    </div>
    <div class="card state" id="stateBox" ref="element">
      <div class="state-item" flex="main:justify">
        <div class="state-item-title">用户动态</div>
        <div class="state-item-subhead" flex="cross:right main:justify">
          <div>{{model.userName}}</div>
          <div>共访问{{total}}次</div>
          <div>消费{{userSales}}元</div>
        </div>
      </div>
      <div class="state-details" v-for="(item,index) in dynamic" :key="dynamic+index">
        <div class="state-details-title" flex>
          <div>访问时间：{{item.createTime}}</div>
          <div class="state-details-title-line"></div>
        </div>
        <div class="state-details-content">
          <div flex>
            <div class="behavior">查看商品</div>
            <div class="boyBox" flex>
              <div class="concrete-behavior" v-for="(lookRecord,index) in item.productBrowse" :key="lookRecord+index">
                <div class="behaviorTime">停留 {{lookRecord.stopTime}}s</div>
                <div class="behaviorBody">
                  <div class="img">
                    <img :src="lookRecord.productImg" alt="商品图片">
                  </div>
                  <div class="commodityBox">
                    <div class="nav">{{lookRecord.productTitle}}</div>
                    <div class="price">¥{{lookRecord.productPrice / 100 || numFilter}}</div>
                  </div>
                </div>
              </div>
              <div v-if="!item.productBrowse">无</div>
            </div>
          </div>

          <div flex>
            <div class="behavior">下单商品</div>
            <div class="boyBox" flex>
              <div class="concrete-behavior" v-for="(userRecord,index) in item.userOrderDynamic" :key="userRecord+index">
                <div class="behaviorTime">订单号：{{userRecord.orderNo}}</div>
                <div class="behaviorBody">
                  <div class="img">
                    <img :src="userRecord.productImg" alt="商品图片">
                  </div>
                  <div class="commodityBox">
                    <div class="nav">{{userRecord.productTitle}}</div>
                    <div class="price">¥{{userRecord.productPrice / 100 || numFilter}}</div>
                  </div>
                </div>
              </div>
              <div v-if="!item.userOrderDynamic">无</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { ftruncate } from 'fs';
export default {
  components: {},
  data() {
    return {
      userSales: '',
      total: 0,
      model: {},
      dynamic: [],
      imgUrl: '',
      type: true,
      spec: {
        width: 112,
        height: 112,
        size: '500K'
      },
      currentPage: 1,
      LOCK_STATUS: false
    };
  },
  filters: {
    numFilter(value) {
      let tempVal = parseFloat(value).toFixed(3)
      let realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
  },
  mounted() {
    if (this.id) {
      this.info(this.id)
    } else {
      this.type = false
    }
    window.addEventListener('mousewheel', this.handleScroll, true)
    // window.addEventListener('scroll', this.Scroll)
  },
  methods: {
    handleScroll(e) {
      if (this.LOCK_STATUS) return;
      if (e instanceof Event) {
        var el = e.target;
        var scHeight = el.scrollHeight, scTop = el.scrollTop, clHeight = el.clientHeight;
        //距离底部100px时，开始加载数据
        if (scHeight - scTop > clHeight + 100) return;
      }
      this.LOCK_STATUS = true;
      this.dynamicAjax();
    },
    info(id) {
      this.$http.get(`${this.$apis.member.detail}?id=${id}`).then(res => {
        if (res.code == '200') {
          this.model = res.data.userDTO;
          this.userSales = res.data.userSales;
        }
      })
      this.dynamicAjax(id);
    },
    dynamicAjax(id) {
      this.$http.get(this.$apis.member.dynamic, {
        params: {
          userId: this.id,
          currentPage: this.currentPage,
          pageSize: 3
        }
      }).then(res => {
        if (res.code == '200' && res.data) {
          this.total = res.data.total;
          if (this.dynamic.length > 0) {
            this.dynamic = this.dynamic.concat(res.data.data);
          } else {
            this.dynamic = res.data.data;
          }
          this.currentPage = this.currentPage + 1;
          if (res.data.pages == res.data.pageNum) {
            window.removeEventListener('mousewheel', this.handleScroll, true)
          }
        }
        this.LOCK_STATUS = false;
      })
    },
    update() {
      this.$http.post(this.$apis.member.update, {
        ...this.model,
        state: 2,
        photoUrl: this.imgUrl,
      }).then(res => {
        if (res.code == '200') {
          this.info(res.data);
          this.type = true;
        }
        this.$toast(res.msg)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.content > div {
  background: none;
}
.card {
  min-height: 82%;
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
}
.detail {
  min-width: 466px;
  position: fixed;
  &-item {
    padding: 5px 11px;
    &-btn {
      width: 360px;
      height: 52px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      font-size: 18px;
      margin-top: 95px;
      background: rgba(255, 110, 57, 1);
      border-radius: 10px;
      border: 1px solid rgba(227, 95, 37, 1);
    }
    &-left {
      width: 102px;
      line-height: 40px;
      text-align: right;
      color: rgba(82, 87, 90, 1);
      margin-right: 10px;
    }
    &-right {
      font-size: 14px;
      color: #52575a;
      line-height: 40px;
      position: relative;
    }
    &-imgReserve {
      width: 176px;
      height: 113px;
      background: #b3bedb;
    }
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 30px 0;
    text-indent: 9px;
    display: flex;
    justify-content: space-between;
  }
}
.state {
  min-width: 886px;
  margin-left: 488px;
  overflow: hidden;
  &-item {
    &-title {
      font-size: 32px;
      color: #52575a;
      padding: 30px 0;
      text-indent: 9px;
      display: flex;
      justify-content: space-between;
    }
    &-subhead {
      font-size: 14px;
      padding-top: 50px;
      > div {
        margin-right: 30px;
      }
      > div:not(:first-child) {
        color: #94979b;
      }
    }
  }
  &-details {
    &-title {
      color: #94979b;
      font-size: 14px;
      display: flex;
      &-line {
        width: 560px;
        height: 1px;
        border: 1px solid rgba(240, 240, 240, 1);
        margin: 12px 0 0 22px;
        flex: 1;
      }
    }
    &-content {
      padding: 30px 0;
      > div {
        margin-bottom: 8px;
      }
      .behavior {
        color: #52575a;
        font-size: 16px;
        line-height: 22px;
        padding-right: 10px;
        width: 230px;
      }
      .boyBox {
        display: flex;
        flex-wrap: wrap;
        width: 800px;
        .concrete-behavior {
          margin: 0 10px 12px 0;
          .behaviorTime {
            font-size: 14px;
            line-height: 20px;
            color: #94979b;
          }
          .behaviorBody {
            width: 300px;
            height: 74px;
            padding: 7px;
            border: 1px solid rgba(241, 241, 241, 1);
            display: flex;
            .img {
              img {
                width: 60px;
                height: 60px;
                border: 1px solid rgba(241, 241, 241, 1);
              }
            }
            .commodityBox {
              width: 176px;
              padding-left: 7px;
              .nav {
                width: 217px;
                height: 34px;
                font-size: 12px;
                color: #52575a;
                line-height: 17px;
                margin-bottom: 7px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .price {
                color: #52575a;
                font-size: 14px;
                font-weight: 800;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
