<template>
  <div class="product">
    <div class="product-title">待审核订单
    </div>
    <div class="product-operation">
      <div class="product-operation-left">
        <el-tabs v-model="activeName" style="flex: 1; font-size: 22px;" flex='dir:top'>
          <el-tab-pane label="新装" name="1" class='shop-item1' style="font-size: 22px;"></el-tab-pane>
          <el-tab-pane label="续费" name="2" class='shop-item2' style="font-size: 22px;"></el-tab-pane>
          <el-tab-pane label="移机" name="3" class='shop-item2' style="font-size: 22px;"></el-tab-pane>
        </el-tabs>
      </div>
      <div flex>
        <el-input placeholder="输入搜索名称" style='width: 250px;margin-right: 12px;'></el-input>
        <div class="product-operation-leftBtn">查询</div>
        <div class="product-operation-leftBtn2" @click="initQuery()" style="width: 100px;">重置</div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;" v-if="activeName != 3">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="regionName" label="订单编号" align="center" min-width="130"></el-table-column>
        <el-table-column prop="regionName" label="商品名称" align="center" min-width="130"></el-table-column>
        <el-table-column prop="regionName" label="规格" align="center" min-width="130"></el-table-column>
        <el-table-column prop="regionName" label="安装地址" align="center" min-width="130"></el-table-column>
        <el-table-column prop="regionName" label="审核人" align="center"></el-table-column>
        <el-table-column prop="regionName" label="审核时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify">
              <router-link tag="div" :to="{name:'acceptOrderDetail'}" class="product-btn-item1" btn>详情
              </router-link>
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item2" btn>受理</div>
              <!-- <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item3" btn>{{''}}</div> -->
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item4" btn>退回</div>
              <!-- <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item5" btn>已退回</div> -->
            </div>
          </slot>
        </el-table-column>
      </el-table>

      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;" v-else>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="regionName" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="regionName" label="原地址" align="center"></el-table-column>
        <el-table-column prop="regionName" label="现地址" align="center"></el-table-column>
        <el-table-column prop="regionName" label="审核人" align="center"></el-table-column>
        <el-table-column prop="regionName" label="审核时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify">
              <router-link tag="div" :to="{name:'acceptOrderDetail'}" class="product-btn-item1" btn>详情
              </router-link>
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item2" btn>受理</div>
              <!-- <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item3" btn>{{''}}</div> -->
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item4" btn>退回</div>
              <!-- <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item5" btn>已退回</div> -->
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <!-- 少 -->
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson' requestMethod='post'></l-pagination>

    <l-dialog :dialogVisible.sync='agreeDialog' :title='dialog1.title' :width='dialog1.width' :center="true">
      <div class="orderDetail-dialog" flex='dir:top cross:center'>
        <div class="add">
          <div class="add-item">
            <div class="add-item-left">宽带账号</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverName" placeholder='请输入宽带账号' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">宽带密码</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverMobile" placeholder='请输入宽带密码' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">是否拆机</div>
            <div class="add-item-right">
              <el-radio v-model="account.radio" label="1">已拆机</el-radio>
              <el-radio v-model="account.radio" label="2">未拆机</el-radio>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">到期时间</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverAddress" placeholder='请输入此宽带到期时间' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">井道位置</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverAddress" placeholder='请输入井道位置' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">SN</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverAddress" placeholder='请输入SN信息' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item">
            <div class="add-item-left">PON</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverAddress" placeholder='请输入PON信息' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-item" v-if="account == 3">
            <div class="add-item-left">配置金额</div>
            <div class="add-item-right">
              <el-input v-model="account.receiverAddress" placeholder='请输入本次移机服务费用' style='width: 360px;' class="dialog-item"></el-input>
            </div>
          </div>
          <div class="add-btnBox" flex="main:center">
            <div class="add-btnBox-pass add-btnBox-btn" btn @click='confirm()'>确定</div>
            <div class="add-btnBox-refuse add-btnBox-btn" btn @click='cancel()'>取消</div>
          </div>
        </div>
      </div>
    </l-dialog>
    <l-dialog :dialogVisible.sync='rejectDialog' :title='dialog2.title' :width='dialog2.width' :center="true">
      <div class="orderDetail-dialog" flex='dir:top cross:center'>
        <!-- <el-input v-model="courierNum" placeholder='请输入快递单号' style='width: 476px; height: 157px;'></el-input> -->
        <el-input type="textarea" v-model="courierNum" placeholder="请填写本次退回重新审核原因…" :rows="3 " :maxlength='100'></el-input>
        <div class="add-btnBox" flex="main:center">
          <div class="add-btnBox-pass add-btnBox-btn" btn @click='confirm()' style="width: 360px; margin: 0;">确定</div>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script>
export default {
  name: 'acceptOrder',
  data: function () {
    return {
      dataList: [],
      activeName: '1',
      agreeDialog: false,
      rejectDialog: false,
      dialog1: {
        title: "受理",
        width: "540px"
      },
      dialog2: {
        title: "退回重新审核",
        width: "540px"
      },
      courierNum: '',
      account: {}
    }
  },
  computed: {
    dataJson() {
      return {
        model: {
          dateOption: this.search,
          orderColumn: this.search,
          orderRule: this.search,
        },
        url: this.$apis.main.productRank,
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.product {
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
  &-title {
    padding: 24px 0;
    font-size: 32px;
    color: #52575a;
  }
  &-btn {
    &-item0 {
      font-size: 14px;
      color: #e7002b;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #e7002b;
    }
    &-item1 {
      font-size: 14px;
      color: #7386ff;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #7386ff;
    }
    &-item2 {
      font-size: 14px;
      color: #1dbd55;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #1dbd55;
    }
    &-item3 {
      font-size: 14px;
      color: #1dbd55;
      padding: 0 10px;
      height: 28px;
    }
    &-item4 {
      font-size: 14px;
      color: #ff6e39;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #ff6e39;
    }
    &-item5 {
      font-size: 14px;
      color: #ff6e39;
      padding: 0 10px;
      height: 28px;
    }
  }
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    &-left {
      display: flex;
      align-items: center;
    }
    &-leftBtn {
      width: 100px;
      height: 40px;
      background: rgba(255, 110, 57, 1);
      border-radius: 12px;
      font-size: 14px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 11px;
    }
    &-leftBtn2 {
      width: 120px;
      height: 40px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px solid rgba(227, 95, 37, 0.62);
      display: flex;
      color: #e35f25;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
.add {
  &-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    &-left {
      min-width: 100px;
      text-align: right;
      font-size: 16px;
      color: #52575a;
      line-height: 40px;
    }
    &-right {
      margin-left: 21px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
    &-addPrice {
      height: 40px;
      border-radius: 5px;
      border: 1px solid rgba(225, 225, 225, 1);
      margin-bottom: 15px;
      span {
        font-size: 16px;
        padding: 0 15px;
        line-height: 38px;
        border-right: 1px solid #e1e1e1;
        display: block;
      }
      p {
        font-size: 16px;
        padding: 0 10px;
        flex: 1;
        text-align: center;
        line-height: 38px;
        border-right: 1px solid #e1e1e1;
        display: block;
      }
      i {
        font-size: 14px;
        padding: 0 5px;
      }
    }
    &-add {
      width: 200px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(255, 110, 57, 1);
      color: #e35f25;
      font-size: 14px;
      i {
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }
  &-btnBox {
    margin-top: 50px;
    &-btn {
      width: 200px;
      height: 52px;
      border-radius: 12px;
      font-size: 18px;
      text-align: center;
      line-height: 52px;
    }
    &-pass {
      border: 1px solid rgba(255, 110, 57, 1);
      background: rgba(255, 110, 57, 1);
      color: #fff;
      margin-right: 12px;
    }
    &-refuse {
      border: 1px solid #ff6e39;
      color: #ff6e39;
    }
  }
}
</style>