<template lang="html">
  <!-- <div>派单</div> -->
  <l-dialog :dialogVisible.sync='dialogVisible' title='派单' width='540px'>
    <div class="add">
      <div class="add-item">
        <div class="add-item-left">选择人员</div>
        <div class="add-item-right">
          <el-select v-model="user" placeholder="请选择" style='width: 200px;' value-key="id">
            <el-option
              v-for="(item, key) in userList"
              :key="item.id"
              :label="item.userName+','+item.mobile"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="add-item">
        <div class="add-item-left">预计上门日期</div>
        <div class="add-item-right">
          <el-date-picker v-model="data" type="date" placeholder="选择日期" style="margin-bottom: 20px;width: 200px;" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <div class="add-item">
        <div class="add-item-left">预计上门时间</div>
        <div class="add-item-right">
          <el-time-picker
            is-range
            v-model="time"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
            style="width: 340px;"
            align="left">
          </el-time-picker>
        </div>
      </div>
      <div class="add-item">
        <div class="add-item-left">与客户沟通</div>
        <div class="add-item-right">
          <el-select v-model="inputState" class="fixed-operation-left-searchInput" style="width: 200px;">
				    <el-option label="未沟通" value="1"></el-option>
				    <el-option label="已沟通" value="2"></el-option>
				  </el-select>
        </div>
      </div>
      <div class="add-btnBox" flex="main:center">
        <div class="add-btnBox-pass add-btnBox-btn" btn @click='confirm()'>确定</div>
        <div class="add-btnBox-refuse add-btnBox-btn" btn @click='cancel()'>取消</div>
      </div>
      <div class="add-hint">*派单时请管理员与师傅沟通确定具体的服务时间</div>
    </div>
  </l-dialog>
</template>
<script type="text/babel">
export default {
  name: 'my-dialog',
  data() {
    return {
      dialogVisible: true,
      userList: [],
      inputState: '',
      user: '',
      data: '',
      time: '',
      isDisabled: false
      // regionPrices: []
    }
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    changeDialog: {
      type: Function,
      default: null
    },
    serviceNo: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    dialogVisible() {
      this.changeDialog();
    }
  },
  methods: {
    cancel() {
      this.changeDialog();
    },
    confirm() {
      if (this.user == '') {
        this.$toast('请选择人员');
        return
      }
      if (this.data == '' || this.time.length < 2) {
        this.$toast('请选择预计上门时间');
        return
      }
      if (this.inputState == '') {
        this.$toast('请选择是否与客户沟通');
        return
      }
      if (this.isDisabled) {
        this.$toast("请勿重复点击");
        return;
      }
      this.isDisabled = true;
      this.$http.post(this.$apis.order.accept, {

        orderNo: this.type == 2 ? this.serviceNo : this.serviceNo,
        userId: this.user,
        expectStartReachTime: this.data + ' ' + this.time[0],
        expectEndReachTime: this.data + ' ' + this.time[1],
        contactFlag: this.inputState
      }).then(res => {
        this.isDisabled = false;
        this.$toast(res.msg);
        if (this.type == '1') {
          this.changeDialog();
        } else {
          this.$router.push({ path: '/order' })
        }
      })
    },
    shopList() {
      this.$http.get(this.$apis.member.list, {
        params: {
          userState: 2,
          pageNum: 1,
          pageSize: 100
        }
      }).then(res => {
        this.userList = res.data.data;
      })
    },
  },
  mounted() {
    this.shopList()
  }
}
</script>
<style scoped lang="scss">
.add {
  &-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    &-left {
      min-width: 120px;
      text-align: right;
      font-size: 16px;
      color: #52575a;
      line-height: 40px;
    }
    &-right {
      margin-left: 21px;
      display: flex;
      justify-content: flex-start;
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

  &-hint {
    text-align: center;
    font-size: 16px;
    color: #94979b;
    padding-top: 15px;
    line-height: 22px;
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


