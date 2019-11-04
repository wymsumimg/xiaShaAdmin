<template>
  <div class="product">
    <div class="product-title">小区配置
    </div>
    <div class="product-operation">
      <div class="product-operation-left">
        <div class="sign"></div>
        现有小区（共27个）
      </div>
      <router-link tag="div" :to="{name:'addHousing'}" class="product-operation-leftBtn" btn>添加小区
      </router-link>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column prop="regionName" label="小区名称" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="address" label="详细地址" align="center" min-width="300">
        </el-table-column>
        <el-table-column prop="address" label="负责人员" align="center"></el-table-column>
        <el-table-column label="联系电话" align="center" width="100"></el-table-column>
        <el-table-column label="楼栋" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify">
              <router-link tag="div" :to="{name:'housingData'}" class="product-btn-item0" btn>画像
              </router-link>
              <router-link tag="div" :to="{name:'addProduct', query:{id:scope.row.id}}" class="product-btn-item1" btn>详情
              </router-link>
              <router-link tag="div" :to="{name:'addHousing'}" class="product-btn-item2" btn>编辑
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
      .sign {
        width: 6px;
        height: 18px;
        background: rgba(255, 110, 57, 1);
        border-radius: 4px;
        margin-right: 6px;
      }
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
</style>