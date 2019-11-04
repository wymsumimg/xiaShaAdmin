<template lang="html">
  <!-- <div class="detail">
    <div class="detail-title">提现记录</div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;margin-top: 32px;">
        <el-table-column prop="userName" label="用户名" align="center" width="180"> </el-table-column>
        <el-table-column prop="createTime" label="申请时间" sortable align="center">
          <slot slot-scope="scope"> {{ scope.row.createTime | getTime}} </slot>
        </el-table-column>
        <el-table-column prop="cardPhone" label="手机号" align="center" width="180"></el-table-column>
        <el-table-column prop="amount" label="提现金额" align="center" width="180">
          <slot slot-scope="scope"> ¥{{ scope.row.amount | getMoney}} </slot>
        </el-table-column>
        <el-table-column prop="amount" label="状态" align="center" width="180">
          <slot slot-scope="scope">
            <span v-if="scope.row.status=='1'">申请中</span>
            <span v-if="scope.row.status=='2'">成功</span>
            <span v-if="scope.row.status=='3'">失败</span>
          </slot>
        </el-table-column>
        <el-table-column prop="historyTime" label="操作" align="center" width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <div class="detail-pass" btn @click='showDailog(scope.row,2)'>通过</div>
              <div class="detail-refuse" btn @click='showDailog(scope.row,3)'>拒绝</div>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
    
    <l-dialog :dialogVisible.sync='dialogVisible' :title='dialog.title' :width='dialog.width' :center="dialog.center">
	    <div class="detail-dialog" flex='dir:top cross:center' v-if="product.type==2">
	      	<div class="dialog-item" flex="cross:center main:center">
		    	<el-radio v-model="product.payType" :label="1">微信支付</el-radio>
		        <el-radio v-model="product.payType" :label="2">其他支付</el-radio>
		    </div>
		   <div class="dialog-item" flex="main:center cross:center">
	          <span>本次支付金额</span>
	          <p style="color:rgba(255,110,57,1);size: 24px;">¥{{product.productPrice | getMoney}}</p>
	       </div>
	       <div class="dialog-item" flex="main:center cross:center" v-show="product.payType == 2">
	         <el-input type="textarea" :rows="6"  v-model="product.remark" placeholder='请在此输入备注' class="add-item-inputValue" style="width: 400px;"></el-input>
	       </div>
	        <el-input type="hidden" v-model="product.productId"></el-input>
	  	</div>
	  	<div class="detail-dialog" flex='dir:top cross:center' v-if="product.type==3">
	  	   <div class="dialog-item" flex="main:center cross:center">
	         <el-input type="textarea" :rows="6"  v-model="product.remark" placeholder='请在此输入拒绝原因' class="add-item-inputValue" style="width: 400px;"></el-input>
	       </div>
	  	</div>
      <div class="orderDetail-dialog-btn" flex="main:center cross:center" btn @click='updateWithdraw' style="margin-left: 80px;">确定</div>
    </l-dialog>
  </div> -->
  <div class="detail">
    <div class="detail-title">提现详情</div>
    
    <div class="detail-item" flex>
      <div class="detail-item-left">提现人：</div>
      <div class="detail-item-right">
        <p>{{dataList.userName}}</p>
      </div>
    </div>
    
    <div class="detail-item" flex>
      <div class="detail-item-left">联系方式：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>

    <div class="detail-item" flex v-if="false">
      <div class="detail-item-left">微信号：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>

    <div class="detail-item" flex>
      <div class="detail-item-left">银行卡号：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>
    
    <div class="detail-item" flex>
      <div class="detail-item-left">提现申请时间：</div>
      <div class="detail-item-right">
        <p>{{dataList.createTime | getTime}}</p>
      </div>
    </div>
    
     <div class="detail-item" flex>
      <div class="detail-item-left">申请提现金额：</div>
      <div class="detail-item-right">
        <p>¥{{dataList.amount / 100 | numFilter}}</p>
      </div>
    </div>
    
    <div class="detail-item" flex style="box-shadow: 0 0 0 0;">
      <div class="detail-item-left">当前状态：</div>
      <div class="detail-item-right">
        <!-- 1:申请中,2:成功,3:失败 -->
        <p>{{dataList.status == 1 ? '申请中' : dataList.status == 2 ? '已同意' : '失败'}}</p>
      </div>
    </div>

    <div class="detail-item" flex v-if="false">
      <div class="detail-item-left">操作人：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone | getTime}}</p>
      </div>
    </div>

    <div class="detail-item" flex v-if="false">
      <div class="detail-item-left">操作时间：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>

    <div class="detail-item" flex v-if="false">
      <div class="detail-item-left">联系电话：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>

    <div class="detail-item" flex v-if="false">
      <div class="detail-item-left">备注：</div>
      <div class="detail-item-right">
        <p>{{dataList.cardPhone}}</p>
      </div>
    </div>

    <div class="detail-btnBox" flex v-if="dataList.status==1">
      <div class="detail-btnBox-pass detail-btnBox-btn" btn @click='showDailog(2)'>同意</div>
      <div class="detail-btnBox-refuse detail-btnBox-btn" btn @click='showDailog(3)'>拒绝</div>
    </div>


    <!-- <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination> -->
    <my-dialog v-if="dialogShow" :dialogShow="dialogShow" :dialog="dialog" :product="product" :changeDialog="changeDialog" :type="type" :listShow="dataListAjax"></my-dialog>
    
  </div>
</template>

<script type="text/babel">
import myDialog from './dialog';
export default {
  components: {
    myDialog
  },
  data() {
    return {
      dataList: {}, //请求数据
      listShow: false,
      dialogShow: false,
      courierNum: '',
      product: {
        payType: 1,
        remark: '',
        remarkShow: false,
        productPrice: 0,
        type: 2,
        productId: 0
      },
      dialog: {
        title: '支付佣金',
        width: '540px',
        center: true,
      },
      type: 'detail'
    };
  },
  filters: {
    numFilter(value) {
      let tempVal = parseFloat(value).toFixed(3)
      let realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  },
  mounted() {
    this.dataListAjax();
  },
  methods: {
    dataListAjax() {
      this.$http.get(this.$apis.money.detail, {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.code == '200') {
          this.dataList = res.data;
        }
      })
    },
    showDailog(type) {
      this.product.productId = this.dataList.id;
      this.product.type = type;
      this.product.productPrice = this.dataList.amount;
      this.changeDialog();
      if (type === 3) {
        this.dialog.title = "拒绝原因";
      } else {
        this.dialog.title = "支付佣金";
      }
    },
    changeDialog() {
      this.dialogShow = !this.dialogShow;
    }
  }
};
</script>

<style scoped lang="scss">
.detail {
  &-title {
    font-size: 32px;
    color: #52575a;
    padding-top: 30px;
    padding-bottom: 5px;
    text-indent: 9px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 40px;
  }
  &-item {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 23px 0 11px;
    line-height: 22px;
    &-left {
      padding-right: 20px;
    }
    &-right {
      font-size: 14px;
      color: #52575a;
    }
  }
  &-btnBox {
    margin-top: 70px;
    &-btn {
      width: 100px;
      height: 40px;
      border-radius: 12px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
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
