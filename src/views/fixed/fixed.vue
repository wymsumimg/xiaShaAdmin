<template>
  <div class="fixed">
    <div flex="main:justify">
      <div class="fixed-title">宽带业务列表</div>
      <div>
        <a class="leftBtn2" :href="excelExport" target="_blank">导出excle</a>
      </div>
    </div>
    <div flex="main:justify">
      <div class="">
        <el-input v-model="inputName" placeholder="接单人员姓名" class="searchInput"></el-input>
        <el-date-picker v-model="inputTime" type="date" placeholder="接单时间" value-format="yyyy-MM-dd" class="searchInput">
        </el-date-picker>
        <el-input v-model="inputAddress" placeholder="地址" class="searchInput"></el-input>
        <el-select v-model="inputState" placeholder="订单进度" class="searchInput">
          <el-option label="待受理" value="1"></el-option>
          <el-option label="待完成" value="2"></el-option>
          <el-option label="已到达" value="3"></el-option>
          <el-option label="已完成" value="4"></el-option>
          <el-option label="已评价" value="5"></el-option>
        </el-select>
      </div>
      <div flex>
        <div class="leftBtn" @click="serverName=inputName;acceptTime=inputTime;customerAddr=inputAddress;serviceState=inputState">查询</div>
        <div class="leftBtn2" btn @click='model = {};chaxun()' style="margin: 0 0 0 16px">重置</div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;" :default-sort="{prop: 'createTime', order: 'descending'}">
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
        <el-table-column prop="acceptTime" label="接单时间" sortable align="center">
          <slot slot-scope="scope">
            {{ scope.row.acceptTime | getTime}}
          </slot>
        </el-table-column>
        <el-table-column prop="serverName" label="接单员工" align="center">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <router-link tag="div" :to="{name:'dataStaff', query:{userId:scope.row.serverId,userName:scope.row.serverName}}" class="fixed-link"
                btn>{{scope.row.serverName}}</router-link>
            </div>
          </slot>
        </el-table-column>

        <el-table-column prop="customerAddr" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <slot slot-scope="scope">
            {{ scope.row.createTime | getTime}}
          </slot>
        </el-table-column>

        <!-- <el-table-column
          prop="serviceState"
          label="按时上门"
          align="center">
          <slot slot-scope="scope" v-if='scope.row.reachTime > 2 && scope.row.reachTime != null'>
            <span v-if='scope.row.reachTime <= scope.row.expectStartReachTime' style="color: #FF5151;">是</span>
            <span v-if='scope.row.reachTime > scope.row.expectEndReachTime' style="color: #52575A;">否</span>
          </slot>
        </el-table-column> -->

        <el-table-column prop="serviceState" label="订单进度" align="center">
          <slot slot-scope="scope">
            <span v-if='scope.row.serviceState =="1"' style="color: #738BFF;">待受理</span>
            <span v-if='scope.row.serviceState =="2"' style="color: #FB7400;">待完成</span>
            <span v-if='scope.row.serviceState =="3"' style="color: #FB0000;">已到达</span>
            <span v-if='scope.row.serviceState =="4"' style="color: #80158C;">已完成</span>
            <span v-if='scope.row.serviceState =="5"' style="color: #1DE025;">已评价</span>
          </slot>
        </el-table-column>

        <el-table-column prop="historyTime" label="操作" align="center" width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:right">
              <div class="fixed-send" btn @click="send(scope.row.serviceNo)" v-if="scope.row.serviceState =='1'">派单</div>
              <router-link tag="div" :to="{name:'fixedDetail', query:{id:scope.row.id}}" class="fixed-edit" btn>详情</router-link>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
    <send-orders v-if="dialogShow" :dialogShow="dialogShow" :changeDialog="changeDialog" :serviceNo="serviceNo" :type="toOrdersType"></send-orders>
  </div>
</template>

<script type="text/babel">
import sendOrders from '../../components/sendOrders/send-orders.vue';
export default {
  components: {
    sendOrders
  },
  data() {
    return {
      inputName: '',
      inputTime: '',
      inputAddress: '',
      inputState: '',
      serverName: '',
      acceptTime: '',
      customerAddr: '',
      serviceState: '',
      dataList: [],
      dialogShow: false,
      serviceNo: '',
      toOrdersType: '1',
      listShow: false
    };
  },
  computed: {
    excelExport() {
      return `${this.$apis.fixed.excelExport}?serverName=${this.inputName}&acceptTime=${this.inputTime}&customerAddr=${this.inputAddress}&serviceState=${this.inputState}`
    },
    dataJson() {
      return {
        model: {
          serverName: this.serverName,
          acceptTime: this.acceptTime,
          customerAddr: this.customerAddr,
          serviceState: this.serviceState,
        },
        url: this.$apis.fixed.info,
        listShow: this.listShow
      }
    }
  },
  mounted() {
  },
  methods: {
    send(serviceNo) {
      this.serviceNo = serviceNo;
      this.dialogShow = true;
    },
    changeDialog() {
      this.listShow = !this.listShow;
      this.dialogShow = !this.dialogShow;
    }
  }
};
</script>

<style scoped lang="scss">
.leftBtn {
  width: 100px;
  min-width: 100px;
  height: 40px;
  background: rgba(255, 110, 57, 1);
  border-radius: 12px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  margin-bottom: 12px;
}
.leftBtn2 {
  width: 100px;
  min-width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(227, 95, 37, 0.62);
  display: flex;
  color: #e35f25;
  font-size: 14px;
  justify-content: center;
  margin: 24px 0 12px 21px;
  align-items: center;
  cursor: pointer;
}
.searchInput {
  width: 200px;
  margin: 0 50px 12px 0;
}
.fixed-link {
  color: #738bff;
}
.fixed-edit {
  width: 48px;
  height: 28px;
  border-radius: 16px;
  border: 1px solid rgba(115, 139, 255, 1);
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #738bff;
}
.fixed-send {
  width: 48px;
  height: 28px;
  border-radius: 16px;
  border: 1px solid rgba(255, 110, 57, 1);
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #ff6e39;
  margin-right: 12px;
}
.fixed-title {
  font-size: 32px;
  color: #52575a;
  padding: 24px 0;
}
</style>
