<template>
  <div class="product">
    <div class="product-title" flex="cross:center main:justify">
      <p>商品列表</p>
      <router-link tag="div" :to="{name:'addProduct'}" class="product-operation-leftBtn2" v-if="routeName=='product'">
        <i class="el-icon-plus"></i>上传商品</router-link>
      <div class="product-operation-leftBtn2" v-else @click="back()">返回</div>
    </div>
    <div class="product-operation">
      <div class="product-operation-left">
        <el-select v-model="search.value1" placeholder="请选择一级类目" style='margin-right: 12px;'>
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="search.value2" placeholder="请选择二级类目" style='margin-right: 12px;'>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="search.productName" placeholder="输入商品名称" style='width: 200px;margin-right: 12px;'></el-input>
        <div class="product-operation-leftBtn" @click="setQueryContent()">查询</div>
        <div class="product-operation-leftBtn2" @click="initQuery()" style="width: 100px;">重置</div>
      </div>
      <div class="product-operation-right">
        <div class="product-operation-leftBtn2" @click="typeDialog=true" style="width: 100px;">类目设置</div>
      </div>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%;border-top: 1px solid #F0F0F0;">
        <el-table-column label="商品图" align="center" width="100">
          <slot slot-scope="scope">
            <img :src="scope.row.productImg" width="60" height="60" class="head_pic" />
          </slot>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center">
          <slot slot-scope="scope">
            <router-link tag="div" :to="{name:'addProduct', query:{id:scope.row.id}}" style="color: #FF6E39;" btn>
              {{scope.row.productName}}</router-link>
          </slot>
        </el-table-column>
        <el-table-column label="商品类型" align="center" width="100">
          <slot slot-scope="scope">
            <span v-if='scope.row.productType=="1"'>智能家居</span>
            <span v-if='scope.row.productType=="2"'>宽带</span>
          </slot>
        </el-table-column>
        <el-table-column prop="productOrderNum" sortable align="center" label="订单数" width="100"></el-table-column>
        <el-table-column prop="shareNum" sortable align="center" label="分享次数" width="150"></el-table-column>
        <el-table-column prop="productSales" sortable align="center" label="销售额" width="200">
        </el-table-column>
        <el-table-column align="center" label="操作" :width="routeName=='product'?'400':'100'">
          <slot slot-scope="scope">
            <div flex="cross:center main:justify" v-if="routeName=='product'">
              <router-link tag="div" :to="{name:'addProduct', query:{id:scope.row.id}}" class="product-btn-item1" btn>编辑
              </router-link>
              <div @click='updata("upperOrLower", scope.row.state, scope.row, "state")' :class="scope.row.state == '1'?'product-btn-item2':'product-btn-item1'"
                btn>{{scope.row.state == '1' ? '下架':'上架'}}
              </div>
              <div @click='updata("updateHot", scope.row.hotFlag, scope.row, "hotFlag")' :class="scope.row.hotFlag == '1'?'product-btn-item2':'product-btn-item1'"
                btn>
                {{scope.row.hotFlag == '1' ? '移出热销':'加入热销'}}</div>
              <div @click='updata("updateRecomm", scope.row.recommFlag, scope.row, "recommFlag")' :class="scope.row.recommFlag == '1'?'product-btn-item2':'product-btn-item1'"
                btn>
                {{scope.row.recommFlag == '1' ? '移出推荐':'加入推荐'}}</div>
              <div @click='updata("deleteProduct", scope.row.state, scope.row, "state")' class="product-btn-item1" btn>删除</div>
            </div>
            <div flex="cross:center main:center" v-else>
              <div @click="active(scope.row)" :class="scope.row.id == activeId?'product-btn-item1':'product-btn-item2'" btn>选择
              </div>
            </div>
          </slot>
        </el-table-column>
      </el-table>
    </div>
    <l-pagination flex='main:right' :dataList.sync='dataList' :item='dataJson' requestMethod='post'></l-pagination>

    <l-dialog :dialogVisible.sync='typeDialog' :title='dialog.title' :width='dialog.width' :center="true">
      <div class="orderDetail-dialog" flex='dir:top cross:center'>
        <div class="add-item" flex="cross:center">
          <div class="add-item-left">一级类目</div>
          <div class="add-item-right">
            <el-radio v-model="product.productType" :label="1" :disabled='false'>智能家具</el-radio>
            <el-radio v-model="product.productType" :label="2" :disabled='false'>宽带业务</el-radio>
          </div>
        </div>
        <div class="add-item" flex="cross:center" v-for="(item, index) in typeList" :key="'add' + index">
          <div class="add-item-left">二级类目</div>
          <div>
            <div class="add-item-right">
              <el-input v-model="typeList.val" placeholder='输入内容' class="add-item-inputValue" :maxlength='20' style="margin-right: 25px;"></el-input>
              <i class="iconfont iconadd"></i>
              <i class="iconfont iconshanjian"></i>
            </div>
          </div>
        </div>
        <div class="btnBox" flex="main:center">
          <div class="btnBox-pass btnBox-btn" btn @click='confirm()'>确定</div>
          <div class="btnBox-refuse btnBox-btn" btn @click='cancel()'>取消</div>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      productName: "",
      queryContent: "",
      dataList: [],
      listShow: false,
      routeName: "product",
      isDisabled: false,
      search: {},
      options1: [{
        value: '选项1',
        label: '界面展示文字'
      }],
      options2: [{
        value: '选项1',
        label: '上线'
      }],
      typeDialog: false,
      dialog: {
        title: '类目设置',
        width: '560px'
      },
      product: {},
      typeList: [{}, {}]
    };
  },
  props: {
    activeId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dataJson() {
      return {
        model: {
          productName: this.queryContent
        },
        url: this.$apis.product.list,
        listShow: this.listShow
      };
    }
  },
  created() {
    this.routeName = this.$route.name;
  },
  methods: {
    back() {
      this.$parent.setProductS()
    },
    active(item) {
      this.$emit("upActive", item);
    },
    setQueryContent() {
      this.queryContent = this.productName;
    },
    initQuery() {
      this.queryContent = "";
      this.productName = "";
    },
    updata(name, type, item, paramsName) {
      let model = {
        productId: item.id
      };

      if (name == 'upperOrLower') {
        model.state = type == "1" ? 0 : 1;
      }
      if (paramsName != "state") {
        model[paramsName] = type == "1" ? 0 : 1;
      }
      if (name == "deleteProduct") {
        if (this.isDisabled) {
          this.$toast("请勿重复点击");
          return;
        }
        this.$confirm('您确定要删除该商品吗？（删除后不可恢复）', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isDisabled = true;
          this.ajax(name, model);
        }).catch(() => { })
      } else {
        this.ajax(name, model);
      }
    },
    ajax(name, model) {
      this.$http
        .get(this.$apis.product[name], {
          params: {
            ...model
          }
        })
        .then(res => {
          if (res.code == "200") {
            this.listShow = !this.listShow;
          }
          this.isDisabled = false;
          this.$toast(res.msg);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.product {
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
  &-btn {
    &-item2 {
      font-size: 14px;
      color: #7e7e7e;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #5e5e5e;
    }
    &-item1 {
      font-size: 14px;
      color: #ff6e39;
      padding: 0 10px;
      height: 28px;
      border-radius: 16px;
      border: 1px solid #ff6e39;
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
      img {
        width: 16px;
        height: 11px;
        margin-right: 8px;
      }
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
.btnBox {
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
.add {
  &-item {
    margin-bottom: 15px;
    display: flex;
    &-add {
      width: 120px;
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
    &-inputName {
      font-size: 16px;
      color: #52575a;
      margin-right: 20px;
    }
    &-inputValue {
      width: 270px;
    }
  }
  &-item-left {
    width: 100px;
    text-align: right;
    font-size: 16px;
    color: #52575a;
    line-height: 40px;
  }
  &-item-rightImg {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 10px;
    top: -10px;
  }
  &-item-right {
    margin-left: 21px;
    padding-bottom: 24px;
    width: 360px;
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      color: #ff6e39;
    }
  }
  &-item-upload {
    background: #e1e1e1;
    width: 80px;
    height: 80px;
    flex-direction: column;
    img {
      width: 12px;
      height: 12px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
      color: #c0c3cf;
    }
  }
  span.redColor {
    color: red;
  }
}
</style>