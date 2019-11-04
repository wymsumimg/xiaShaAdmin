<template lang="html">
  <div class="history">
    <div class="history-table">
      <el-table
        :data="dataList"
        style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column
          prop="historyTime"
          label="时间"
          align="center"
          width="180">
          <slot slot-scope="scope">
            {{ scope.row.createTime | getTime}}
          </slot>
        </el-table-column>
        <el-table-column
          prop="dynamicContent"
          label="内容"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dynamicTitle"
          align="center"
          label="荣誉标题"
          width="250">
        </el-table-column>
        <el-table-column
          prop="historyTime"
          label="操作"
          align="center"
          width="150">
          <slot slot-scope="scope">
            <div flex="cross:center main:center">
              <router-link tag="div" :to="{name:'companyDynamicDetail', query:{id:scope.row.id}}" class="company-edit">编辑</router-link>
              <div class="company-delete" @click="$emit('deleteData', {'data':scope.row, 'type':2, 'fun':get})">删除</div>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <router-link tag="div" :to="{name:'companyDynamicDetail'}" class="history-btn" btn flex="cross:center main:center">
  		新增
  	</router-link>
  </div>
</template>

<script type="text/babel">
export default {
  components: {
  },
  data() {
    return {
      dataList: [],
    };
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      this.$http.get(this.$apis.company.getDynamic).then(res => {
        if (res.code == '200') {
          this.dataList = res.data
        }
      })
    },
  }
};
</script>
<style scoped lang="scss">
.history {
  &-edit {
  }
  &-btn {
    width: 360px;
    height: 52px;
    background: rgba(255, 110, 57, 1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 115px;
    font-size: 18px;
    color: #ffffff;
  }
}
</style>

