<template>
  <div class="member">
    <div class="member-title" flex='cross:center main:justify'>
      公司成员
      <router-link tag="div" :to="{name:'memberDetail'}" class="member-top-left" btn>
        <i class="el-icon-plus" style="margin-right: 5px;font-size: 14px;"></i>新增成员
      </router-link>
    </div>
    <div class="member-top" flex='cross:center main:justify'>
      <div flex>
        <el-input v-model="queryName" placeholder="输入姓名搜索" suffix-icon="el-icon-search" style='width: 270px;margin-right: 30px;'></el-input>
        <el-input v-model="queryMobile" placeholder="输入手机搜索" suffix-icon="el-icon-search" style='width: 270px;'></el-input>
      </div>

    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column prop="historyTime" label="头像" align="center" width="60">
          <slot slot-scope="scope">
            <img :src='scope.row.photoUrl' style="width: 48px;height: 48px;border-radius:10px;" />
          </slot>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="position" align="center" label="职位">
        </el-table-column>
        <el-table-column prop="mobile" align="center" label="电话">
        </el-table-column>
        <el-table-column prop="historyTime" label="操作" align="center" width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <div class="member-delete" @click="deleteData(scope.row.id)" btn>删除</div>
              <router-link tag="div" :to="{name:'memberDetail', query:{id:scope.row.id}}" class="member-edit" btn>详情</router-link>
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
  components: {},
  data() {
    return {
      queryName: '',
      queryMobile: '',
      dataList: [],
      listShow: false,
    };
  },
  computed: {
    dataJson() {
      return {
        model: {
          userName: this.queryName,
          mobile: this.queryMobile,
          userState: 2,
        },
        url: this.$apis.member.list,
        listShow: this.listShow
      }
    }
  },
  methods: {
    deleteData(id) {
      this.$confirm('您确定要从组织架构中删除该成员吗？（删除后不可恢复）', '温馨提示', {
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
      }).catch(() => { })
    }
  }
};
</script>

<style lang="scss" scoped>
.member {
  padding: 0 21px !important;
  &-edit {
    font-size: 14px;
    color: #ff6e39;
    padding-left: 8px;
  }
  &-delete {
    font-size: 14px;
    color: #ff6e39;
    padding-right: 8px;
    border-right: 1px solid #d8d8d8;
  }
  &-top {
    margin-bottom: 26px;
    &-left {
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
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
  }
}
</style>
