<template>
    <div class="container">
        <div class="detailName">
            刘子光
        </div>
        <TopItem :totalObj="totalObj"/>
        <div flex="main:justify" flex-wrap>
            <!--一级分销详情-->
            <div class="wrapper" style="width:100%">
                <div class="wrapper-title">
                    <div class="commonTitle">销售数据明细</div>
                </div>
                <el-table @sort-change='productSortChange' ref="productTable" :data="productList" style="width: 100%;padding: 0 10px;" highlight-current-row @current-change="handleCurrentProduct">
                <el-table-column prop="sort" align="center" header-align="center" label="序号" width='70'>
                    <slot slot-scope="scope">
                    <div class="font">{{getIndex(scope.$index, productSize, productNum)}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="订单编号" prop="date" >
                    <slot slot-scope="scope">
                    <div class="orFont">{{scope.row.productName}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="商品名称" prop="productSales">
                    <slot slot-scope="scope">
                    <div class="font">￥{{scope.row.productSales | getMoney}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="规格" prop="productOrderNum" >
                    <slot slot-scope="scope">
                    <div class="font">{{scope.row.productOrderNum}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="下单人员" prop="date" >
                    <slot slot-scope="scope">
                    <div class="orFont">{{scope.row.productName}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="下单时间" prop="productSales">
                    <slot slot-scope="scope">
                    <div class="font">￥{{scope.row.productSales | getMoney}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="成交额" prop="productOrderNum" >
                    <slot slot-scope="scope">
                    <div class="font">{{scope.row.productOrderNum}}</div>
                    </slot>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="二级人员获得佣金" prop="productSales">
                    <slot slot-scope="scope">
                    <div class="font">￥{{scope.row.productSales | getMoney}}</div>
                    </slot>
                </el-table-column>
                </el-table>
                <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
            </div>
        </div>
        
    </div>
</template>

<script type="text/babel">
import TopItem from '../../component/topItem'
export default {
  components: {
    TopItem
  },
  data() {
    return {
      topData: {},
      productOption: 1,
      productOrderColumn: '',
      productOrderRule: '',
      memberOption: 1,
      productList: [],
      memberList: [],
      memberSize: 10,
      membertNum: 1,
      productSize: 10,
      productNum: 1,
      timeModel:2,
      value:'',
      value2:'',
      totalObj:{objOne:{title:'销售总额'},objTwo:{title:'订单数'},objThree:{title:'获得佣金'}},
    };
  },
  created() {
    this.getTop()
  },
  computed: {
    productJson() {
      return {
        model: {
          dateOption: this.productOption,
          orderColumn: this.productOrderColumn,
          orderRule: this.productOrderRule,
        },
        url: this.$apis.main.productRank,
      }
    },
    memberJson() {
      return {
        model: {
          dateOption: this.memberOption,
          orderColumn: this.memberOrderColumn,
          orderRule: this.memberOrderRule,
        },
        url: this.$apis.main.memberRank,
      }
    }
  },
  mounted(){
  },
  methods: {


    productSortChange(column) {
      this.productOrderColumn = column.prop
      this.productOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    memberSortChange(column) {
      this.memberOrderColumn = column.prop
      this.memberOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    getMemberPage(val) {
      this.productSize = val.pageSize
      this.productNum = val.pageNum
    },
    getProductPage(val) {
      this.memberSize = val.pageSize
      this.membertNum = val.pageNum
    },
    getIndex(index, size, num) {
      return index + 1 + (num - 1) * size
    },
    handleCurrentProduct(val) {
      this.$router.push({
        name: 'dataProduct',
        query: {
          dataItem: JSON.stringify(val),
          productId: val.id,
        }
      })
    },
    handleCurrentMember(val) {
      this.$router.push({
        name: 'dataMember',
        query: {
          userName: val.userName,
          userId: val.id,
        }
      })
    },
    getTop() {
      this.$http.get(this.$apis.main.getTop).then(res => {
        if (res.code == '200') {
          this.topData = res.data
        }
      })
    },
  }
};
</script>
<style>
.wrapper .el-table th > .cell {
  font-size: 16px !important;
  color: #94979b !important;
  font-weight: normal !important;
}
</style>
<style lang="scss" scoped>
.container {
  overflow: auto;
  height: 100%;
  padding: 0 !important;
  background: #f0f1f2 !important;
}
.detailName{
    width: 200px;
    background: white;
    padding: 8px 12px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.15);
    margin-bottom: 25px;
}

.top {
}
.centerPart{
  margin-top: 20px;
  background: white;
  .analysisTitle{
    padding: 25px;
    border-bottom: 1px solid #E8E8E8;
    .analysisTxt{
      font-size:32px;
      font-family:PingFang-SC;
      font-weight:400;
      color:rgba(82,87,90,1);
    }
    ul >li{
      margin-left: 40px;
      cursor: pointer;
    }
  }
}



.wrapper {
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
}

.font {
  color: #52575a;
  font-size: 16px;
}
.detailFont{
  color: #485CFF;
}
.orFont {
  color: #ff6e39;
  font-size: 16px;
}

.imgWrapper {
  border-radius: 10px;
  background: red;
  @include imgBox(54px, 54px);
}

.pagination {
  padding: 20px 20px 0;
}

.wrapper-title {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}

.commonTitle-right {
  width: 240px;
  height: 30px;
  background: #ebedf1;
  border-radius: 30px;
  padding: 2px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.commonTitle-item {
  width: 56px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 26px;
  font-size: 14px;
  color: #404065;
}

.commonTitle-itemAct {
  color: #ff6e39;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(77, 115, 201, 0.28);
}
</style>