<template>
  <div class="fixed">
    <div class="fixed-title">账户设置</div>
    <div class="fixed-operation">
      <div class="fixed-operation-left">
      </div>
      <div class="fixed-operation-right">
        <div class="fixed-operation-leftBtn2" btn @click="addAcount">
          <i class="iconfont icontianjiayonghu"></i>
          新增账号
        </div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;" :default-sort="{prop: 'createTime', order: 'descending'}">
        <el-table-column prop="name" label="用户名" align="center">
        </el-table-column>

        <el-table-column prop="mobile" label="账号" align="center">
        </el-table-column>

        <el-table-column prop="historyTime" label="操作" align="center">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <router-link tag="div" :to="{name:'accountDetail', query:{id:scope.row.id}}" class="fixed-edit" btn>编辑
              </router-link>

              <div class="fixed-delete" btn @click='delAccount(scope.row.id)'>删除</div>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson'></l-pagination>
    <l-dialog :dialogVisible.sync='dialogVisible' :title='dialog.title' :width='dialog.width' :center="dialog.center">
      <div class="detail-dialog" flex='dir:top cross:center'>
        <el-input v-model="account.name" placeholder='请输入姓名' style='width: 360px;' class="dialog-item"></el-input>
        <el-input v-model="account.mobile" placeholder='请输入手机号码' style='width: 360px;' class="dialog-item"></el-input>
        <el-input v-model="account.pwd" placeholder='请输入密码' style='width: 360px;' class="dialog-item"></el-input>
        <div flex='dir:top cross:center' style="width: 360px;margin-top: 20px;">
          <el-checkbox-group v-model="functionIds">
            <el-checkbox v-for="(operate,index) in permissions" :label="operate.id" :key="operate.id" :value="operate.id">
              {{operate.menuName}}{{operate.selected}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div :class="btnClass" flex="main:center cross:center" btn @click='addAccount' style="margin-left: 60px;" disabled>保存</div>
    </l-dialog>

  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data () {
    return {
      textValue: "",
      queryContent: "",
      dataList: [],
      dialogVisible: false,
      permissions: [],
      functionIds: [],
      editId: "",
      isDisabled: false,
      account: {
        name: "",
        mobile: "",
        pwd: ""
      },
      dialog: {
        title: "新增账号",
        width: "540px",
        center: true
      },
      listShow: false,
      reFresh: false
    };
  },
  computed: {
    dataJson () {
      return {
        model: {},
        url: this.$apis.account.list,
        listShow: this.listShow
      };
    },
    btnClass () {
      return this.account.name && this.account.mobile && this.account.pwd && this.functionIds.length ?
        'orderDetail-dialog-btn' : 'orderDetail-dialog-disabled-btn'
    },
  },
  mounted () {
    this.getPermissions();
  },
  methods: {
    addAcount () {
      this.account.name = "";
      this.account.mobile = "";
      this.dialog.title = "添加账号";
      this.functionIds = [];
      this.dialogVisible = true;
      this.account.pwd = "";
    },
    updateAccount (id) {
      this.editId = id;
      this.getDetail(id);
    },
    getPermissions () {
      this.$http
        .get(this.$apis.account.getPermissions, {
          params: {}
        })
        .then(res => {
          if (res.code == "200") {
            this.permissions = res.data;
          }
        });
    },
    getDetail (id) {
      this.$http
        .get(this.$apis.account.getDetail, {
          params: {
            userId: id
          }
        })
        .then(res => {
          if (res.code == "200") {
            this.account.name = res.data.name;
            this.account.mobile = res.data.mobile;
            this.account.pwd = "";
            this.dialog.title = "编辑账号";
            this.dialogVisible = true;
            this.functionIds = [];
            for (let i in res.data.functionList) {
              if (res.data.functionList[i].selected === 1) {
                this.functionIds.push(res.data.functionList[i].id);
              }
            }
          }
        });
    },
    addAccount () {

      if (this.account.name == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (this.account.mobile == "") {
        this.$toast("请输入手机号码");
        return;
      }
      if (this.account.pwd == "") {
        this.$toast("请输入密码");
        return;
      }
      if (this.functionIds.length == 0) {
        this.$toast("请选择权限");
        return;
      }
      if (this.isDisabled) {
        this.$toast("请勿重复点击");
        return;
      }
      this.isDisabled = true;

      var params = {
        name: this.account.name,
        mobile: this.account.mobile,
        pwd: this.account.pwd,
        functionIds: this.functionIds
      };
      if (this.editId != "") {
        params.id = this.editId;
      }
      this.$http.post(this.$apis.account.update, {
        ...params
      })
        .then(res => {
          this.isDisabled = false;
          this.$toast(res.msg);
          this.listShow = !this.listShow;
          this.dialogVisible = false;
        });

    },
    delAccount (id) {
      this.$confirm('您确定要删除该账户吗？（删除后不可恢复）', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apis.account.delAccount, {
          params: {
            id
          }
        })
          .then(res => {
            this.$toast(res.msg);
            this.listShow = !this.listShow;
            this.dialogVisible = false;
          });
      }).catch(() => { });
    }
  }
};
</script>

<style scoped lang="scss">
.el-checkbox {
  width: 90px;
  height: 40px;
}

.dialog-item {
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 110px;
    color: #52575a;
    font-size: 16px;
    margin-right: 50px;
  }
  p {
    display: inline-block;
    color: #52575a;
    font-size: 16px;
  }
}

.orderDetail-dialog-btn {
  width: 360px;
  height: 42px;
  box-sizing: border-box;
  font-size: 16px;
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  background: rgba(255, 110, 57, 1);
  border-radius: 10px;
  border: 1px solid rgba(227, 95, 37, 1);
  color: #ffffff;
}

.orderDetail-dialog-disabled-btn {
  width: 360px;
  height: 42px;
  box-sizing: border-box;
  font-size: 16px;
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background: rgba(235, 237, 241, 1);
  border: 1px solid rgba(225, 225, 225, 1);
  color: #e1e1e1;
}

.fixed {
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
  &-link {
    color: #738bff;
  }
  &-edit {
    font-size: 14px;
    color: #3a84ff;
    padding-right: 8px;
    border-right: 1px solid #d8d8d8;
  }
  &-delete {
    font-size: 14px;
    padding-left: 8px;
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
      img {
        width: 16px;
        height: 11px;
        margin-right: 8px;
      }
    }
  }
}

.fixed-title {
  font-size: 32px;
  color: #52575a;
  padding: 24px 0;
}
</style>
