<template>
  <div class="product">
    <div class="product-title" flex="cross:center main:justify">
      <p>全局信息</p>
      <router-link tag="div" :to="{name:'addProduct'}" class="product-operation-leftBtn2">
        <i class="el-icon-plus"></i>立即添加
      </router-link>
    </div>
    <div class="product-operation">
      <div class="product-operation-left">
        <el-select v-model="search.value1" placeholder="请选择类型" style='margin-right: 12px;'>
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="search.value2" placeholder="请选择状态" style='margin-right: 12px;'>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="search.productName" placeholder="输入搜索名称" style='width: 200px;margin-right: 12px;'></el-input>
      </div>
      <div flex>
        <div class="product-operation-leftBtn" @click="clickSearch()">搜索</div>
        <div class="product-operation-leftBtn2" @click="initQuery()" style="width: 100px;">重置</div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="所在页面" align="center" width="100"></el-table-column>
        <el-table-column label="标题" align="center"></el-table-column>
        <el-table-column label="内容" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="100"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify">
              <router-link tag="div" :to="{name:'addProduct', query:{id:scope.row.id}}" class="product-btn-item1" btn>查看
              </router-link>
              <router-link tag="div" :to="{name:'addProduct', query:{id:scope.row.id}}" class="product-btn-item2" btn>编辑
              </router-link>
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item3" btn>删除</div>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <!-- 少 -->
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson' requestMethod='post'></l-pagination>
  </div>
</template>

<script>
export default {
  name: 'informa',
  data() {
    return {
      options1: [{
        value: '选项1',
        label: '界面展示文字'
      }],
      options2: [{
        value: '选项1',
        label: '上线'
      }],
      search: {},
      dataList: [{}]
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
  methods: {
    clickSearch() { }
  }
}
</script>

<style scoped lang="scss">
.product {
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
  &-btn {
    &-item1 {
      font-size: 14px;
      color: #80158c;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #80158c;
    }
    &-item2 {
      font-size: 14px;
      color: #ff6e39;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #ff6e39;
    }
    &-item3 {
      font-size: 14px;
      color: #7386ff;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #7386ff;
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

.product-title {
  padding: 24px 0;
  p {
    font-size: 32px;
    color: #52575a;
  }
  i {
    margin-right: 5px;
    font-size: 14px;
  }
}
</style>