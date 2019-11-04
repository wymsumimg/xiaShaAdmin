<template>
  <div class="detail">
    <div class="detail-title">账号权限编辑</div>
    <el-col :offset="4">
      <el-form label-position="right" label-width="70px" :model="account" style="width: 460px;">
        <el-form-item label="用户名">
          <el-input v-model="account.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="account.mobile"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="account.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="account.confirmPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择权限">
          <div flex='dir:left cross:center' style="width: 360px;">
            <el-checkbox-group v-model="functionIds">
              <el-checkbox v-for="(operate, index) in permissions" :label="operate.id" :key="operate.id" :value="operate.id">
                {{operate.menuName}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>

      <div class="detail-save-btn" flex="main:center cross:center" btn @click='addAccount' disabled>保存</div>
    </el-col>
  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
      permissions: [],
      functionIds: [],
      account: {
        name: "",
        mobile: "",
        pwd: "",
        confirmPwd: ""
      },
      item: {},
      customerImage: [],
    };
  },
  mounted() {
    this.getDetail(this.$route.query.id);
  },
  methods: {
    addAccount() {
      if (this.account.name == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (this.account.mobile == "") {
        this.$toast("请输入手机号码");
        return;
      }
      if ((this.account.pwd != "" || this.account.confirmPwd != "") && this.account.pwd != this.account.confirmPwd) {
        this.$toast("两次密码不一致");
        return;
      }


      var params = {
        id: this.$route.query.id,
        name: this.account.name,
        mobile: this.account.mobile,
        pwd: this.account.pwd ? this.account.pwd : null,
        functionIds: this.functionIds
      };

      this.$http
        .post(this.$apis.account.update, {
          ...params
        })
        .then(res => {
          this.$toast(res.msg);
          this.listShow = !this.listShow;
          this.dialogVisible = false;
          // 跳转回list
          this.$router.push({ path: '/account' })
        });
    },
    getDetail(id) {
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
            this.account.confirmPwd = "";
            this.permissions = Object.assign({}, res.data.functionList);
            this.functionIds = [];
            for (let i in res.data.functionList) {
              if (res.data.functionList[i].selected === 1) {
                this.functionIds.push(res.data.functionList[i].id);
              }
            }
          }
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.detail {
  &-item {
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 11px;
    &-left {
      width: 102px;
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
  &-save-btn {
    width: 360px;
    height: 52px;
    background: rgba(255, 110, 57, 1);
    border-radius: 10px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    font-size: 18px;
    margin: 77px 0 0 70px;
  }
}
</style>