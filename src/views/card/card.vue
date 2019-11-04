<template>
  <div class="card">
    <div class="card-title" flex='main:justify cross:center'>
      <p>用户列表</p>
    </div>
    <div class="card-operation">
      <div class="card-operation-left">
        <div>
          <el-input v-model="inputValue" placeholder="用户名" style='width: 200px;margin-right: 60px;'></el-input>
          <el-input v-model.number="inputMobile" placeholder="手机号" style='width: 200px;margin-right: 60px;'></el-input>
          <el-date-picker v-model="inputTime" type="date" placeholder="注册时间" value-format="yyyy-MM-dd" style='width: 200px;margin-right: 60px;'>
          </el-date-picker>
        </div>
        <div flex>
          <div class="card-operation-leftBtn" @click="userName = inputValue;mobile = inputMobile; createTime = inputTime">查询</div>
          <a class="card-operation-leftBtn2" :href="excelExport" target="_blank">导出excle</a>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="regionAddress" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="position" align="center" label="注册时间">
          <slot slot-scope="scope">
            {{scope.row.createTime | getTime}}
          </slot>
        </el-table-column>
        <el-table-column prop="mobile" align="center" label="电话">
        </el-table-column>
        <el-table-column prop="historyTime" label="操作" align="center" width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <router-link tag="div" :to="{name:'cardDetail', query:{id:scope.row.id}}" class="card-edit" btn>详情
              </router-link>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
  </div>

</template>

<script type="text/babel">
export default {
  components: {
  },
  data() {
    return {
      inputValue: '',
      inputMobile: '',
      inputTime: '',
      userName: '',
      mobile: '',
      createTime: '',
      dataList: [],
      listShow: false,
    };
  },
  computed: {
    excelExport() {
      return `${this.$apis.member.excelExport}?userName=${this.inputValue}&mobile=${this.mobile}&createTime=${this.createTime}&userState=1`
    },
    dataJson() {
      return {
        model: {
          userName: this.userName,
          mobile: this.mobile,
          createTime: this.createTime,
          userState: 1,
        },
        url: this.$apis.member.list,
        listShow: this.listShow
      }
    }
  },
  mounted() {
  },
  methods: {
    deleteData(id) {
      this.$confirm('您确定要删除该员工吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apis.member.userDelete, {
          params: {
            id
          }
        }).then(res => {
          if (res.code == '200') {
            this.listShow = !this.listShow
          }
          this.$toast(res.msg)
        })
      }).catch(() => {
      });

    }
  }
};
</script>

<style scoped lang="scss">
.card {
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
  &-edit {
    width: 48px;
    height: 28px;
    border-radius: 16px;
    border: 1px solid rgba(255, 110, 57, 1);
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    color: #ff6e39;
  }
  &-delete {
    width: 48px;
    height: 28px;
    border-radius: 16px;
    border: 1px solid rgba(227, 95, 37, 1);
    font-size: 14px;
    color: #e35f25;
    text-align: center;
    line-height: 26px;
  }
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    &-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    &-right {
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
      margin-left: 21px;
      align-items: center;
      cursor: pointer;
      // img {
      //   width: 16px;
      //   height: 11px;
      //   margin-right: 8px;
      // }
    }
  }
}
.card-title {
  p {
    font-size: 32px;
    color: #52575a;
  }
  padding: 24px 0;
}
</style>
